ToggleComponent = class extends GService.Item {

	constructor (
		state = false,
		content = '',
		index
	) {
		super('toggles', index)

		this.state = state
		this.content = content
	}


	fromArray ([ state, content ]) {
		this.state = !!state
		this.content = content
	}


	toArray () {
		return [ +this.state, this.content ]
	}


	toggle () {
		this.state = !this.state
	}
}
