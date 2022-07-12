function Heading({ children, isBold, size, size2 }) {
	return (
		<h1
			className={`tw-capitalize tw-text-neutral-700 ${
				isBold && 'tw-font-bold'
			} ${size ? 'tw-text-sm' : 'tw-text-2xl'}`}>
			{children}
		</h1>
	)
}

export default Heading
