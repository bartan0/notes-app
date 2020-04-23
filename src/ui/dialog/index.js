require('./style.sass')

const classNames = require('classnames')


const Dialog = ({
	title,
	content,
	actions,
	overlayClose,

	onClose,
}) =>
	<div className="dialog-overlay"
		onClick={overlayClose && onClose}
		onKeyDown={({ key }) => console.log(key)}
	>
		<div className="dialog-container">
			{title &&
				<div className="dialog-title">
					{title}
				</div>
			}

			<div className="dialog-content">
				{content}
			</div>

			{actions &&
				<div className="dialog-actions">
					{actions.map(({ label, action, primary }, key) =>
						<button key={key} className={classNames(
							'dialog-actions-button',
							primary && 'dialog-actions-button-primary'
						)}
							onClick={() => {
								onClose()
								action()
							}}
						>
							{label}
						</button>
					)}
				</div>
			}
		</div>
	</div>


module.exports = Dialog
