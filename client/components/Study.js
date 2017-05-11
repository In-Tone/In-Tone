import React, { Component } from 'react';
import { connect } from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
const Chart = require('chart.js');
import { Grid } from 'react-bootstrap';
import Pitchfinder from 'pitchfinder';

import toWav from 'audiobuffer-to-wav';

// request the MP3 as binary
// xhr({
//   uri: 'audio/track.mp3',
//   responseType: 'arraybuffer'
// }, function (err, body, resp) {
//   if (err) throw err
//   // decode the MP3 into an AudioBuffer
//   audioContext.decodeAudioData(resp, function (buffer) {
//     // encode AudioBuffer to WAV
//     var wav = toWav(buffer)

//     // do something with the WAV ArrayBuffer ...
//   })
// })

class Study extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			languageValue: 1,
			targetIMG: '',
			targetTranslation: '',
			// chart data
			userPitches: [],
			targetPitches: [83,87,87,87,87,87,87,87,87,92,281,281,283,281,277,276,276,276,276,277,277,279,279,281,281,277,277,272,271,264,261,255,246,231,208,193,170,155,145,142,142,142],
			chartLabels: [],
			audioBuffer: [],
            targetDuration: 641.587,
      /// FROM THE STORE!!!!!  ///
      targets: [],
      tone_type_id: 0,
      language: '',
      tone: '',
      englishTranslation: '',
      toneId: '',
      pitches: [],
      nativeSpelling: '',
      transliteration: '',
      wav: ''

		}
		this.selectLanguage = this.selectLanguage.bind(this);
    this.randomReset = this.randomReset.bind(this);

    // REMOVE ME
    // this.targets = this.props.targets;

    // remove
    this.logger = this.logger.bind(this);
	}

	selectLanguage(event, index, value) {
		this.setState({languageValue: value})
		// mapDispatchToProps to get the right information for that language
	}

	// play target audio
	getTargetAudio(targetWord) {

	}

	// record audio input
	recordAudio() {
		// import and invoke the record audio function extracted from
		// audioinput.js
	}

	// select next word
	nextWord() {

	}

	// go back to the previous word
	previousWord() {

	}

	// toggle pitch contour graph (own, target, combined)
	toggleOverlay() {

	}

  logger() {
    console.log(this.targets);
  }

  randomReset() {
    let currentToneId = this.state.toneId;
    let randNum = Math.floor(Math.random()*targets.length);

    while(currentToneId === randNum) {
      randNum = Math.floor(Math.random()*targets.length);
    };

    this.setState({
      tone_type_id: targets[randNum].tone_type_id,
      language: targets[randNum].language,
      tone: targets[randNum].tone,
      englishTranslation: targets[randNum].englishTranslation,
      toneId: targets[randNum].toneId,
      pitches: targets[randNum].pitches,
      nativeSpelling: targets[randNum].nativeSpelling,
      transliteration: targets[randNum].transliteration,
      wav: targets[randNum].wav
    });
  }

	componentDidMount(){
    const targets = this.props.targets;
    this.setState({ targets });

    let randNum = Math.floor(Math.random()*targets.length);

    this.setState({
      tone_type_id: targets[randNum].tone_type_id,
      language: targets[randNum].language,
      tone: targets[randNum].tone,
      englishTranslation: targets[randNum].englishTranslation,
      toneId: targets[randNum].toneId,
      pitches: targets[randNum].pitches,
      nativeSpelling: targets[randNum].nativeSpelling,
      transliteration: targets[randNum].transliteration,
      wav: targets[randNum].wav
    });

    if (!window.AudioContext) {
        if (!window.webkitAudioContext) {
            alert('no audiocontext found');
    }
        window.AudioContext = window.webkitAudioContext;
    }

    // create audio context and canvas
    var context = new AudioContext();

    // create filter nodes
    var hpFilter = context.createBiquadFilter();
    hpFilter.type = "highpass";
    hpFilter.frequency.value = 85;
    hpFilter.gain.value = 10;

    var lpFilter = context.createBiquadFilter();
    lpFilter.type = "lowpass";
    lpFilter.frequency.value = 900;
    lpFilter.gain.value = 10;

    // Create a compressor node
    var compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    // compressor.reduction.value = -20;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;

    // create analyzer node
    var viz = context.createAnalyser();
    viz.fftSize = 2048;

    // capture reference to this component so we can set state below
    var self = this;

    var test = document.getElementById('soundSample');
    test.onloadedmetadata = function() {
        console.log('test.duration', test.duration)
    }

    // constraints object for getUserMedia stream (tells the getUserMedia what kind of data object it will receive)
    var constraints = { audio: true, video: false };
    // set up stream -- is a promise -- recording happens in .then off it
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {

        // create MediaRecorder instance
        var mediaRecorder = new MediaRecorder(stream);

        // holder for audio
        var recording = [];

        // when data is available, push available data to recording array
        // as written, data is available when 'stop' is clicked which calls .stop on the mediaRecorder instance
        mediaRecorder.ondataavailable = function(e) {
            recording.push(e.data);
        };

        // create audioNode stream source with stream so we can route it through the audioContext
        var source = context.createMediaStreamSource(stream);
        // connect it to the nodes
        source.connect(viz);
        // lpFilter.connect(hpFilter);
        // hpFilter.connect(viz);
        viz.connect(compressor);

        // grab DOM buttons
        var record = document.getElementById("Record");
        // var stop = document.getElementById("stop");

        // declare setInterval variable outside so we can kill the interval in a separate function
        var repeatDraw;

        var duration = self.state.targetDuration;

        // onclick handler for record button
        record.onclick = function() {
            console.log('duration', duration);
            var countdown = document.getElementById('countdown');
            console.log(countdown);
            var seconds = 3;
            countdown.innerHTML = seconds;
            var countdownTimer = setInterval(() => {
                seconds = seconds-1;
                countdown.innerHTML = (seconds > 0) ? seconds : "Go!";
            }, 1000);
            setTimeout(() => {
                clearInterval(countdownTimer);
                record.style.background = "red";
                record.style.color = "black";
            }, 3000);
            setTimeout(() => {
                // connect stream to speakers, making it audible
                viz.connect(context.destination);
                // call .start on mediaRecorder instance
                mediaRecorder.start();
            }, 3500);
            setTimeout(() => {
                // setInterval to continually rerender waveform
            	record.style.background = "";
            	record.style.color = "";
            	mediaRecorder.stop();
            	viz.disconnect(context.destination);
            }, duration+3500);
        };

        // onclick handler for stop button
        // stop.onclick = function() {
        //     // disconnect from speakers, effectively muting stream
        //     viz.disconnect(context.destination);
        //     // call stop on mediaRecorder, firing a "data available" event which trigger .ondataavailable
        //     mediaRecorder.stop();
            // record.style.background = "";
            // record.style.color = "";
        //     clearInterval(repeatDraw);
        // }

        // onstop handler for mediaRecorder -- when stopped, this says what to do with the recorded data
        mediaRecorder.onstop = function(e) {
            console.log("recorder stopped");

            // prompt to name the file
            var clipName = prompt('Enter a name for your sound clip');

            // create audio element to post to page
            var clipContainer = document.createElement('article');
            var clipLabel = document.createElement('p');
            var audio = document.getElementById('soundSample');
            var deleteButton = document.createElement('button');

            // add created audio element to page
            clipContainer.classList.add('clip');
            audio.setAttribute('controls', '');
            deleteButton.innerHTML = "Delete";
            clipLabel.innerHTML = clipName;
            // clipContainer.appendChild(audio);
            // clipContainer.appendChild(clipLabel);
            // clipContainer.appendChild(deleteButton);
            // soundClips.appendChild(clipContainer);

            // create Blob for access by audio element, set as src for playback
            var blob = new Blob(recording, { 'type' : 'audio/ogg; codecs=opus' });
            recording = [];
            var audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;

            console.log("blob", blob);

            // use FileReader to access the Blob data
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                // not sure yet if we need the raw reader.result or the Uint8Array version on state, and if it matters
                // var buffer = new Uint8Array(reader.result);

                context.decodeAudioData(reader.result).then((data) => {

                const detectPitch = new Pitchfinder.YIN();
                const detectors = [detectPitch, Pitchfinder.AMDF()];

                const float32Array = data.getChannelData(0); // get a single channel of sound
                // const pitch = detectPitch(float32Array); // null if pitch cannot be identified

                // 500 bpm = 8.33 beats per second
                // quantization = 4 --> 33.32 samples per second
                let frequencies = Pitchfinder.frequencies(detectors, float32Array, {
                tempo: 500, // in BPM, defaults to 120
                quantization: 8, // samples per beat, defaults to 4 (i.e. 16th notes)
                }).map(freq => Math.round(freq));

                let results = [];

                frequencies.forEach(freq => {
                    if (typeof freq !== 'number' || freq > 1000 || isNaN(freq) ) {
                        if (!results.length) {
                            results.push(0);
                        } else {
                            results.push(results[results.length - 1])
                        }
                    } else {
                        results.push(freq);
                    }
                })

                // filter out bad data - hacky for now, throws out nulls and high values
                // frequencies = frequencies.filter(freq => {
                // if (typeof freq === 'number') {
                //   return freq < 1000
                // }
                // return false
                // }).map(freq => Math.round(freq))

                console.log('all freqs: ', frequencies);
                console.log('target pitches', targetPitches);
                console.log("results frequencies", results);


                var outerArray =[];

                targetPitches.map((pitch, i) => {
                    var diff = Math.abs(pitch - results[i]);
                    if (diff > 0 && diff < 10) {
                        outerArray.push([diff, i]);
                    }
                })

                // for (let i = 0; i < targetPitches.length; i++) {
                //     var innerArray =[];
                //     if (targetPitches[i] === 0) {
                //         continue;
                //     }
                //     for (let k = 0; k < results.length; k++) {
                //             if (Math.abs(targetPitches[i] - results[k]) < 20) {
                //             innerArray.push(targetPitches[i]);
                //             innerArray.push(results[k]);
                //             outerArray.push(innerArray);
                //         }
                //         innerArray = [];
                //     }
                // }

                console.log("test comparison", outerArray);

                var chartCtx = document.getElementById("studyChart").getContext("2d");

                var index = outerArray[0][1];

                var one = results.slice(index);
                var two = targetPitches.slice(index);
                var three = outerArray.map(arr => arr[0]);

                console.log("one", one);
                console.log("two", two);

                let myLineChart = new Chart(chartCtx, {
                type: 'line',
                data: {
                	labels: one,
	                datasets: [{
                        label: 'user pitch',
                        data: one,
                        borderCapStyle: 'butt',
                        borderColor: 'blue'
                        },
                        {
	                	label: 'target pitch',
	                	data: two,
	                	borderCapStyle: 'butt',
	                	borderColor: 'red'
	                },
                    {
                        label: 'difference',
                        data: three,
                        borderCapStyle: 'butt',
                        borderColor: 'green'
                    }]
                }
                });



                    console.log("data", data);
                    self.setState({
                        arrayBuffer: data,
                        userPitches: frequencies,
                        chartLabels: frequencies
                    });
                    console.log("state: ", self.state);
                });

            });
            // once read, fires "loadend" event, then above callback runs to set state
            reader.readAsArrayBuffer(blob);

            // delete button
            deleteButton.onclick = function(e) {
                var evtTgt = e.target;
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
            };
        };

    }).catch(function(err) {
        console.log(err);
    });
}

	render() {
		return (
			<div className='studyDiv'>
				<Card>
					<CardMedia
						overlay={<CardTitle title='Transliteration Here' subtitle='English Translation Here'/>}
					>
						{/* REPLACE WITH PROPS.TARGET_IMAGE */}
						<img src='https://2.bp.blogspot.com/_Jjs-Zmd-bB8/TMw7Wn6VccI/AAAAAAAAACc/Zw4oEbOZgNA/s400/Sawasdee.png' />
					</CardMedia>
					<CardActions style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
						<RaisedButton label='Tone' onClick={this.logger} />
						<RaisedButton id='Record'>
              <p id="countdown">Record</p>
            </RaisedButton>
						<DropDownMenu
							value={this.state.languageValue}
							style={{width:'15%'}}
							autoWidth={false}
							onChange={this.selectLanguage}
						>
							<MenuItem value={1} primaryText='Language' />
							<MenuItem value={2} primaryText='Thai' />
							<MenuItem value={3} primaryText='Chinese' />
							<MenuItem value={4} primaryText='Hmong' />
						</DropDownMenu>
						<RaisedButton label='Next' onClick={this.randomReset}/>
						<RaisedButton label='Overlay' />
					</CardActions>
				</Card>
				<br />
				<audio controls id='soundSample' src='/audio/Falling-Chai-Yes-Clipped.wav'/>
				<Paper zDepth={1}>
					<canvas id='studyChart' ></canvas>
				</Paper>
				<div id='soundClips'></div>
			</div>
		)
	}
}


const mapStateToProps = state => ({
  targets: state.targets
})

const mapDispatchToProps = dispatch => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Study)
