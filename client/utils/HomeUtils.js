'use strict';

export const draw = (viz, canvas, ctx, waveArray) => {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'transparent';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 10;
	ctx.strokeStyle = 'rgb(0, 0, 0)';

	ctx.beginPath();

	let sliceWidth = canvas.width * 1.0 / viz.frequencyBinCount;
	let x = 0;

	for (let i = 0; i < viz.frequencyBinCount; i++) {

		let v = waveArray[i] / 128.0;
		let y = v * canvas.height/2;

		if (i === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}

		x += sliceWidth;
	}

	ctx.lineTo(canvas.width, canvas.height/2);
	ctx.stroke();
	
}