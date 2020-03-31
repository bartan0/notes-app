const GService = require('local/gservice')
const Cache = require('local/cache')
const { createContext, createElement, useContext, useEffect, useRef, useState } = require('react')
const { createCBQueue } = require('local/lib')

const Status = {
	SIGNED_OUT: 1,
	SIGNED_IN: 2,
	READY: 3
}

const NodeStatus = {
	OK: 1,
	PENDING: 2,
	ERROR: 3,
	NOT_FOUND: 4
}

const Context = createContext()


const GServiceContainer = ({
	autoConnect,
	transformers,
	render
}) => {
	const [ context, setContext ] = useState(() => ({
		status: Status.SIGNED_OUT,
		cache: new Cache
	}))
	const setStatus = status => setContext(ctx => ({ ...ctx, status }))
	const { cache } = context

	useEffect(() => {
		GService.on('signIn', () => setStatus(Status.SIGNED_IN))
		GService.on('signOut', () => setStatus(Status.SIGNED_OUT))
		GService.on('init', () => setStatus(Status.READY))

		GService.setTransformers(transformers)
		GService.setNodeMethods({
			update () {
				GService.updateNode(this)
					.then(() => {
						cache.ping(this.id)
						cache.ping(this.pid)
					})
			},

			append (type) {
				GService.addNodeIndex(this, type)
					.then(node => {
						const nodeInfo = cache.get(this.id)

						cache.set(node.id, {
							node,
							status: NodeStatus.OK
						})
						cache.set(this.id, {
							...nodeInfo,
							children: (nodeInfo.children || []).concat(node)
						})
					})
			},

			remove () {
				const {
					node: parent,
					children,
					...rest
				} = cache.get(this.pid)

				GService.removeNode(this, parent)
					.then(() => {
						cache.set(parent.id, {
							node: parent,
							children: children.filter(({ id }) => id !== this.id),
							...rest
						})
						cache.delete(this.id)
					})
			}
		})

		if (autoConnect)
			GService.connect()
	}, [])

	return createElement(Context.Provider, {
		value: context
	}, render({
		signedIn: [ Status.SIGNED_IN, Status.READY ].includes(context.status),
		ready: context.status === Status.READY,
		signIn: () => GService.connect().then(GService.signIn),
		signOut: () => GService.signOut()
	}))
}


const useGService = (path, filter) => {
	const { status, cache } = useContext(Context)
	const [ _, _onCache ] = useState(0)
	const onCache = () => _onCache(i => i + 1)

	const ids = (path || '').split('/').slice(1)
	const isSingleNode = ids[ids.length - 1] !== ''
	const defaultResult = isSingleNode
		? [ null, NodeStatus.PENDING ]
		: [ [], NodeStatus.PENDING, null, NodeStatus.PENDING ]


	useEffect(() => {
		const id = ids[ids.length - 2 + isSingleNode] || 'ROOT'

		cache.subscribe(id, onCache)

		return () => { cache.unsubscribe(id, onCache) }
	}, [])

	if (status !== Status.READY)
		return defaultResult


	const rootInfo = cache.get('ROOT')

	if (!rootInfo) {
		cache.set('ROOT', { status: NodeStatus.PENDING })
		GService.getRootNode()
			.then(node => cache.set('ROOT', {
				node,
				status: NodeStatus.OK
			}))
			.then(() => ids.length + isSingleNode - 1 && onCache())

		return defaultResult
	}

	if (rootInfo.status === NodeStatus.PENDING) {
		cache.once('ROOT', onCache)

		return defaultResult
	}


	let parentNodeInfo = rootInfo

	for (const id of ids) {
		if (!id)
			continue

		const nodeInfo = cache.get(id)

		if (!nodeInfo) {
			cache.set(id, { status: NodeStatus.PENDING })
			GService.getNodes(parentNodeInfo.node.childIndexes, true)
				.then(nodes => {
					nodes.forEach(node => cache.set(node.id, {
						node,
						status: NodeStatus.OK
					}))
					cache.set(parentNodeInfo.node.id, {
						...parentNodeInfo,
						children: nodes
					})
				})
				.then(() => id === ids[ids.length - 2 + isSingleNode] || onCache())

			return defaultResult
		}

		if (nodeInfo.status === NodeStatus.PENDING) {
			cache.once(id, onCache)

			return defaultResult
		}

		parentNodeInfo = nodeInfo
	}

	if (isSingleNode)
		return [ parentNodeInfo.node, parentNodeInfo.status ]


	if (!parentNodeInfo.children) {
		cache.set(parentNodeInfo.node.id, {
			...parentNodeInfo,
			children: []
		})
		GService.getNodes(parentNodeInfo.node.childIndexes, true)
			.then(nodes => {
				nodes.forEach(node => cache.set(node.id, {
					node,
					status: NodeStatus.OK
				}))
				cache.set(parentNodeInfo.node.id, {
					...parentNodeInfo,
					children: nodes
				})
			})
			.then(onCache)

		return defaultResult
	}

	return [
		filter
			? parentNodeInfo.children.filter(filter)
			: parentNodeInfo.children,
		NodeStatus.OK,
		parentNodeInfo.node,
		NodeStatus.OK
	]
}

module.exports = Object.assign(GServiceContainer, {
	Status,
	NodeStatus,
	useGService
})
