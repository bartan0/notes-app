const { createElement, useEffect, useRef, useState } = require('react')
const { UUID } = require('local/lib')
const GService = require('local/gservice')


const getProps = node => ({
	id: node.id,
	index: node.index,
	type: node.type,
	order: node.order,
	subnodesIndexes: node.childIndexes,
	data: node.data
})

const initCounter = ref => {
	ref.current = function () {
		if (!this.current.value)
			return this.current.value = 1

		return ++this.current.value
	}
}


const Node = ({
	id,
	parentId,
	parentIndex,
	index,
	type,
	order,
	dirty,
	subnodesIndexes,
	data,

	consumer,

	onIndex,
	onUpdate,
	onRemove,
	onClean
}) => {
	const counter = useRef()
	const [ subnodes, setSubnodes ] = useState([])
	const isRoot = id => !id

	useEffect(() => initCounter(counter), [])


	const append = (type, data) => setSubnodes(nodes => {
		const key = counter.current()

		return nodes.concat({
			key,
			id: UUID(),
			index: null,
			type,
			order: key,
			dirty: true,
			subnodesIndexes: [],
			data
		})
	})

	const remove = key => setSubnodes(nodes => nodes.filter(n => n.key !== key))

	const update = (key, data) => setSubnodes(nodes =>
		nodes.map(n => n.key === key ? { ...n, data, dirty: true } : n)
	)

	const setIndex = (key, index) => setSubnodes(nodes =>
		nodes.map(n => n.key === key ? { ...n, index, dirty: false } : n)
	)

	const setClean = key => setSubnodes(nodes =>
		nodes.map(n => n.key === key ? { ...n, dirty: false } : n)
	)

	const loadRootSubnodes = () => GService.getRootNode()
		.then(({ childIndexes }) => GService.getNodes(childIndexes, true))
		.then(nodes => setSubnodes(nodes.map(node => ({
			...getProps(node),
			key: counter.current()
		}))))

	const loadSubnodes = () => subnodesIndexes.length &&
		GService.getNodes(subnodesIndexes, true)
			.then(nodes => setSubnodes(nodes.map(node => ({
				...getProps(node),
				key: counter.current()
			}))))

	const save = () => {
		if (!dirty)
			return

		if (index) {
			GService.updateNode(index, parentId, data, order)
			onClean()
		} else if (isRoot(parentId))
			GService.addNodeRootIndex(id, type, data, order)
				.then(index => onIndex(index))
		else if (parentIndex)
			GService.addNodeIndex(parentIndex, id, parentId, type, data, order)
				.then(index => onIndex(index))
	}


	const elements = subnodes.map(node => createElement(Node, {
		...node,
		parentId: id,
		parentIndex: index,
		consumer: consumer.subconsumers[node.type],
		onUpdate: data => update(node.key, data),
		onRemove: () => remove(node.key),
		onIndex: index => setIndex(node.key, index),
		onClean: () => setClean(node.key)
	}))

	return createElement(consumer, isRoot(id) ? {
		append,
		loadNodes: loadRootSubnodes,
		nodes: elements
	} : {
		id,
		type,
		order,
		data,
		subnodes: elements,

		append,
		loadSubnodes,
		update: onUpdate,
		save,
		remove: onRemove
	})
}

module.exports = Node
