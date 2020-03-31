module.exports = {
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
			}
		}
	},

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
	},

	DOCUMENT: {
		pack () {
			if (!this.content)
				this.content = 'New Document'

			return [ this.content ]
		},
		unpack ([ content ]) {
			this.content = content
		},
		methods: {
			setContent (content) {
				this.content = content
				this.update()
			}
		}
	},

	/*
	SCHEMA: {
		pack () {
		},
		unpack () {
		}
	}
	*/
}
