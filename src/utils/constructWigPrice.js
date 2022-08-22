export function constructWigPrice(
	_length,
	wigpricing,
	singleWig,
	wigTextureType1,
	wigTextureType2,
	wigTextureTypeIncreaseValue1,
	wigTextureTypeIncreaseValue2
) {
	let a
	// eslint-disable-next-line array-callback-return
	wigpricing.map((p) => {
		if (_length === p?.length) {
			if (singleWig[0]?.texture) {
				if (wigTextureType1.includes(singleWig[0]?.texture?.toLowerCase())) {
					a = p?.price + wigTextureTypeIncreaseValue1
				} else {
					a = p?.price
				}
			} else if (singleWig[0]?.texture) {
				if (wigTextureType2.includes(singleWig[0]?.texture?.toLowerCase())) {
					a = p?.price + wigTextureTypeIncreaseValue2
				} else {
					a = p?.price
				}
			} else if (singleWig[0]?.texture?.toLowerCase().includes('straight')) {
				a = p?.price
			} else {
				a = p?.price
			}
		}
	})
	return a
}
