module.exports = {
	text () {
		return [ 'input', { type: 'text' } ]
	}
	,
	number () {
		return [ 'input', { type: 'number' } ]
	}
	,
	checkbox (value) {
		return [ 'input', {
			type: 'checkbox',
			defaultChecked: value
		} ]
	}
	,
	select () {
		return [ 'select', {
			children: Object.entries(this._options)
				.map(([ key, label ]) =>
					<option key={key} value={key}>
						{label}
					</option>
				)
		} ]
	}
}
