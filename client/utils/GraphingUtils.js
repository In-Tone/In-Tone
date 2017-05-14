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
					// pointRadius: 2,
					spanGaps: true
				},{
					label: 'target pitch',
					data: targetPitches,
					borderCapStyle: 'butt',
					borderColor: 'blue',
					// pointRadius: 2,
					spanGaps: true
				}]
			},
			options: {   // pim: added fixed y labels
				scales: {
					yAxes: [
						{
							ticks: {
								max: 500,
								min: 75,
								stepSize: 50
							}
						}
					]
				}
			}
		}

		let pitchesGraph = new Chart(context, graphObject);
		// return pitchesGraph;
};
