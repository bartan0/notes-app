const GService = require('local/gservice')
const { ID } = require('local/lib')

module.exports = DataNode => {
	DataNode.getRootNodes = function () {
		return GService.getRootNode()
			.then(({ childIndexes }) => this._instantiateNodes(childIndexes))
	}


	DataNode.prototype.save = function (recursive) {
		if (!this.index) {
			if (this.parent) {
				if (this.parent.index) {
					const res = GService.addNodeIndex(
						this.parent.index,
						this.id,
						this.parent.id,
						this.type,
						this.toArray()
					)
						.then(index => {
							this.index = index
						})

					return recursive
						? res.then(() => this.saveChildren(true))
						: res

				} else
					return this.parent.save()
						.then(() => this.save())
			}

			const res = GService.addNodeRootIndex(this.id, this.type, this.toArray())
				.then(index => { this.index = index })

			return recursive
				? res.then(() => this.saveChildren(true))
				: res
		}

		return Promise.all([
			GService.updateNode(this.index, null, this.toArray()),
			recursive && this.saveChildren(true)
		])
	}


	DataNode.prototype.saveChildren = function (recursive) {
		return Promise.all(this.children.map(child => child.save(recursive)))
	}


	DataNode.prototype.load = function (recursive) {
		if (!this.index)
			return PromiseResolve()

		const res = GService.getNodes([ this.index ], true)
			.then(([ { childIndexes, type, data } ]) => {
				this.childrenIndexes = childIndexes

				this.fromArray(data)
			})

		if (!recursive)
			return res

		return res.then(() => this.loadChildren(true))
	}


	DataNode.prototype.loadChildren = function (recursive) {
		const res = DataNode._instantiateNodes(this.childrenIndexes)
			.then(nodes => {
				this.children = [] // clearChildren?
				nodes.forEach(n => this.appendChild(n))
			})

		return recursive
			? res.then(() => Promise.all(this.children.map(child => child.loadChildren(true))))
			: res
	}


	DataNode.prototype.appendChild = function (node) {
		this.children.push(node)
		node.parent = this
	}


	// Only local - after .save no children will be removed
	//
	DataNode.prototype.removeChild = function (index_node) {
		if (typeof index_node === 'number') {
			this.children.splice(index_node, 1)
			return
		}

		const i = this.children.findIndex(child => child === index_node)

		if (i < 0)
			return

		this.children.splice(i, 1)
	}


	DataNode.prototype.toArray = function () {
		return []
	}


	DataNode.prototype.fromArray = function (items) {}
}
