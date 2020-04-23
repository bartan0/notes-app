require('./anchor.sass')

const Component = require('./component')

let anchor = null


const createAnchor = () => {
	anchor = document.createElement('div')

	anchor.className = 'overlay-dialog-anchor'
	document.body.appendChild(anchor)

	return anchor
}

const deleteAnchor = () => {
	document.body.removeChild(anchor)
	anchor = null
}


module.exports = {
	Component,
	createAnchor,
	deleteAnchor
}
