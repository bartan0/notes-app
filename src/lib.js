const uuid = require('uuid/v4')
const Markdown = require('markdown-it')

module.exports = {
	UUID: uuid,

	PromiseResolve: (...args) => new Promise(r => r(...args)),

	isDefined: x => x !== undefined,

	bem: (block, elem, mod) => [
		block,
		elem && `__${elem}`,
		mod && `--${mod}`
	].join(''),

	markdown: (markdown => text => markdown.render(text))
		(new Markdown)
}
