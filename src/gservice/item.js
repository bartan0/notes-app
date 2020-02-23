GService.Item = class {

	static table = null


	constructor (
		index = null
	) {
		this.index = index
		this.dateCreated = new Date()
	}


	_fromArray([ tsCreated, ...rest ]) {
		this.dateCreated = new Date(+tsCreated)
		this.fromArray(rest)
	}


	_toArray () {
		return [ +this.dateCreated, ...this.toArray() ]
	}


	static loadAll () {
		return new Promise((resolve, reject) => GService.getAll(this.table)
			.then(rows => resolve(rows.map((row, index) => {
				item = new this
				item.index = index + 1
				item._fromArray(row)

				return item
			})))
			.catch(reject)
		)
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
