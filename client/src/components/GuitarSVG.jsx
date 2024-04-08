import { useState, useRef, useEffect } from 'react';

export const GuitarSVG = () => {
  const [noteMap, setNoteMap] = useState([
    [
      'Ab3',
      'G3 ',
      'Gb3',
      'F3 ',
      'E3 ',
      'Eb3',
      'D3 ',
      'Db3',
      'C3 ',
      'B2 ',
      'Bb2',
      'A2 ',
      'Ab2',
      'G2 ',
      'Gb2',
      'F2 ',
      'E2 ',
    ],
    [
      'Db4',
      'C4 ',
      'B3 ',
      'Bb3',
      'A3 ',
      'Ab3',
      'G3 ',
      'Gb3',
      'F3 ',
      'E3 ',
      'Eb3',
      'D3 ',
      'Db3',
      'C3 ',
      'B2 ',
      'Bb2',
      'A2 ',
    ],
    [
      'Gb4',
      'F4 ',
      'E4 ',
      'Eb4',
      'D4 ',
      'Db4',
      'C4 ',
      'B3 ',
      'Bb3',
      'A3 ',
      'Ab3',
      'G3 ',
      'Gb3',
      'F3 ',
      'E3 ',
      'Eb3',
      'D3 ',
    ],
    [
      'B4 ',
      'Bb4',
      'A4 ',
      'Ab4',
      'G4 ',
      'Gb4',
      'F4 ',
      'E4 ',
      'Eb4',
      'D4 ',
      'Db4',
      'C4 ',
      'B3 ',
      'Bb3',
      'A3 ',
      'Ab3',
      'G3 ',
    ],
    [
      'Eb5',
      'D5 ',
      'Db5',
      'C5 ',
      'B4 ',
      'Bb4',
      'A4 ',
      'Ab4',
      'G4 ',
      'Gb3',
      'F4 ',
      'E4 ',
      'Eb4',
      'D4 ',
      'Db4',
      'C4 ',
      'B3 ',
    ],
    [
      'Ab5',
      'G5 ',
      'Gb5',
      'F5 ',
      'E5 ',
      'Eb5',
      'D5 ',
      'Db5',
      'C5 ',
      'B4 ',
      'Bb4',
      'A4 ',
      'Ab4',
      'G4 ',
      'Gb4',
      'F4 ',
      'E4 ',
    ],
  ])
  const [isPlaying, setIsPlaying] = useState(false)
  const stringsRef = useRef([]);

  useEffect(() => {

    const stringVibrationTimes = [0, 0, 0, 0, 0, 0];
    stringsRef.current = Array.from(document.querySelectorAll('.string'));

    const intervalId = setInterval(() => {
      stringsRef.current.forEach((stringEl, key) => {
        if (stringVibrationTimes[key] > 0) {
          stringEl.classList.add('vibrating');
        } else {
          stringEl.classList.remove('vibrating');
        }

        stringVibrationTimes[key] -= 50;

        if (stringVibrationTimes[key] < 0) {
          stringVibrationTimes[key] = 0;
        }
      });
    }, 50);

    const soundFontUrl = '../../sound/';
    function playNote(stringKey, note, force = false) {
      if (isPlaying || force) {

        const audio = new Audio(soundFontUrl + note.trim() + '.mp3');
        audio.play();

        stringVibrationTimes[stringKey] = 3000;
      }
    }

    const svg = document.querySelector('#guitar');

    noteMap.forEach((string, stringKey) => {
      string.forEach((note, noteKey) => {
        const area = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect'
        );
        area.setAttribute('x', noteKey * 110);
        area.setAttribute('y', 315 + 29.3 * stringKey);
        area.setAttribute('width', 110);
        area.setAttribute('height', 20);
        area.setAttribute('fill', '#fff');
        area.setAttribute('opacity', '0');
        area.addEventListener('click', () => {
          playNote(stringKey, note, true);
        });
        svg.appendChild(area);
      });
    });

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  return (
    <div className="guitar-container">
      <svg
        id="guitar"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 2400 800"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="fretboard" x1="42%" y1="0%" x2="0%" y2="90%">
            <stop offset="0%" style={{ stopColor: 'rgb(56, 53, 53)' }} />
            <stop offset="100%" style={{ stopColor: 'rgb(56, 49, 43)' }} />
          </linearGradient>

          <linearGradient
            id="fredboardBorder"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: 'rgb(111, 111, 111)' }} />
            <stop offset="53%" style={{ stopColor: 'rgb(255, 255, 255)' }} />
            <stop offset="100%" style={{ stopColor: 'rgb(160, 160, 160)' }} />
          </linearGradient>

          <linearGradient id="fret" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'rgb(122, 117, 113)' }} />
            <stop offset="100%" style={{ stopColor: 'rgb(56, 49, 43)' }} />
          </linearGradient>

          <filter id="dropshadow" height="400%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="4" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <polygon
          points="-10,300 1860,300 1950,230 2380,400 1950,570 1860,500 -10,500"
          fill="url(#fretboard)"
          strokeWidth="10"
          stroke="url(#fredboardBorder)"
          style={{ filter: 'url(#dropshadow)' }}
          strokeLinejoin="round"
        />

        <path
          d="
      M110 305 110 495 M220 305 220 495 M330 305 330 495 M440 305 440 495
      M550 305 550 495 M660 305 660 495 M770 305 770 495 M880 305 880 495
      M990 305 990 495 M1100 305 1100 495 M1210 305 1210 495 M1320 305 1320 495
      M1430 305 1430 495 M1540 305 1540 495 M1650 305 1650 495 M1760 305 1760 495
      M1858 305 1858 495
    "
          strokeWidth="10"
          stroke="rgb(122, 117, 113)"
        />

        <rect
          className="string"
          x="0"
          y="324.3"
          width="1864"
          height="5"
          fill="#ccc"
        />
        <rect
          className="string"
          x="0"
          y="353.6"
          width="1864"
          height="5"
          fill="#ccc"
        />
        <rect
          className="string"
          x="0"
          y="382.9"
          width="1864"
          height="5"
          fill="#ccc"
        />
        <rect
          className="string"
          x="0"
          y="412.2"
          width="1864"
          height="5"
          fill="#ccc"
        />
        <rect
          className="string"
          x="0"
          y="441.5"
          width="1864"
          height="5"
          fill="#ccc"
        />
        <rect
          className="string"
          x="0"
          y="470.8"
          width="1864"
          height="5"
          fill="#ccc"
        />

        <polygon points="1863,324.3 1980,290 1980,295 1863,329.3" fill="#ccc" />
        <polygon points="1863,353.6 2065,330 2065,335 1863,358.6" fill="#ccc" />
        <polygon points="1863,382.9 2150,365 2150,370 1863,387.9" fill="#ccc" />
        <polygon points="1863,412.2 2150,445 2150,450 1863,417.2" fill="#ccc" />
        <polygon points="1863,441.5 2065,475 2065,480 1863,446.5" fill="#ccc" />
        <polygon points="1863,470.8 1980,505 1980,510 1863,475.8" fill="#ccc" />

        <circle
          cx="1980"
          cy="510"
          r="20"
          fill="url(#fretboard)"
          strokeWidth="15"
          stroke="url(#fredboardBorder)"
        />
        <circle
          cx="2065"
          cy="480"
          r="20"
          fill="url(#fretboard)"
          strokeWidth="15"
          stroke="url(#fredboardBorder)"
        />
        <circle
          cx="2150"
          cy="445"
          r="20"
          fill="url(#fretboard)"
          strokeWidth="15"
          stroke="url(#fredboardBorder)"
        />
        <circle
          cx="2150"
          cy="365"
          r="20"
          fill="url(#fretboard)"
          strokeWidth="15"
          stroke="url(#fredboardBorder)"
        />
        <circle
          cx="2065"
          cy="330"
          r="20"
          fill="url(#fretboard)"
          strokeWidth="15"
          stroke="url(#fredboardBorder)"
        />
        <circle
          cx="1980"
          cy="290"
          r="20"
          fill="url(#fretboard)"
          strokeWidth="15"
          stroke="url(#fredboardBorder)"
        />
      </svg>
    </div>
  );
};