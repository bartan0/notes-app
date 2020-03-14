const { createElement, useState } = require('react')
const { markdown } = require('local/lib')


const Mode = {
	EDIT: 1,
	VIEW: 2
}

const Document = render => ({
	data,
	update,
	load,
	save
}) => {
	const [ mode, setMode ] = useState(Mode.VIEW)
	const [ content = '' ] = data

	const switchMode = mode => setMode(current => Mode[mode] || {
		[Mode.VIEW]: Mode.EDIT,
		[Mode.EDIT]: Mode.VIEW
	}
		[current]
	)

	const updateContent = (content, doSave) => {
		update([ content ])

		if (doSave)
			save()
	}

	const props = {
		mode,
		switchMode,
		load,
		save
	}

	switch (mode) {

		case Mode.EDIT:
			props.content = content
			props.update = updateContent
			break

		case Mode.VIEW:
			props.content = createElement('div', {
				dangerouslySetInnerHTML: { __html: markdown(content) }
			})
	}

	return render(props)
}

Document.Mode = Mode
module.exports = Document
