DocumentComponent = class extends GService.Item {

	static table = 'documents'

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
