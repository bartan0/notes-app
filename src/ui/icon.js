const React = require('react')
const classNames = require('classnames')

const Icon = ({
	name,
	brand,
	className,

	...props
}) =>
	<i className={classNames({ fas: !brand, fab: brand }, 'fa-' + name, className)} { ...props }/>

module.exports = Icon
