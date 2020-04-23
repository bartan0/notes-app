require('./component.sass')

const Button = require('local/ui/button')
const classNames = require('classnames')
const { HBox, VBox } = require('local/ui/box')


const C = 'overlay-dialog'

const dialogInfo = {
	action: {
		primaryColor: 'blue'
	},
	default: {
		primaryColor: 'blue'
	}
}

const actionsInfo = {
	accept: {
		label: 'OK',
	},
	cancel: {
		label: 'Cancel'
	}
}


const Dialog = ({
	type,
	title,
	message,
	actions,

	_onClose
}) => {
	const info = dialogInfo[type] || dialogInfo['default']

	return (
		<HBox className={`${C}`}>
			{type &&
				<div className={classNames(
					`${C}-color`,
					type && `${C}-color-${type}`
				)}/>
			}

			<VBox className={`${C}-body`}>
				{title &&
					<HBox style={{
						backgroundColor: '#b5b5b5',
						fontSize: '1.3em',
						padding: '.3em',
						paddingLeft: '.77em'
					}}>
						{title}
					</HBox>
				}

				<HBox style={{
					padding: '1em'
				}}>
					{message}
				</HBox>

				{actions &&
					<HBox className={`${C}-actions`}>
						{actions.map(([ type, cb, primary ], key) => {
							const { label } = actionsInfo[type]

							return (
								<Button className={classNames(
									`${C}-actions-button`,
									primary && `${C}-actions-button-primary-${type}`
								)}
									key={key}
									onClick={() => {
										cb()
										_onClose()
									}}
								>
									{label}
								</Button>
							)
						})}
					</HBox>
				}
			</VBox>
		</HBox>
	)
}

module.exports = Dialog
