DocumentComponent = class extends GService.Item {

	TABLE = 'documents'

	constructor (content = '') {
		super()

		this.content = content
	}


	toArray () {
		return [ this.content ]
	}


	fromArray ([ content ]) {
		this.content = content
	}
}
