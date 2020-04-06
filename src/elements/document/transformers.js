const GService = require('local/gservice')

GService.addTransformers({
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
	}
})
