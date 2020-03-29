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

	useEffect(() => {
		GService.on('signIn', () => setStatus(Status.SIGNED_IN))
		GService.on('signOut', () => setStatus(Status.SIGNED_OUT))
		GService.on('init', () => setStatus(Status.READY))

		GService.setTransformers(transformers)

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


const useGService = path => {
	const ids = ('ROOT' + path).split('/').reverse()
	const childrenTypes = ids[0] === '*'
		? []
		: ids[0][0] === ':'
			? ids[0].slice(1).split(',')
			: null
	const defaultResult = [ childrenTypes ? [] : null, NodeStatus.PENDING ]

	const { status, cache } = useContext(Context)
	const [ { res, resStatus }, setRes ] = useState(() => ({
		res: childrenTypes ? [] : null,
		resStatus: NodeStatus.PENDING
	}))

	const callback = childrenTypes
		? ({ children }) => setRes({
			res: children || [],
			resStatus: children
				? NodeStatus.OK
				: NodeStatus.PENDING
		})
		: ({ node, status }) => setRes({ res: node, resStatus: status })


	useEffect(() => {
		const id = childrenTypes ? ids[1] : ids[0]

		cache.subscribe(id, callback)

		return () => { cache.unsubscribe(id, callback) }
	}, [])

	if (resStatus === NodeStatus.OK)
		return [ res, resStatus ]

	if (status !== Status.READY)
		return defaultResult

	const nodeInfo = cache.get(childrenTypes ? '*' + ids[1] : ids[0])

	if (nodeInfo && nodeInfo.status === NodeStatus.PENDING)
		return defaultResult


	const queue = createCBQueue()

	for (const id of ids) {
		const nodeInfo = cache.get(id)

		if (nodeInfo) {
			if (id === ids[0])
				callback(nodeInfo)
			else
				queue.run(nodeInfo)
					.catch(err => console.error(err))

			return defaultResult
		}

		if (id === ids[0] && childrenTypes)
			cache.set('*' + ids[1], {
				status: NodeStatus.PENDING
			})
		else
			cache.set(id, {
				node: null,
				children: null,
				status: NodeStatus.PENDING
			})

		if (id === 'ROOT') {
			queue.unshift(() => GService.getRootNode()
				.then(root => cache.set(id, {
					node: root,
					children: null,
					status: NodeStatus.OK
				}))
			)
			queue.run()
				.catch(err => console.error(err))

			return defaultResult
		}

		queue.unshift(nodeInfo => nodeInfo
			&& nodeInfo.status === NodeStatus.OK
			&& GService.getNodes(nodeInfo.node.childIndexes, true)
				.then(nodes => {
					cache.set(nodeInfo.node.id, {
						...nodeInfo,
						children: nodes
					})
					nodes.forEach(node => cache.set(node.id, {
						node,
						children: null,
						status: NodeStatus.OK
					}))

					if (id === ids[0] && childrenTypes)
						cache.set('*' + ids[1], {
							status: NodeStatus.OK
						})

					else {
						const res = cache.get(id)

						if (res.status !== NodeStatus.OK)
							return cache.set(id, {
								node: null,
								children: null,
								status: NodeStatus.NOT_FOUND
							})

						return res
					}
				})
		)
	}
}

module.exports = Object.assign(GServiceContainer, {
	Status,
	NodeStatus,
	useGService
})
