require('./style.sass')

const React = require('react')
const { bem } = require('local/lib')


const ToplevelBox = ({ children }) =>
	<div className={bem('toplevel-box')}>
		{children}
	</div>

module.exports = ToplevelBox
