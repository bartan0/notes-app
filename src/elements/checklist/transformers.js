const GService = require('local/gservice')

GService.addTransformers({
	CHECKLIST: {
		pack () {
			if (!this.name)
				this.name = 'New Checklist'

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
			addItem () {
				this.append('CHECKLIST_ITEM')
			}
		}
	},

	CHECKLIST_ITEM: {
		pack () {
			if (!this.done)
				this.done = false

			if (!this.content)
				this.content = 'New Item'

			return [ (+this.done).toString(), this.content ]
		},
		unpack ([ done, content ]) {
			this.done = Boolean(+done)
			this.content = content
		},
		methods: {
			setContent (content) {
				this.content = content
				this.update()
			},
			toggle () {
				this.done ^= true
				this.update()
			}
		}
	}
})
