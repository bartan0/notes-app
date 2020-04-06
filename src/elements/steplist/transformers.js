const GService = require('local/gservice')

GService.addTransformers({
	STEPLIST: {
		pack () {
			if (!this.name)
				this.name = 'New Steplist'

			return [ this.name ]
		},
		unpack ([ name ]) {
			this.name = name
		},

		methods: {
			setName (name) {
				if (name !== this.name) {
					this.name = name
					this.update()
				}
			},
			addStep () {
				this.append('STEPLIST_ITEM')
			}
		}
	},

	STEPLIST_ITEM: {
		pack () {
			if (!this.active)
				this.active = false

			if (!this.content)
				this.content = 'New Step'

			return [
				(+this.active).toString(),
				this.content
			]
		},
		unpack ([ active, content ]) {
			this.active = Boolean(+active)
			this.content = content
		},

		methods: {
			setActive (active) {
				if (active !== this.active) {
					this.active = active
					this.update()
				}
			},
			setContent (content) {
				if (content !== this.content) {
					this.content = content
					this.update()
				}
			}
		}
	}
})
