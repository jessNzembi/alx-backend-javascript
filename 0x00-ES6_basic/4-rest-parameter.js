export default function returnHowManyArguments(...theArgs) {
	let count = 0
	for (const arg of theArgs){
		count++
	}
	return count
}
