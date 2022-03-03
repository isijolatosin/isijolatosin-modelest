const os = require('os')

const currentUser = os.userInfo()?.username

exports.handler = async function (event, context) {
	return { statusCode: 200, body: currentUser }
}
