import Chart from 'chart.js';

// draw graph function using chart.js
export const drawGraph = (context, xLabels, results, targetPitches) => {
	let graphObject = {
			type: 'line',
			data: {
				labels: xLabels,
				datasets: [{
					label: 'user pitch',
					data: results,
					borderCapStyle: 'butt',
					borderColor: 'red',
					spanGaps: true
				},{
					label: 'target pitch',
					data: targetPitches,
					borderCapStyle: 'butt',
					borderColor: 'blue',
					spanGaps: true
				}]
			}
		}

		// create graph object, which draws the chart on the canvas element
		let pitchesGraph = new Chart(context, graphObject);
};