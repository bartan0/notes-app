const execCallbacks = (item, key) => {
	item.callbacks.forEach(cb => cb(item.value, key))
	item.onceCallbacks.forEach(cb => cb(item.value, key))
	item.onceCallbacks = []
}


function Cache () {
	this.$ = new Map
}

Object.assign(Cache.prototype, {
	get (key) {
		return (this.$.get(key) || {}).value
	},

	set (key, value) {
		const item = this.$.get(key)

		if (item) {
			item.value = value
			execCallbacks(item, key)

		} else
			this.$.set(key, {
				value,
				callbacks: [],
				onceCallbacks: []
			})

		return value
	},

	delete (key) {
		const item = this.$.get(key)

		if (!item)
			return

		item.value = undefined
		execCallbacks(item, key)

		this.$.delete(key)

		return item.value
	},

	ping (key) {
		const item = this.$.get(key)

		if (!item)
			return

		execCallbacks(item, key)
	},

	once (key, cb) {
		const item = this.$.get(key)

		if (item)
			item.onceCallbacks.push(cb)
		else
			this.$.set(key, {
				value: null,
				callbacks: [],
				onceCallbacks: [ cb ]
			})

		return cb
	},

	subscribe (key, cb) {
		const item = this.$.get(key)

		if (item)
			item.callbacks.push(cb)
		else
			this.$.set(key, {
				value: null,
				callbacks: [ cb ],
				onceCallbacks: []
			})

		return cb
	},

	unsubscribe (key, cb) {
		const item = this.$.get(key)

		if (!item)
			return

		item.callbacks = item.callbacks.filter(_cb => _cb !== cb)
	}
})

module.exports = Cache
