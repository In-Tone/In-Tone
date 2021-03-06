export const targetToUserHashGenerator = (targetsArray, userBestArray) => {
	let targetUserHash = {};
	for (let i = 0; i < targetsArray.length; i++) {
		targetUserHash[targetsArray[i].id] = 0;
	};
	for (let k = 0; k < userBestArray.length; k++) {
		targetUserHash[userBestArray[k].target_id] = userBestArray[k].wavblob;
	};
	return targetUserHash;
}

export const targetToUserPitches = (targetsArray, userBestArray) => {
	let targetUserHash = {};
	for (let i = 0; i < targetsArray.length; i++) {
		targetUserHash[targetsArray[i].id] = 0;
	};
	for (let k = 0; k < userBestArray.length; k++) {
		targetUserHash[userBestArray[k].target_id] = userBestArray[k].pitches;
	};
	return targetUserHash;
}
