const uuid = require('uuid')
const Markdown = require('markdown-it')

module.exports = {
	UUID: uuid.v4,
	PromiseResolve: (...args) => new Promise(r => r(...args)),
	isDefined: x => x !== undefined,

	bem: (block, elem, mod) => [
		block,
		elem && `__${elem}`,
		mod && `--${mod}`
	].join(''),

	markdown: (markdown => text => markdown.render(text))
		(new Markdown),

	csvSplit: (line, transformer) => line
		? transformer
			? line.split(',').map(transformer)
			: line.split(',')
		: [],

	createCBQueue: (callbacks = []) =>
		Object.assign(callbacks, {
			run (initVal) {
				return this.reduce(
					(p, cb) => p.then(cb),
					new Promise(r => r(initVal))
				)
			}
		})
}
