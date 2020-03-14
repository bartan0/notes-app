const React = require('react')
const uuid = require('uuid/v4')

const { useEffect, useState } = React

module.exports = {
	UUID: uuid,
	PromiseResolve: (...args) => new Promise(r => r(...args)),
	isDefined: x => x !== undefined,
	bem: (block, elem, mod) => [
		block,
		elem && `__${elem}`,
		mod && `--${mod}`
	].join(''),
}
