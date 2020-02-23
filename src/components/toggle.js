ToggleComponent = class extends GService.Item {

	static table = 'toggles'

	constructor (
		state = false,
		content = '',
	) {
		super()

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
