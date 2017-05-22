'use strict'

// Accepts the filtered arrays of target and results 
export const scores = (target, results, xLabels) => {

		// store a difference array for each data set: (n+1 - n)
		let resultsDiff = [];
		let targetsDiff = [];

		// determine the longer of results or target
		let longest = results.length > target.length ? results : target

		// loop once through both arrays, calculating the derivative at discrete, 15ms intervals & pushing to the difference arrays
		longest.forEach((pitch, index) => {
			if(target[index + 1]){ 
				targetsDiff.push((target[index + 1] - target[index])/(xLabels[index + 1] - xLabels[index]))
			}
			if(results[index + 1]){
				resultsDiff.push((results[index + 1] - results[index])/(xLabels[index + 1] - xLabels[index]))
			}
		})

		// differenceScore will be the difference between user and target change at each point along
		// their curves
		let differenceScore = [];

		// determine the shortest of targetsDiff or resultsDiff
		let shortestDiff = targetsDiff.length > resultsDiff.length ? resultsDiff : targetsDiff

		// w/derivatives calculated, the comparison should first check for sign (slope) and THEN difference
		// if signs are the same: calculate difference.
		// if signs are opposite: ignore
		for(var i = 0; i < shortestDiff.length; i++){
			if(resultsDiff[i] >= 0 && targetsDiff[i] >= 0 || resultsDiff[i] <= 0 && targetsDiff[i] <= 0){
				differenceScore.push(Math.abs(resultsDiff[i] - targetsDiff[i]))
			}
		}

		// pitchGrade will be the users score on an attempt
		let pitchGrade = 0;

		// accumulate passing/acceptable difference scores
		differenceScore.forEach((score, index) => {
			if(score <= (1/3)){
				pitchGrade += 1
			}
			if(score <= (2/3) && score >= (1/3)){
				pitchGrade += 0.5
			}
		})

		let score = Math.round((pitchGrade / differenceScore.length) * 100)

		// returns the users score and their array of failing points
		return score
}