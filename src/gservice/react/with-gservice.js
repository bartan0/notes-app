const { createElement, useEffect, useState } = require('react')


module.exports = (GService, cache) => {
	const { NodeStatus, Status } = GService

	return {
		withGService:
			transformers => Component => props => {
				const [ status, setStatus ] = useState(Status.ZERO)

				const signIn = () => GService.signIn()
				const signOut = () => GService.signOut()
				const connect = () => GService.connect()


				useEffect(() => {
					GService
						.on('init', () => setStatus(Status.INIT))
						.on('signIn', () => setStatus(Status.SIGNED_IN))
						.on('signOut', () => setStatus(Status.INIT))
						.on('connect', () => setStatus(Status.CONNECTED))

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

					return // TODO: remove event handlers
				}, [])


				return createElement(Component, {
					status,
					connect,
					signIn,
					signOut,

					...props
				},
					props.children
				)
			}
	}
}
