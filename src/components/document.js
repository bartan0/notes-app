DocumentComponent = class extends GService.Item {

	constructor (content = '', index) {
		super('documents', index)

		this.content = content
	}


	toArray () {
		return [ this.content ]
	}


	fromArray ([ content ]) {
		this.content = content
	}
}
