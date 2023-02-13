import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import { View } from 'src/components/common';
import useSound from 'use-sound';
import './styles.scss';

const clsPrefix = 'ctn-couple-music-player';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    min: '',
    sec: '',
  });
  const [currTime, setCurrTime] = useState({
    min: '',
    sec: '',
  });

  const [seconds, setSeconds] = useState();

  const [play, { pause, duration, sound }] = useSound(
    'https://firebasestorage.googleapis.com/v0/b/taptaponme.appspot.com/o/Em-Dong-Y-I-Do-Duc-Phuc-911.mp3?alt=media&token=a6f27a7a-0b08-4200-8dfb-7fb7f6b36cc4',
  );

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min + '',
        sec: secRemain + '',
      });
    }
  }, [duration, isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min: `${min}`,
          sec: `${sec}`,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };
  return (
    <View className={`${clsPrefix}`}>
      <div className="player-pause">
        <div
          className={classNames('music-cover', {
            active: isPlaying,
          })}>
          <img
            src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/4/0/d/c40dbb2a1bf4dfd1229b7bc29efebe4b.jpg"
            alt="music-player"
          />
        </div>
        <div className="player-controls">
          <button className="playButton">
            <FaBackward />
          </button>
          {!isPlaying ? (
            <button className="playButton" onClick={playingButton}>
              <FaPlay />
            </button>
          ) : (
            <button className="playButton" onClick={playingButton}>
              <FaPause />
            </button>
          )}
          <button className="playButton">
            <FaForward />
          </button>
        </div>
      </div>
      <div
        className={classNames('player-track', {
          active: isPlaying,
        })}>
        <div>
          <h3 className="album-name">Em Đồng Ý (I Do)</h3>
          <p className="track-name">Đức Phúc x 911</p>
        </div>
        <div>
          <div
            className={classNames('track-time', {
              active: isPlaying,
            })}>
            <p className="current-time">
              {currTime.min}:{currTime.sec}
            </p>
            <p className="track-length">
              {time.min}:{time.sec}
            </p>
          </div>
          <input
            type="range"
            min="0"
            max={duration / 1000}
            defaultValue="0"
            value={seconds}
            className="timeline"
            onChange={e => {
              sound.seek([e.target.value]);
            }}
          />
        </div>
      </div>
    </View>
  );
};

export default MusicPlayer;
