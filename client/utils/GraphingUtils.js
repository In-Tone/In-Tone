import Chart from 'chart.js';

// draw graph function using chart.js
export const drawGraph = (context, xLabels, results, targetPitches, score) => {
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
				},
				title: {
					display: true,
					position: 'top',
					text: `Pitch Contour Graphs ${score ? `| Your Score: ${score}%` : ''}`,
					fontSize: 20
				}
			}
		}

		// create graph object, which draws the chart on the canvas element
		// let pitchesGraph = new Chart(context, graphObject);
		return new Chart(context, graphObject);
};
