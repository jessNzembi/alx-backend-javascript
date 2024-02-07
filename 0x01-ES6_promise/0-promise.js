export default function getResponseFromAPI() {
	return new Promise((resolve, reject) => {
		resolve('success')
		reject('error')
	});
}
