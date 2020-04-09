const uuid = require('uuid')
const Markdown = require('markdown-it')

module.exports = {
	UUID: uuid.v4,
	PromiseResolve: (...args) => new Promise(r => r(...args)),
	isDefined: x => x !== undefined,

	bem: (block, elem, mods) => {
		const stem = elem ? `${block}__${elem}` : block

		return `${
			stem
		} ${(typeof mods === 'string' ? [ mods ] : mods || [])
			.map(mod => `${stem}--${mod}`)
			.join(' ')
		}`
	},

	markdown: (markdown => text => markdown.render(text))
		(new Markdown),

	csvSplit: (line, transformer) => line
		? transformer
			? line.split(',').map(transformer)
			: line.split(',')
		: [],

	userConfirm: (msg, cbInfo) => {
		if (typeof cbInfo === 'function')
			cbInfo = {
				accept: cbInfo,
				cancel: null
			}

		if (window.confirm(msg))
			cbInfo.accept()
		else if (cbInfo.cancel)
			cbInfo.cancel()
	}
}
