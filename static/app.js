var f = require('flocking/dist/flocking-no-jquery.js');
var synth = {};
var environment, buffer;

/*
initFlocking
------------
initializes our synthesizer
*/
function initFlocking()
{
  environment = flock.init();

  // Expose any public functions or constructors as properties on your namesapce.
  synth.play = function () {
    this.flocking_instance = flock.synth({
      synthDef: {
        id: "doomsynth",
        ugen: "flock.ugen.sin",
        freq: {
          ugen: "flock.ugen.lfNoise",
          freq: 10,
          mul: 380,
          add: 60
        },
        mul: 0.1
      }
    });
    environment.start();

    // buffer = flock.bufferLoader({
    //   bufferDefs: [
    //     id: "doomsynth"
    //   ],
    //   listeners: {
    //     afterBuffersLoaded: function(e) {
    //       console.log(e);
    //     }
    //   }
    // })
  }
};

/*
initializeAudioVisualizer
------------------------
bootstraps our d3 instance and builds audio
visualizer to link with our flocking synth
*/

function initializeAudioVisualizer(s)
{
  var player = s.flocking_instance.input('doomsynth');
  // console.log(player);
  flock.webAudio.contextWrapper().context.listener.onstatechange = function(e) {
    console.log(e);
  }
  // player.onInputChanged(function(e){
  //   console.log(e);
  // })
  // var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // var audioElement = this.props.audioElement;
  // var audioSrc = audioCtx.createMediaElementSource(audioElement);
  // var analyser = audioCtx.createAnalyser();
  //
  // // Bind our analyser to the media element source.
  // audioSrc.connect(analyser);
  // audioSrc.connect(audioCtx.destination);
  //
  // var frequencyData = new Uint8Array(200);
  // var svgHeight = this.getDOMNode().parentNode.style.height || '300';
  // var svgWidth = this.getDOMNode().parentNode.style.width || '1200';
  // var barPadding = '0.3';
  //
  // function createSvg(parent, height, width) {
  //   return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  // }
  //
  // var svg = createSvg(this.getDOMNode(), svgHeight, svgWidth);
  //
  // // Create our initial D3 chart.
  // svg.selectAll('rect')
  //    .data(frequencyData)
  //    .enter()
  //    .append('rect')
  //    .attr('x', function (d, i) {
  //       return i * (svgWidth / frequencyData.length);
  //    })
  //    .attr('width', svgWidth / frequencyData.length - barPadding);
  //
  //   // Continuously loop and update chart with frequency data.
  //   function renderChart() {
  //     requestAnimationFrame(renderChart);
  //
  //     // Copy frequency data to frequencyData array.
  //     analyser.getByteFrequencyData(frequencyData);
  //
  //     // Update d3 chart with new data.
  //     svg.selectAll('rect')
  //       .data(frequencyData)
  //       .attr('y', function(d) {
  //         return svgHeight - d;
  //       })
  //       .attr('height', function(d) {
  //         return d;
  //       })
  //       .attr('fill', function(d) {
  //         return 'rgb(0, 0, ' + d + ')';
  //       });
  //   }
  //
  //   // Run the loop
  //   renderChart();
}

window.onload = function() {
  initFlocking()
  synth.play()
  initializeAudioVisualizer(synth)
 }
