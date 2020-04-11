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

	_onClose
}) => {
	const action = cb => () => {
		_onClose()
		cb()
	}

	return (
		<div { ...xbem('dialog') }>
			<div { ...xbem('dialog', 'status-indicator', type) }/>

			<div { ...xbem('dialog', 'body') }>
				<div { ...xbem('dialog', 'header') }>
					<div { ...xbem('dialog', 'header-title') }>
						{title}
					</div>

					<div { ...xbem('dialog', 'header-actions') }>
						{onClose &&
							<button { ...xbem('dialog', 'header-actions-button') }
								onClick={action(onClose)}
							>
								<Icon name="times"/>
							</button>
						}
					</div>
				</div>

				<div { ...xbem('dialog', 'content') }>
					<div { ...xbem('dialog', 'content-message') }>
						{message}
					</div>

					<div { ...xbem('dialog', 'content-icon') }>
						<Icon name={icon}/>
					</div>
				</div>

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
							`primary-${type}`
						]) }
							onClick={action(onAccept)}
						>
							Accept
						</button>
					}
				</div>
			</div>
		</div>
	)
}

module.exports = Dialog
