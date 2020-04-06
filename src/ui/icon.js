const React = require('react')
const classNames = require('classnames')

const Icon = ({
	name,
	brand
}) =>
	<i className={classNames({ fas: !brand, fab: brand }, 'fa-' + name)}/>

module.exports = Icon
