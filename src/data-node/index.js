/*
 * TODO: data support -> serialization, virtual method
 */

const GService = require('local/gservice')
const { ID } = require('local/lib')

const DataNode = function (type) {
	this.id = ID()
	this.index = null
	this.type = type
	this.parent = null
	this.children = []
	this.childrenIndexes = []
	// TODO: data
}

require('./lib')(DataNode)
require('./api')(DataNode)

module.exports = DataNode
