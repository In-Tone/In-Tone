const context = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer;
let sourceNode;

// load the sound
  setupAudioNodes();
  loadSound('./audio/marcCow.wav');

  function setupAudioNodes() {
      // create a buffer source node
      sourceNode = context.createBufferSource();
      // and connect to destination
      sourceNode.connect(context.destination);
  }

  // load the specified sound
  function loadSound(url) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';

      // When loaded decode the data
      request.onload = function() {

          // decode the data
          context.decodeAudioData(request.response, function(buffer) {
              // when the audio is decoded play the sound
              playSound(buffer);
          }, onError);
      }
      request.send();
  }


  function playSound(buffer) {
      console.log('inside playSound')
      sourceNode.buffer = buffer;
      sourceNode.start(0);
  }

  // log if an error occurs
  function onError(e) {
      console.log(e);
  }
