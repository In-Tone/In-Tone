import React, { Component } from 'react';
import { connect } from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
const Chart = require('chart.js');
import Pitchfinder from 'pitchfinder';
import { Grid, Row, Col } from 'react-bootstrap';

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
      // collection of targets for a given language; cycle through these;
          targets: [],
          // information for current target
          duration: '',
          englishTranslation: '',
          language: '',
          nativeSpelling: '',
          pitches: [],
          tone: '',
          tone_type_id: 0, // id for toneType db model
          toneId: '', // id for Target db model
          transliteration: '',
          wav: '',
          previous: {}

		}
		this.selectLanguage = this.selectLanguage.bind(this);
    this.randomReset = this.randomReset.bind(this);
    this.previous = this.previous.bind(this);

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
    console.log(this.state);
  }

  randomReset() {

    // console.log(this.state.nativeSpelling);

    let targets = this.state.targets;
    let currentToneId = this.state.toneId;
    let randNum = Math.floor(Math.random()*targets.length);

    while(currentToneId === randNum) {
      randNum = Math.floor(Math.random()*targets.length);
    };

    this.setState({
        previous: {
          duration: this.state.duration,
          englishTranslation: this.state.englishTranslation,
          language: this.state.language,
          nativeSpelling: this.state.nativeSpelling,
          pitches: this.state.pitches,
          tone: this.state.tone,
          tone_type_id: this.state.tone_type_id,
          toneId: this.state.toneId,
          transliteration: this.state.transliteration,
          wav: this.state.wav
        }
    })

    this.setState({
      tone_type_id: targets[randNum].tone_type_id,
      language: targets[randNum].language,
      tone: targets[randNum].tone,
      englishTranslation: targets[randNum].englishTranslation,
      toneId: targets[randNum].toneId,
      pitches: targets[randNum].pitches,
      nativeSpelling: targets[randNum].nativeSpelling,
      transliteration: targets[randNum].transliteration,
      wav: targets[randNum].wav,
      duration: targets[randNum].duration
    });
  }


  // BETA VERSION ONLY
  previous() {
    let previous = this.state.previous;

    this.setState({
      tone_type_id: previous.tone_type_id,
      language: previous.language,
      tone: previous.tone,
      englishTranslation: previous.englishTranslation,
      toneId: previous.toneId,
      pitches: previous.pitches,
      nativeSpelling: previous.nativeSpelling,
      transliteration: previous.transliteration,
      wav: previous.wav
    });

  }

  componentWillMount() {
    const targets = this.props.targets;
    const pitches = this.state.pitches;

    // console.log('what is targets', targets)
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
      wav: targets[randNum].wav,
      duration: targets[randNum].duration
    });
  }

  componentDidMount(){
    const pitches = this.state.pitches;

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
        // console.log('test.duration', test.duration)
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

        var duration = self.state.duration;

        // onclick handler for record button
        record.onclick = function() {
            // console.log('duration', duration);
            var countdown = document.getElementById('countdown');
            // console.log(countdown);
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
                // viz.connect(context.destination);
                // call .start on mediaRecorder instance
                mediaRecorder.start();
            }, 3000);
            setTimeout(() => {
                // setInterval to continually rerender waveform
            	record.style.background = "";
            	record.style.color = "";
            	mediaRecorder.stop();
            	viz.disconnect(context.destination);
            }, 4000+duration);
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
            // console.log("recorder stopped");

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

            // console.log("blob", blob);

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

                console.log('all freqs: ', frequencies);
                console.log('target pitches', pitches);

                // pim's filtering:
                // we can use span gaps so NaN is not a problem:
                // filter out pitches above 500 and below 70:
                const results = frequencies.map(freq => {
                    if (freq > 500 || freq < 70) {
                        return NaN
                    }
                    else {
                        return freq
                    }
                });
                console.log('frequencies post throwing out highs an dlows: ', results)

                // get only nums to get avg and sd
                const nums = results.filter(elem => !isNaN(elem));
                const avg = Math.round(average(nums))
                console.log('nums: ', nums)
                console.log('avg: ', avg)


                // get the standard deviation:
                let sd = Math.round(standardDeviation(nums));
                console.log('SD: ', sd)

                function standardDeviation(values){
                    var avg = average(values);

                    var squareDiffs = values.map(function(value){
                        var diff = value - avg;
                        var sqrDiff = diff * diff;
                        return sqrDiff;
                    });

                    var avgSquareDiff = average(squareDiffs);

                    var stdDev = Math.sqrt(avgSquareDiff);
                    return stdDev;
                }

                function average(data){
                    var sum = data.reduce(function(sum, value){
                        return sum + value;
                    }, 0);

                    var avg = sum / data.length;
                    return avg;
                }

                // throw out outliers more than 1.5 * sd
                for (var i = 0; i < results.length; i++) {
                    let curr = results[i];
                    if (isNaN(curr)) {
                        continue;
                    }
                    else if (Math.abs(avg - curr) > 1.5 * sd) {
                        results[i] = NaN
                    }
                }

                console.log('results post filtering: ', results)

                // create ms labels for x axis:
                // console.log('TARGET DURATION: ', duration)
                // console.log('PITCHES.LENGTH: ', pitches.length)
                let increment = Math.floor(duration / pitches.length)
                let ms = increment
                let xLabels = []

                for (let i = 0; i < pitches.length; i++) {
                    xLabels.push(ms + ' ms')
                    ms += increment
                }
                console.log('XLABELS: ', xLabels)

                // // set minimum for a tick to appear:

                // let min;
                // for (let i = 1; i < results.length; i++) {
                //     if (Math.abs(results[i] - results [i-1]) > 100) {
                //         min = results[i];
                //         break;
                //     }
                // }

                // console.log('MIN: ', min)

                var chartCtx = document.getElementById("studyChart").getContext("2d");

                let myLineChart = new Chart(chartCtx, {
                    type: 'line',
                    data: {
                        // labels for the X axis:
                        labels: xLabels,
                        datasets: [{
                            label: 'user pitch',
                            data: results,
                            borderCapStyle: 'butt',
                            borderColor: 'blue',
                            spanGaps: true
                        },{
                            label: 'target pitch',
                            data: pitches,
                            borderCapStyle: 'butt',
                            borderColor: 'red',
                            spanGaps: true
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    // min: min,
                                    max: 400
                                }
                            }]
                        }
                    }
                })

                    // console.log("data", data);
                    self.setState({
                        arrayBuffer: data,
                        userPitches: frequencies,
                        chartLabels: frequencies
                    });
                    // console.log("state: ", self.state);
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

        let transliteration = this.state.transliteration;
        let englishTranslation = this.state.englishTranslation;
        let image = this.state.nativeSpelling;
        let wav = this.state.wav;

        const dropDownMenu = () => (
            <DropDownMenu
                  value={this.state.languageValue}
                  style={{width:'15%'}}
                  autoWidth={false}
                  onChange={this.selectLanguage} >
                  <MenuItem value={1} primaryText='Language' />
                  <MenuItem value={2} primaryText='Thai' />
                  <MenuItem value={3} primaryText='Chinese' />
                  <MenuItem value={4} primaryText='Hmong' />
            </DropDownMenu>
        )

	   return (
            <div className='studyDiv'>

                <Row className='show-grid'>
                    <Col lg={6}>
                        <Paper zDepth={1}>
                            <img src={image} />
                            <h1>{transliteration}</h1>
                            <h2>{englishTranslation}</h2>
                        </Paper>
                    </Col>
                    <Col lg={6}>
                        <Paper zDepth={1}>
                            <RaisedButton label='Previous' onClick={this.previous}/>
                            <RaisedButton id='Record'>
                                <p id="countdown">Record</p>
                            </RaisedButton>
                            <RaisedButton label='Next' onClick={this.randomReset}/>
                            <audio controls id='soundSample' src={wav}/>
                            <div id='soundClips'></div>
                        </Paper>
                    </Col>
                </Row>

                <br />

                <Paper zDepth={1}>
                    <canvas id='studyChart' ></canvas>
                </Paper>
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
