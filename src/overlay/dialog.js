const Icon = require('local/ui/icon')
const { xbem } = require('local/lib')


const Dialog = ({
	type,
	title,
	message,
	icon,

	onAccept,
	onCancel,
	onClose,
	onClick,

	_onClose
}) => {
	const action = cb => () => {
		_onClose()
		cb()
	}

	return (
		<div { ...xbem('dialog') }
			onClick={onClick && action(onClick)}
		>
			{type &&
				<div { ...xbem('dialog', 'status-indicator', type) }/>
			}

			<div { ...xbem('dialog', 'top-actions') }>
				{onClose &&
					<button { ...xbem('dialog', 'top-actions-button') }
						onClick={action(onClose)}
					>
						<Icon name="times"/>
					</button>
				}
			</div>

			<div { ...xbem('dialog', 'body') }>
				{title &&
					<div { ...xbem('dialog', 'header') }>
						<div { ...xbem('dialog', 'header-title') }>
							{title}
						</div>
					</div>
				}

				<div { ...xbem('dialog', 'content') }>
					<div { ...xbem('dialog', 'content-message') }>
						{message}
					</div>

					{icon &&
						<div { ...xbem('dialog', 'content-icon') }>
							<Icon name={icon}/>
						</div>
					}
				</div>

				{(onCancel || onAccept) &&
					<div { ...xbem('dialog', 'actions') }>
						{onCancel &&
							<button { ...xbem('dialog', 'actions-button', 'secondary') }
								onClick={action(onCancel)}
							>
								Cancel
							</button>
						}

						{onAccept &&
							<button { ...xbem('dialog', 'actions-button', [
								'primary',
								`primary-${type || 'action'}`
							]) }
								onClick={action(onAccept)}
							>
								OK
							</button>
						}
					</div>
				}
			</div>
		</div>
	)
}

module.exports = Dialog
