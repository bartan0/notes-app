const { createElement, useEffect, useRef, useState } = require('react')
const { v4: UUID } = require('uuid')
const GService = require('local/gservice')


const Node = ({
	isRoot,
	index,
	_type,
	parentId,
	parentIndex,
	autoLoad,
	saveCounter,
	render,

	onIndex,
	onRemove
}) => {
	const [ { id, type, children, data, dirty }, setState ] = useState({
		id: isRoot ? null : UUID(),
		type: _type || null,
		children: [],
		data: [],
		dirty: !index
	})
	const counter = useRef()

	const incSaveCounters = () => setState(s => ({
		...s,
		children: s.children.map(c => ({ ...c, saveCounter: c.saveCounter + 1 }))
	}))

	const load = () => isRoot
		? GService.getRootNode()
			.then(({ childIndexes }) => setState({
				children: childIndexes.map(index => ({
					key: counter.current(),
					index,
					saveCounter: 0
				}))
			}))
		: index && GService.getNodes([ index ], true)
			.then(([ { id, type, childIndexes, data } ]) => setState({
				id,
				type,
				children: childIndexes.map(index => ({
					key: counter.current(),
					index,
					saveCounter: 0
				})),
				dirty: false,
				data
			}))

	const save = recursive => {
		if (index) {
			if (dirty) {
				console.log('save', data)
				GService.updateNode(index, null, data)
				setState(s => ({ ...s, dirty: false }))
			}

			if (recursive)
				incSaveCounters()

		} else {
			const res = parentIndex
				? GService.addNodeIndex(parentIndex, id, parentId, type, data)
				: !parentId
					? GService.addNodeRootIndex(id, type, data)
					: null

			if (res)
				res.then(index => {
					onIndex(index)
					setState(s => ({ ...s, dirty: false }))

					if (recursive)
						incSaveCounters()
				})
		}
	}

	const update = data => setState(s => ({ ...s, dirty: true, data }))

	const append = type => setState(s =>
		({ ...s, children: s.children.concat({
			key: counter.current(),
			index: null,
			type,
			saveCounter: 0
		}) })
	)

	const remove = _key => setState(s =>
		({ ...s, children: s.children.filter(({ key }) => key !== _key) })
	)

	const setIndex = (key, index) => setState(s =>
		({ ...s, children: s.children.map(c => c.key === key ? { ...c, index } : c) })
	)

	const subnodes = (render, autoLoad) => children.map(({ key, index: _index, type, saveCounter }) =>
		createElement(Node, {
			key,
			index: _index,
			_type: type,
			parentId: id,
			parentIndex: index,
			autoLoad,
			saveCounter,
			render,

			onIndex: index => setIndex(key, index),
			onRemove: () => remove(key)
		})
	)


	useEffect(() => {
		counter.current = function () {
			if (this.current.value)
				return ++this.current.value

			return this.current.value = 1
		}

		if (autoLoad)
			load()
	}, [])

	useEffect(() => {
		if (saveCounter)
			save(true)
	}, [ saveCounter ])

	return render(isRoot
		? {
			subnodes,
			load,
			append
		} : {
			id,
			type,
			data,

			subnodes,
			load,
			save,
			update,
			append,
			remove: onRemove
		}
	)
}


const RootNode = ({
	autoLoad,
	render
}) => createElement(Node, {
	isRoot: true,
	autoLoad,
	render
})

module.exports = RootNode
