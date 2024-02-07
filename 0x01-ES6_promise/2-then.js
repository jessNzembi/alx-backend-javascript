export default function handleResponseFromApi(promise) {
	promise
	.then(() => {
		console.log('Got a response from the API')
		return ({
			status: 200,
			body: success
		})
	})
	.catch(() => {
		return new Error()
	})
}
