const constants = {
	NodeType: {
		NOTE: 'NOTE',
		DOCUMENT: 'DOCUMENT',
		CHECKLIST: 'CHECKLIST',
		CHECKLIST_ITEM: 'CHECKLIST_ITEM'
	}
}

constants.NodeData = Object.fromEntries([
	[ 'NOTE', [ 'New Note' ] ],
	[ 'DOCUMENT', [ 'New Document' ] ],
	[ 'CHECKLIST', [ 'New Checklist' ] ],
	[ 'CHECKLIST_ITEM', [ 0, 'New Item' ] ]
]
	.map(([ name, data ]) => [ constants.NodeType[name], data ])
)

module.exports = constants
