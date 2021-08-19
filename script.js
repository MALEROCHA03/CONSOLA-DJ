/* global React, ReactDOM */
/* eslint-disable react/prop-types, react/no-multi-comp */

// eslint-disable-next-line no-unused-vars
const projectName = 'drum-machine';



const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'SAMP',
    url: 'https://s3-us-west-2.amazonaws.com/demo-aud-samp/samples/Cym_Blofeld_1.wav'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: '0 3px orange',
  height: 77,
  marginTop: 13
};

const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: '3px 3px 5px black'
};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    if (this.props.power) {
      if (this.state.padStyle.backgroundColor === 'orange') {
        this.setState({
          padStyle: inactiveStyle
        });
      } else {
        this.setState({
          padStyle: activeStyle
        });
      }
    } else if (this.state.padStyle.marginTop === 13) {
      this.setState({
        padStyle: inactiveStyle
      });
    } else {
      this.setState({
        padStyle: {
          height: 77,
          marginTop: 13,
          backgroundColor: 'grey',
          boxShadow: '0 3px grey'
        }
      });
    }
  }
  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  render() {
    return (
      <div
        className='drum-pad'
        id={this.props.clipId}
        onClick={this.playSound}
        style={this.state.padStyle}
        >
        <audio
          className='clip'
          id={this.props.keyTrigger}
          src={this.props.clip}
        />
        {this.props.keyTrigger}
      </div>
    );
  }
}

