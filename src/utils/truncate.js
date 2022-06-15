const maxLength = 10

const truncate = (text) => {
	const summaryWords = []
	let sentence
	const words = text.split(' ')

	for (let i = 0; i < maxLength; i++) {
		summaryWords.push(words[i])
	}

	if (summaryWords.filter((x) => x).length < maxLength) {
		sentence = summaryWords.filter((x) => x).join(' ')
	} else {
		sentence = summaryWords.filter((x) => x).join(' ') + '...'
	}
	return sentence
}

export default truncate
