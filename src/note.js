window.Note = class extends GService.Item {

	static table = 'notes'

	components = []


	constructor (components) {
		super()

		if (components)
			this.components = components
	}


	fromArray ([ components ]) {
		this.components = [ ...components.matchAll(/([A-Za-z]+):(\d+),?/g) ]
			.map(([ _, component, index ]) => [ window[component], index ])
	}


	load () {
		return super.load()
			.then(() => Promise.all(this.components
				.map(([ component, index ]) => component.loadOne(index))
			))
			.then(res => { this.components = res })
	}


	save () {
		return Promise.all(this.components.map(component => component.save()))
			.then(() => super.save())
	}


	toArray () {
		return [ this.components
			.map(component => `${component.constructor.name}:${component.index}`)
			.join(',')
		]
	}
}
