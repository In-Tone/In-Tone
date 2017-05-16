'use strict'

// Accepts the filtered arrays of target and results 
export const scores = (target, results) => {

		// create a difference array for each data set: n+1 - n
		let resultsDiff = [];
		let targetsDiff = [];

		// determine the longer of results or target
		let longest = results.length > target.length ? results : target

		// loop once through both arrays, calculating their differences at each index pair
		longest.forEach((pitch, index) => {
			if(target[index + 1]){
				targetsDiff.push(target[index + 1] - target[index])
			}
			if(results[index + 1]){
				resultsDiff.push(results[index + 1] - results[index])
			}
		})

		// differenceScore will be the difference between user and target change at each point along
		// their curves
		let differenceScore = [];
		
		// determine the shortest of targetsDiff or resultsDiff
		let shortestDiff = targetsDiff.length > resultsDiff.length ? resultsDiff : targetsDiff

		// compare the Math.abs() diff between targetsDiff and resultsDiff.. loop through the shorter of the two for now
		for(var i = 0; i < shortestDiff.length; i++){
			differenceScore.push(Math.abs(resultsDiff[i] - targetsDiff[i]))
		}

		// pitchGrade will be the users score on an attempt
		let pitchGrade = 0;
		
		// failing score will be all points at which a user needs to work on their inflection
		let failingScore = [];

		// add to pitchGrade or push values from pitches into failingScore 
		differenceScore.forEach((score, index) => {
			if(score <= 2){
				pitchGrade += 1
			}
			if(score <= 6 && score >= 3){
				pitchGrade += 0.5
			}
			if(score >= 7){
					failingScore.push(target[index])
			}else{
					failingScore.push(NaN)
			}
		})

		// returns the users score and their array of failing points
		return [Math.round((pitchGrade / differenceScore.length) * 100), failingScore]
}