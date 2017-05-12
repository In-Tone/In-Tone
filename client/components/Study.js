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

      //EDITBRANCH: EVERYTHING BELOW THIS IS WHACK WHY DO WE STILL HAVE IT
			targetIMG: '',
			targetTranslation: '',
			// chart data
			userPitches: [],
			targetPitches: [83,87,87,87,87,87,87,87,87,92,281,281,283,281,277,276,276,276,276,277,277,279,279,281,281,277,277,272,271,264,261,255,246,231,208,193,170,155,145,142,142,142],
			chartLabels: [],
			audioBuffer: [],
      // EDITBRANCH: THIS USED TO BE HARDCODED AT 647 AND WAS USED AS THE DURATION FOR OUR BETA WHICH IS WHY
      // EVERYONE GOT CUT OFF UNLESS THE ONE WORD IT WAS HARD CODED TO WAS THE TARGET SMH ROOKIE MISTAKES 
      targetDuration: 0,
      // EDITBRANCH: EVERYTHING ABOVE THIS IS WHACK WHY DO WE STILL HAVE IT

      /// FROM THE STORE!!!!!  ///
      // collection of targets for a given language; cycle through these;
      targets: [],
      // information for current target
      // EDITBRANCH: DURATION WAS INITIALIZED AS A STRING NOT A NUMBER ALSO IT WAS NEVER USED 
      duration: 0,
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

    console.log(this.state.nativeSpelling);

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
    // EDITBRANCH: THIS EXACT VARIABLE IS ALSO DECLARED IN COMPONENTWILLMOUNT BUT ITS POSSIBLE I DID THIS
    const pitches = this.state.pitches;

    console.log('what is targets', targets)
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
    // EDITBRANCH: THIS EXACT VARIABLE IS ALSO DECLARED IN COMPONENTWILLMOUNT BUT ITS POSSIBLE I DID THIS
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

    // EDITBRANCH: WE DONT NEED THIS ANYMORE NOW THAT WE HAVE DURATION AS A FIELD ON THE TARGET DB
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

        // EDITBRANCH: THIS DURATION VARIABLE IS VERY MISLEADING
        var fakeDuration = self.state.targetDuration;

        let targetRunTime = self.state.duration

        // EDITBRANCH: LOG FOR THE DYNAMIC TARGET DURATION
        console.log('THE ACTUAL, DYNAMIC TARGET DURATION', targetRunTime);
        // onclick handler for record button

        /****************** THE SET TIMEOUT IS WHACK USER INPUT GETS CUTOFF AF *************/
        /**********************************************************************************/
        /**********************************************************************************/
        record.onclick = function() {
            console.log('THE ACTUAL, DYNAMIC TARGET DURATION', targetRunTime);
            var countdown = document.getElementById('countdown');
            var seconds = 3;
            countdown.innerHTML = seconds;
            // EDITBRANCH: GENERAL QUESTION WHY IS THIS INCREMENTING FROM 1000 -> 3000 -> 3500 AND NOT 1000 -> 2000 -> 3000??
            var countdownTimer = setInterval(() => {
                seconds = seconds-1;
                countdown.innerHTML = (seconds > 0) ? seconds : "Go!";
            }, 1000);
            setTimeout(() => {
                clearInterval(countdownTimer);
                record.style.background = "red";
                record.style.color = "black";
            }, 2000);
            setTimeout(() => {
                // connect stream to speakers, making it audible
                viz.connect(context.destination);
                // call .start on mediaRecorder instance
                mediaRecorder.start();
            }, 3000);
            setTimeout(() => {
                // setInterval to continually rerender waveform
            	record.style.background = "";
            	record.style.color = "";
            	mediaRecorder.stop();
            	viz.disconnect(context.destination);
            }, 3000+targetRunTime);
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
            // EDITBRANCH: THIS POPUP IS KIND OF ANNOYING SO I COMMENTED IT OUT BUT I THINK ITS A GOOD IDEA
            // TO HAVE SOME KIND OF FEEDBACK WHEN THEIR DONE RECORDING. MAYBE WE SHOULD KEEP THIS OR HAVE SOME
            // KIND OF TOAST OR OTHER POP UP SAYING GOOD JOB OR SOME SHIT IDC BUT FOR TESTING ITS ANNOYING
            //var clipName = prompt('Enter a name for your sound clip');

            // create audio element to post to page
            var clipContainer = document.createElement('article');
            var clipLabel = document.createElement('p');
            var audio = document.getElementById('soundSample');
            var deleteButton = document.createElement('button');

            // add created audio element to page
            clipContainer.classList.add('clip');
            audio.setAttribute('controls', '');
            deleteButton.innerHTML = "Delete";
            // EDITBRANCH: NO CLIPLABEL B/C NO CLIPNAME
            //clipLabel.innerHTML = clipName;

            // clipContainer.appendChild(audio);
            // clipContainer.appendChild(clipLabel);
            // clipContainer.appendChild(deleteButton);
            // soundClips.appendChild(clipContainer);

            // create Blob for access by audio element, set as src for playback
            var blob = new Blob(recording, { 'type' : 'audio/ogg; codecs=opus' });
            recording = [];
            var audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;

            // use FileReader to access the Blob data
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                // not sure yet if we need the raw reader.result or the Uint8Array version on state, and if it matters
                // var buffer = new Uint8Array(reader.result);

                context.decodeAudioData(reader.result).then(data => {

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

                  /**************************************************************************/
                  /**************************************************************************/
                  /************************algo editing starts here**************************/
                  /**************************************************************************/
                  /**************************************************************************/
                  /**************************************************************************/

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

                  // EDITBRANCH: filter out the zeros
                  results = results.filter(freq => freq > 0)

                  // EDITBRANCH: create a 'difference' for each data set: n+1 - n
                  let resultsDiff = [];
                  let targetsDiff = [];

                  // EDITBRANCH: I initially had thse functions push the absolute value of the differences
                  // but that isn't accurate b/c it won't indicate if the graph is rising or falling. The
                  // difference graphs here now show the change of the contour arrays and can be meaningful
                  // for a user (diffArray decreases = contour increases and vice versa)
                  for(var i = 0; i < results.length; i++){
                    // handle last value
                    if(i === results.length){
                      break
                    }
                    resultsDiff.push((results[i + 1] - results[i]))
                  }

                  for(var i = 0; i < pitches.length; i++){
                    // handle last value
                    if(i === pitches.length){
                      break
                    }
                    targetsDiff.push((pitches[i + 1] - pitches[i]))
                  }

                  console.log("results frequencies", results);
                  console.log('pitches frequencies', pitches);

                  // EDITBRANCH: didn't implement it but heres the plan:
                  // THE IDEA: where the values for resultsDiff and targetsDiff at [i] are within a range of
                  // each other, we can determine accuracy of inputted tone (ex. 0 for best, 1-2 for decent, 3+ for bad)
                  // targetsDiff is also helpful b/c there is consistently a large spike in the target audio at the very beginning,
                  // which is usually around when the contour we're interested in starts. So we could slice the targetsDiff array starting
                  // from that index in the pitches array and then be able to accurately compare that to the resultsDiff array. Maybe. I'm not
                  // 100% on that logic holding water. 
                  // FOR USER UNDERSTANDING THERE COULD BE TWO VIEWS ON THE GRAPH (displayed via a toggle): 
                  //    by default it shows the two DIFFERENCE arrays, grading the users according to the rubric above
                  //    toggled option would be the contour overlays for more details. 
                  // ^^ the order could be reversed if people think it makes sense the other way

                  // ALTERNATIVE IDEA: Implement our super baller OG traffic light of success idea. Display the pitch contour color it
                  // according to what our diff arrays determine as good/bad. Green for good, yellow for decent, red for bad. THE TRICK
                  // HERE is making sure our data points lineup, but with the improved duration we're getting within 3-5 so some clever slicing
                  // could be beneficial orrrr just fuck it, it's an approximation we made this in 3 weeks do something about it. 
                  // how to implement: make THREE ARRAYS. a perfect array, a decent array, and a bad array. Bad pushes the value of pitches wherever
                  // (Math.abs(targetsDiff - resultsDiff)) >= 3, and zeroes otherwise. Decent does that for 1-2, perfect for 0. We graph all three and
                  // tell chart.js to IGNORE ZEROES. IT'LL BE SO LIT. I'M PRETTY SURE WE CAN DO THIS. FUCK YEAAAAAAAAAAA
                    // if we wanna get super fancy, we could find the difference w/o Math.abs and take note of positive/negative differences and somehow 
                    // indicate to the user that where negative, they need to raise their inflection and where positive they need to lower their inflection

                  console.log('resultsDiff values', resultsDiff);
                  console.log('targetsDiff values', targetsDiff);

                  let differenceScore = [];
                  // compare the Math.abs() diff between targetsDiff and resultsDiff ** HARD b/c length isn't equal..
                  // for now, just looping through resultsDiff since it's consistently shorter
                  for(var i = 0; i < resultsDiff.length; i++){
                    differenceScore.push(Math.abs(resultsDiff[i] - targetsDiff[i]))
                  }

                  console.log('difference score is: ', differenceScore)

                  // create the three graphing arrays from differenceScore
                  let perfectScore = [];
                  let acceptableScore = [];
                  let failingScore = [];
                  let pointBackgroundColor = [];

                  // push values from pitches into the score arrays if their condition is met. else, push zeros
                  for(var i = 0; i < differenceScore.length; i++){
                    // perfect condition: 0-1
                    if(differenceScore[i] <= 1){
                      perfectScore.push(pitches[i]);
                      pointBackgroundColor.push('green');
                    }else{
                      perfectScore.push(NaN)
                    }
                    
                    // acceptable condition: 2-4
                    if(differenceScore[i] <= 4 && differenceScore[i] >= 2){
                      acceptableScore.push(pitches[i])
                      pointBackgroundColor.push('yellow');
                    }else{
                      acceptableScore.push(NaN)
                    }

                    // failing condition: 5+
                    if(differenceScore[i] >= 5){
                      failingScore.push(pitches[i])
                      pointBackgroundColor.push('red');
                    }else{
                      failingScore.push(NaN)
                    }
                  }

                  console.log('perfect score: ', perfectScore);
                  console.log('acceptableScore', acceptableScore);
                  console.log('failingScore', failingScore);

                  const pitchesShiftedUp = pitches.map(pitch => pitch = pitch + 15)

                  var chartCtx = document.getElementById("studyChart").getContext("2d");

                  let myLineChart = new Chart(chartCtx, {
                    type: 'line',
                    data: {
                    	labels: pitches,
    	                datasets: [
                          {
                            label: 'perfect score - right on!',
                            data: perfectScore,
                            borderCapStyle: 'butt',
                            borderColor: 'green',
                            fill: false,
                            elements: {
                              point: {
                                radius: 8,
                                backgroundColor: 'green',
                                borderWidth: 5
                              }
                            }
                          },
                          {
        	                	label: 'pretty close - getting there!',
        	                	data: acceptableScore,
        	                	borderCapStyle: 'butt',
        	                	borderColor: 'yellow',
                            fill: false
    	                    },
                          {
                            label: 'didnt get it - work on this part!',
                            data: failingScore,
                            borderCapStyle: 'butt',
                            borderColor: 'red',
                            fill: false,
                            elements: {
                              point: {
                                radius: 8,
                                backgroundColor: 'red',
                                borderWidth: 5
                              }
                            }
                          },
                          {
                            label: 'Target Contour',
                            data: pitchesShiftedUp,
                            borderCapStyle: 'butt',
                            borderColor: 'rgba(225, 225, 225, 0.6)',
                            fill: false,
                            pointBackgroundColor: pointBackgroundColor
                          }
                      ]
                    },
                    options: {
                      title: {
                        display: 'true',
                        position: 'top',
                        text: 'PITCH CONTOUR SCORE',
                        fontSize: 20
                      }
                    }
                  });

                  self.setState({
                      arrayBuffer: data,
                      userPitches: frequencies,
                      chartLabels: frequencies
                  });

                // close the decode audio data promise 
                });
            // close the readFile function
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
