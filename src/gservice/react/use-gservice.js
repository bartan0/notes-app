const { createContext, useContext, useEffect, useState } = require('react')


module.exports = (GService, cache) => {
	const { NodeStatus, Status } = GService
	const Context = createContext({ cache })

	return {
		useGService: (path, filter) => {
			const { cache } = useContext(Context)
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
	}
}
