const { createElement, useState } = require('react')
const { markdown } = require('local/lib')
const DocumentView = require('local/ui/document-view')

const Mode = {
	EDIT: 0,
	VIEW: 1
}


const Document = ({
	data,
	update
}) => {
	const [ content = '' ] = data
	const [ mode, setMode ] = useState(Mode.VIEW)

	const props = {
		Mode,
		mode,
		toggleMode: () => setMode(mode => 1 - mode)
	}

	switch (mode) {

		case Mode.VIEW:
			props.content = createElement('div', {
				dangerouslySetInnerHTML: { __html: markdown(content) }
			})
			break

		case Mode.EDIT:
			props.content = content
			props.setContent = content => update([ content ])
			break
	}

	return createElement(DocumentView, props)
}

Document.subconsumers = {}
module.exports = Document