class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padBank;
    if (this.props.power) {
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            clip={padBankArr[i].url}
            clipId={padBankArr[i].id}
            keyCode={padBankArr[i].keyCode}
            keyTrigger={padBankArr[i].keyTrigger}
            power={this.props.power}
            updateDisplay={this.props.updateDisplay}
          />
        );
      });
    } else {
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            clip='#'
            clipId={padBankArr[i].id}
            keyCode={padBankArr[i].keyCode}
            keyTrigger={padBankArr[i].keyTrigger}
            power={this.props.power}
            updateDisplay={this.props.updateDisplay}
          />
        );
      });
    }
    return <div className='pad-bank'>{padBank}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: 'Heater Kit',
      sliderVal: 0.3
    };
    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160)
    });
  }
  selectBank() {
    if (this.state.power) {
      if (this.state.currentPadBankId === 'Heater Kit') {
        this.setState({
          currentPadBank: bankTwo,
          display: 'Smooth Piano Kit',
          currentPadBankId: 'Smooth Piano Kit'
        });
      } else {
        this.setState({
          currentPadBank: bankOne,
          display: 'Heater Kit',
          currentPadBankId: 'Heater Kit'
        });
      }
    }
  }
  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name
      });
    }
  }
  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: 'Volume: ' + Math.round(e.target.value * 100)
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }
  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160)
    });
  }
  render() {
    const powerSlider = this.state.power
      ? {
          float: 'right'
        }
      : {
          float: 'left'
        };
    const bankSlider =
      this.state.currentPadBank === bankOne
        ? {
            float: 'left'
          }
        : {
            float: 'right'
          };
    {
      const clips = [].slice.call(document.getElementsByClassName('clip'));
      clips.forEach(sound => {
        sound.volume = this.state.sliderVal;
      });
    }
    return (
      <div className='inner-container' id='drum-machine'>
        <PadBank
          clipVolume={this.state.sliderVal}
          currentPadBank={this.state.currentPadBank}
          power={this.state.power}
          updateDisplay={this.displayClipName}
        />

        <div className='logo'>
          <div className='inner-logo '>{'RX 3000' + String.fromCharCode(160)}</div>
          <i className='inner-logo fa fa-free-code-camp' />
        </div>

        <div className='controls-container'>
          <div className='control'>
            <p>Power</p>
            <div className='select' onClick={this.powerControl}>
              <div className='inner' style={powerSlider} />
            </div>
          </div>
          <p id='display'>{this.state.display}</p>
          <div className='volume-slider'>
            <input
              max='1'
              min='0'
              onChange={this.adjustVolume}
              step='0.01'
              type='range'
              value={this.state.sliderVal}
            />
          </div>
          <div className='control'>
            <p>Bank</p>
            <div className='select' onClick={this.selectBank}>
              <div className='inner' style={bankSlider} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


var Framer = {

  countTicks: 360,

  frequencyData: [],

  tickSize: 10,

  PI: 360,

  index: 0,

  loadingAngle: 0,

  init: function (scene) {
      this.canvas = document.querySelector('canvas');
      this.scene = scene;
      this.context = scene.context;
      this.configure();
  },

  configure: function () {
      this.maxTickSize = this.tickSize * 9 * this.scene.scaleCoef;
      this.countTicks = 360 * Scene.scaleCoef;
  },

  draw: function () {
      this.drawTicks();
      this.drawEdging();
  },

  drawTicks: function () {
      this.context.save();
      this.context.beginPath();
      this.context.lineWidth = 1;
      this.ticks = this.getTicks(this.countTicks, this.tickSize, [0, 90]);
      for (var i = 0, len = this.ticks.length; i < len; ++i) {
          var tick = this.ticks[i];
          this.drawTick(tick.x1, tick.y1, tick.x2, tick.y2);
      }
      this.context.restore();
  },

  drawTick: function (x1, y1, x2, y2) {
      var dx1 = parseInt(this.scene.cx + x1);
      var dy1 = parseInt(this.scene.cy + y1);

      var dx2 = parseInt(this.scene.cx + x2);
      var dy2 = parseInt(this.scene.cy + y2);

      var gradient = this.context.createLinearGradient(dx1, dy1, dx2, dy2);
      gradient.addColorStop(0, '#FE4365');
      gradient.addColorStop(0.6, '#FE4365');
      gradient.addColorStop(1, '#F5F5F5');
      this.context.beginPath();
      this.context.strokeStyle = gradient;
      this.context.lineWidth = 2;
      this.context.moveTo(this.scene.cx + x1, this.scene.cx + y1);
      this.context.lineTo(this.scene.cx + x2, this.scene.cx + y2);
      this.context.stroke();
  },

  setLoadingPercent: function (percent) {
      this.loadingAngle = percent * 2 * Math.PI;
  },

  drawEdging: function () {
      this.context.save();
      this.context.beginPath();
      this.context.strokeStyle = 'rgba(254, 67, 101, 0.5)';
      this.context.lineWidth = 1;

      var offset = Tracker.lineWidth / 2;
      this.context.moveTo(this.scene.padding + 2 * this.scene.radius - Tracker.innerDelta - offset, this.scene.padding + this.scene.radius);
      this.context.arc(this.scene.cx, this.scene.cy, this.scene.radius - Tracker.innerDelta - offset, 0, this.loadingAngle, false);

      this.context.stroke();
      this.context.restore();
  },

  getTicks: function (count, size, animationParams) {
      size = 10;
      var ticks = this.getTickPoitns(count);
      var x1, y1, x2, y2, m = [], tick, k;
      var lesser = 160;
      var allScales = [];
      for (var i = 0, len = ticks.length; i < len; ++i) {
          var coef = 1 - i / (len * 2.5);
          var delta = ((this.frequencyData[i] || 0) - lesser * coef) * this.scene.scaleCoef;
          if (delta < 0) {
              delta = 0;
          }
          tick = ticks[i];
          if (animationParams[0] <= tick.angle && tick.angle <=  animationParams[1]) {
              k = this.scene.radius / (this.scene.radius - this.getSize(tick.angle, animationParams[0], animationParams[1]) - delta);
          } else {
              k = this.scene.radius / (this.scene.radius - (size + delta));
          }
          x1 = tick.x * (this.scene.radius - size);
          y1 = tick.y * (this.scene.radius - size);
          x2 = x1 * k;
          y2 = y1 * k;
          m.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
          if (i < 20) {
              var scale = delta / 50;
              scale = scale < 1 ? 1 : scale;
              allScales.push(scale);
          }
      }
      var sum = allScales.reduce(function(pv, cv) { return pv + cv; }, 0) / allScales.length;
      this.canvas.style.transform = 'scale('+sum+')';
      return m;
  },

  getSize: function (angle, l, r) {
      var m = (r - l) / 2;
      var x = (angle - l);
      var h;

      if (x == m) {
          return this.maxTickSize;
      }
      var d = Math.abs(m - x);
      var v = 70 * Math.sqrt(1 / d);
      if (v > this.maxTickSize) {
          h = this.maxTickSize - d;
      } else {
          h = Math.max(this.tickSize, v);
      }

      if (this.index > this.count) {
          this.index = 0;
      }

      return h;
  },

  getTickPoitns: function (count) {
      var coords = [], step = this.PI / count;
      for (var deg = 0; deg < this.PI; deg += step) {
          var rad = deg * Math.PI / (this.PI / 2);
          coords.push({ x: Math.cos(rad), y: -Math.sin(rad), angle: deg });
      }
      return coords;
  }
};
'use strict';

var Tracker = {

  innerDelta: 20,

  lineWidth: 7,

  prevAngle: 0.5,

  angle: 0,

  animationCount: 10,

  pressButton: false,

  init: function (scene) {
      this.scene = scene;
      this.context = scene.context;
      this.initHandlers();
  },

  initHandlers: function () {
      var that = this;

      this.scene.canvas.addEventListener('mousedown', function (e) {
          if (that.isInsideOfSmallCircle(e) || that.isOusideOfBigCircle(e)) {
              return;
          }
          that.prevAngle = that.angle;
          that.pressButton = true;
          that.stopAnimation();
          that.calculateAngle(e, true);
      });

      window.addEventListener('mouseup', function () {
          if (!that.pressButton) {
              return;
          }
          var id = setInterval(function () {
              if (!that.animatedInProgress) {
                  that.pressButton = false;
                  Player.context.currentTime = that.angle / (2 * Math.PI) * Player.source.buffer.duration;
                  clearInterval(id);
              }
          }, 100);
      });

      window.addEventListener('mousemove', function (e) {
          if (that.animatedInProgress) {
              return;
          }
          if (that.pressButton && that.scene.inProcess()) {
              that.calculateAngle(e);
          }
      });
  },

  isInsideOfSmallCircle: function (e) {
      var x = Math.abs(e.pageX - this.scene.cx - this.scene.coord.left);
      var y = Math.abs(e.pageY - this.scene.cy - this.scene.coord.top);
      return Math.sqrt(x * x + y * y) < this.scene.radius - 3 * this.innerDelta;
  },

  isOusideOfBigCircle: function (e) {
      return Math.abs(e.pageX - this.scene.cx - this.scene.coord.left) > this.scene.radius ||
              Math.abs(e.pageY - this.scene.cy - this.scene.coord.top) > this.scene.radius;
  },

  draw: function () {
      if (!Player.source.buffer) {
          return;
      }
      if (!this.pressButton) {
          this.angle = Player.context.currentTime / Player.source.buffer.duration * 2 * Math.PI || 0;
      }
      this.drawArc();
  },

  drawArc: function () {
      this.context.save();
      this.context.strokeStyle = 'rgba(254, 67, 101, 0.8)';
      this.context.beginPath();
      this.context.lineWidth = this.lineWidth;

      this.r = this.scene.radius - (this.innerDelta + this.lineWidth / 2);
      this.context.arc(
              this.scene.radius + this.scene.padding,
              this.scene.radius + this.scene.padding,
              this.r, 0, this.angle, false
      );
      this.context.stroke();
      this.context.restore();
  },

  calculateAngle: function (e, animatedInProgress) {
      this.animatedInProgress = animatedInProgress;
      this.mx = e.pageX;
      this.my = e.pageY;
      this.angle = Math.atan((this.my - this.scene.cy - this.scene.coord.top) / (this.mx - this.scene.cx - this.scene.coord.left));
      if (this.mx < this.scene.cx + this.scene.coord.left) {
          this.angle = Math.PI + this.angle;
      }
      if (this.angle < 0) {
          this.angle += 2 * Math.PI;
      }
      if (animatedInProgress) {
          this.startAnimation();
      } else {
          this.prevAngle = this.angle;
      }
  },

  startAnimation: function () {
      var that = this;
      var angle = this.angle;
      var l = Math.abs(this.angle) - Math.abs(this.prevAngle);
      var step = l / this.animationCount, i = 0;
      var f = function () {
          that.angle += step;
          if (++i == that.animationCount) {
              that.angle = angle;
              that.prevAngle = angle;
              that.animatedInProgress = false;
          } else {
              that.animateId = setTimeout(f, 20);
          }
      };

      this.angle = this.prevAngle;
      this.animateId = setTimeout(f, 20);
  },

  stopAnimation: function () {
      clearTimeout(this.animateId);
      this.animatedInProgress = false;
  }
};
'use strict';

var Scene = {

  padding: 120,

  minSize: 740,

  optimiseHeight: 982,

  _inProcess: false,

  init: function () {
      this.canvasConfigure();
      this.initHandlers();

      Framer.init(this);
      Tracker.init(this);
      Controls.init(this);

      this.startRender();
  },

  canvasConfigure: function () {
      this.canvas = document.querySelector('canvas');
      this.context = this.canvas.getContext('2d');
      this.context.strokeStyle = '#FE4365';
      this.calculateSize();
  },

  calculateSize: function () {
      this.scaleCoef = Math.max(0.5, 740 / this.optimiseHeight);

      var size = Math.max(this.minSize, 1/*document.body.clientHeight */);
      this.canvas.setAttribute('width', size);
      this.canvas.setAttribute('height', size);
      //this.canvas.style.marginTop = -size / 2 + 'px';
      //this.canvas.style.marginLeft = -size / 2 + 'px';

      this.width = size;
      this.height = size;

      this.radius = (size - this.padding * 2) / 2;
      this.cx = this.radius + this.padding;
      this.cy = this.radius + this.padding;
      this.coord = this.canvas.getBoundingClientRect();
  },

  initHandlers: function () {
      var that = this;
      window.onresize = function () {
          that.canvasConfigure();
          Framer.configure();
          that.render();
      };
  },

  render: function () {
      var that = this;
      requestAnimationFrame(function () {
          that.clear();
          that.draw();
          if (that._inProcess) {
              that.render();
          }
      });
  },

  clear: function () {
      this.context.clearRect(0, 0, this.width, this.height);
  },

  draw: function () {
      Framer.draw();
      Tracker.draw();
      Controls.draw();
  },

  startRender: function () {
      this._inProcess = true;
      this.render();
  },

  stopRender: function () {
      this._inProcess = false;
  },

  inProcess: function () {
      return this._inProcess;
  }
};
'use strict';

var Controls = {

  playing: false,

  init: function (scene) {
      this.scene = scene;
      this.context = scene.context;
      this.initHandlers();
      this.timeControl = document.querySelector('.time');
  },

  initHandlers: function () {
      this.initPlayButton();
      this.initPauseButton();
      this.initSoundButton();
      this.initPrevSongButton();
      this.initNextSongButton();
      this.initTimeHandler();
  },

  initPlayButton: function () {
      var that = this;
      this.playButton = document.querySelector('.play');
      this.playButton.addEventListener('mouseup', function () {
          that.playButton.style.display = 'none';
          that.pauseButton.style.display = 'inline-block';
          Player.play();
          that.playing = true;
      });
  },

  initPauseButton: function () {
      var that = this;
      this.pauseButton = document.querySelector('.pause');
      this.pauseButton.addEventListener('mouseup', function () {
          that.playButton.style.display = 'inline-block';
          that.pauseButton.style.display = 'none';
          Player.pause();
          that.playing = false;
      });
  },

  initSoundButton: function () {
      var that = this;
      this.soundButton = document.querySelector('.soundControl');
      this.soundButton.addEventListener('mouseup', function () {
          if (that.soundButton.classList.contains('disable')) {
              that.soundButton.classList.remove('disable');
              Player.unmute();
          } else {
              that.soundButton.classList.add('disable');
              Player.mute();
          }
      });
  },

  initPrevSongButton: function () {
      var that = this;
      this.prevSongButton = document.querySelector('.prevSong');
      this.prevSongButton.addEventListener('mouseup', function () {
          Player.prevTrack();
          that.playing && Player.play();
      });
  },

  initNextSongButton: function () {
      var that = this;
      this.nextSongButton = document.querySelector('.nextSong');
      this.nextSongButton.addEventListener('mouseup', function () {
          Player.nextTrack();
          that.playing && Player.play();
      });
  },

  initTimeHandler: function () {
      var that = this;
      setTimeout(function () {
          var rawTime = parseInt(Player.context.currentTime || 0);
          var secondsInMin = 60;
          var min = parseInt(rawTime / secondsInMin);
          var seconds = rawTime - min * secondsInMin;
          if (min < 10) {
              min = '0' + min;
          }
          if (seconds < 10) {
              seconds = '0' + seconds;
          }
          var time = min + ':' + seconds;
          that.timeControl.textContent = time;
          that.initTimeHandler();
      }, 300);
  },

  draw: function () {
      this.drawPic();
  },

  drawPic: function () {
      this.context.save();
      this.context.beginPath();
      this.context.fillStyle = 'rgba(254, 67, 101, 0.85)';
      this.context.lineWidth = 1;
      var x = Tracker.r / Math.sqrt(Math.pow(Math.tan(Tracker.angle), 2) + 1);
      var y = Math.sqrt(Tracker.r * Tracker.r - x * x);
      if (this.getQuadrant() == 2) {
          x = -x;
      }
      if (this.getQuadrant() == 3) {
          x = -x;
          y = -y;
      }
      if (this.getQuadrant() == 4) {
          y = -y;
      }
      this.context.arc(this.scene.radius + this.scene.padding + x, this.scene.radius + this.scene.padding + y, 10, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.restore();
  },

  getQuadrant: function () {
      if (0 <= Tracker.angle && Tracker.angle < Math.PI / 2) {
          return 1;
      }
      if (Math.PI / 2 <= Tracker.angle && Tracker.angle < Math.PI) {
          return 2;
      }
      if (Math.PI < Tracker.angle && Tracker.angle < Math.PI * 3 / 2) {
          return 3;
      }
      if (Math.PI * 3 / 2 <= Tracker.angle && Tracker.angle <= Math.PI * 2) {
          return 4;
      }
  }
};
'use strict';

var Player = {

  buffer: null,

  duration: 0,

  tracks: [
      {
          artist: "Post Malone, 21 Savage",
          song: "Rockstar",
          url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/NF%20-%20Let%20You%20Down.mp3"
      }
  ],

  init: function () {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
      this.context.suspend && this.context.suspend();
      this.firstLaunch = true;
      try {
          this.javascriptNode = this.context.createScriptProcessor(2048, 1, 1);
          this.javascriptNode.connect(this.context.destination);
          this.analyser = this.context.createAnalyser();
          this.analyser.connect(this.javascriptNode);
          this.analyser.smoothingTimeConstant = 0.6;
          this.analyser.fftSize = 2048;
          this.source = this.context.createBufferSource();
          this.destination = this.context.destination;
          this.loadTrack(0);

          this.gainNode = this.context.createGain();
          this.source.connect(this.gainNode);
          this.gainNode.connect(this.analyser);
          this.gainNode.connect(this.destination);

          this.initHandlers();
      } catch (e) {
          Framer.setLoadingPercent(1);
      }
      Framer.setLoadingPercent(1);
      Scene.init();
  },

  loadTrack: function (index) {
      var that = this;
      var request = new XMLHttpRequest();
      var track = this.tracks[index];
      document.querySelector('.song .artist').textContent = track.artist;
      document.querySelector('.song .name').textContent = track.song;
      this.currentSongIndex = index;

      request.open('GET', track.url, true);
      request.responseType = 'arraybuffer';

      request.onload = function() {
          that.context.decodeAudioData(request.response, function(buffer) {
              that.source.buffer = buffer;
          });
      };

      request.send();
  },

  nextTrack: function () {
      return;
      ++this.currentSongIndex;
      if (this.currentSongIndex == this.tracks.length) {
          this.currentSongIndex = 0;
      }

      this.loadTrack(this.currentSongIndex);
  },

  prevTrack: function () {
      return;
      --this.currentSongIndex;
      if (this.currentSongIndex == -1) {
          this.currentSongIndex = this.tracks.length - 1;
      }

      this.loadTrack(this.currentSongIndex);
  },

  play: function () {
      this.context.resume && this.context.resume();
      if (this.firstLaunch) {
          this.source.start();
          this.firstLaunch = false;
      }
  },

  stop: function () {
      this.context.currentTime = 0;
      this.context.suspend();
  },

  pause: function () {
      this.context.suspend();
  },

  mute: function () {
      this.gainNode.gain.value = 0;
  },

  unmute: function () {
      this.gainNode.gain.value = 1;
  },

  initHandlers: function () {
      var that = this;

      this.javascriptNode.onaudioprocess = function() {
          Framer.frequencyData = new Uint8Array(that.analyser.frequencyBinCount);
          that.analyser.getByteFrequencyData(Framer.frequencyData);
      };
  }
};
Player.init();

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

