import Chart from 'chart.js';

// draw graph function using chart.js
export const drawGraph = (context, xLabels, results, targetPitches, score, axesLabelsBool) => {
	let graphObject = {
			type: 'line',
			data: {
				labels: xLabels,
				datasets: [{
					label: 'user pitch',
					data: results,
					borderCapStyle: 'butt',
					borderColor: 'red',
					pointRadius: 0,
					spanGaps: true
				},{
					label: 'target pitch',
					data: targetPitches,
					borderCapStyle: 'butt',
					borderColor: 'blue',
					pointRadius: 0,
					spanGaps: true
				}]
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								max: 500,
								min: 50,
								stepSize: 50,
								display: axesLabelsBool
							},
							scaleLabel: {
								display: true,
								labelString: 'Frequency (Hz)',
								fontSize: 18,
							}
						}
					],
					xAxes: [
						{
							ticks:{
								display: axesLabelsBool
							},
							scaleLabel: {
								display: true,
								labelString: 'Time (ms)',
								fontSize: 18
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