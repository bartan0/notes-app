GService.Item = class {

	constructor (
		table,
		index = null
	) {
		this.table = table
		this.index = index
		this.dateCreated = new Date()
	}


	_fromArray([ tsCreated, ...rest ]) {
		this.dateCreated = new Date(tsCreated)
		this.fromArray(rest)
	}


	_toArray () {
		return [ +this.dateCreated, ...this.toArray() ]
	}


	fromArray () {}


	load () {
		return new Promise((resolve, reject) => this.index
			? GService.getRow(this.table, this.index)
				.then(row => {
					this._fromArray(row)
					resolve()
				})
				.catch(reject)
			: resolve()
		)
	}


	save () {
		return new Promise((resolve, reject) => this.index
			? GService.updateRow(this.table, this.index, this._toArray())
				.then(resolve)
				.catch(reject)
			: GService.addRow(this.table, this._toArray())
				.then(index => {
					this.index = index
					resolve()
				})
				.catch(reject)
		)
	}


	toArray () {
		return []
	}
}
