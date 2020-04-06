const GService = require('local/gservice')

GService.addTransformers({
	NOTE: {
		pack () {
			if (!this.name)
				this.name = 'New Note'

			return [ this.name ]
		},
		unpack ([ name ]) {
			this.name = name
		},
		methods: {
			setName (name) {
				this.name = name
				this.update()
			},
			addChecklist () {
				this.append('CHECKLIST')
			},
			addDocument () {
				this.append('DOCUMENT')
			},
			addSteplist () {
				this.append('STEPLIST')
			}
		}
	}
})
