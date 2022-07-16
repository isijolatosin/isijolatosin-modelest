function Heading({
	children,
	isBold,
	size,
	size1,
	size2,
	size3,
	size4,
	size5,
	isLead,
}) {
	return (
		<h1
			className={`tw-capitalize tw-text-neutral-700 ${
				isBold && 'tw-font-bold'
			} ${size1 && 'tw-text-xs'} ${size2 && 'tw-text-sm'} ${
				size3 && 'tw-text-[18px]'
			} ${size4 && 'tw-text-lg'} ${size5 && 'tw-text-xl'} ${
				size4 && 'tw-text-2xl'
			} ${isLead && 'tw-leading-8'} `}>
			{children}
		</h1>
	)
}

export default Heading
