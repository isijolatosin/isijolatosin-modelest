function Button(props) {
	return (
		<button
			onClick={props.handleFunc}
			type={props.type}
			className={`tw-bg-neutral-50 tw-text-xs tw-text-black tw-py-1.5 tw-px-6 tw-rounded-sm tw-font-light hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300 tw-shadow-xl ${
				props.isShadow ? '' : 'tw-shadow-neutral-900'
			}`}>
			{props.children}
		</button>
	)
}
export default Button
