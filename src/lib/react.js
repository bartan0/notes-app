const React = require('react')

const { useRef, useState } = React


module.exports = {
	withMouseHover: Component =>
		props => {
			const ref = useRef()
			const [ hover, setHover ] = useState(false)

			return (
				<div
					ref={ref}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={({ relatedTarget }) => {
						if (
							relatedTarget === window ||
							!ref.current.contains(relatedTarget)
						)
							setHover(false)
					}}
				>
					<Component mouseHover={hover} { ...props }/>
				</div>
			)
		}
}
