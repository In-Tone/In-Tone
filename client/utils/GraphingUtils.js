import Chart from 'chart.js';

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

		let pitchesGraph = new Chart(context, graphObject);
		// return pitchesGraph;
};