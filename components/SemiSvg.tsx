import { useRef } from 'react';

const urlbase =
  'https://raw.githubusercontent.com/avcdsld/code-as-art/main/semi/metadata';

export default function Container() {
  const audioRef0 = useRef<HTMLAudioElement>(null);
  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const audioRef3 = useRef<HTMLAudioElement>(null);
  const audioRef4 = useRef<HTMLAudioElement>(null);

  const play = (element: HTMLAudioElement) => {
    element.currentTime = 0;
    element.play();
  };

  return (
    <>
      <audio ref={audioRef0} src={`${urlbase}/sounds/0.mp3`}></audio>
      <audio ref={audioRef1} src={`${urlbase}/sounds/1.mp3`}></audio>
      <audio ref={audioRef2} src={`${urlbase}/sounds/2.mp3`}></audio>
      <audio ref={audioRef3} src={`${urlbase}/sounds/3.mp3`}></audio>
      <audio ref={audioRef4} src={`${urlbase}/sounds/4.mp3`}></audio>

      <div
        className="mb-6"
        style={{
          position: 'relative',
          maxWidth: 500,
          backgroundColor: '#fff',
          boxShadow: '0 0 25px 0 rgba(255, 255, 255, .5)'
        }}
      >
        <svg viewBox="0, 0, 150, 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="35" r="18" fill="#fffdb3" />
          <image
            x="20"
            y="20"
            width="30"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            xlinkHref={`${urlbase}/images/0.png`}
            data-type="0"
            onClick={() => {
              play(audioRef0.current);
            }}
          />
          <image
            x="10"
            y="70"
            width="30"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            xlinkHref={`${urlbase}/images/1.png`}
            data-type="1"
            onClick={() => {
              play(audioRef1.current);
            }}
          />
          <image
            x="55"
            y="65"
            width="30"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            xlinkHref={`${urlbase}/images/2.png`}
            data-type="2"
            onClick={() => {
              play(audioRef2.current);
            }}
          />
          <image
            x="100"
            y="20"
            width="30"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            xlinkHref={`${urlbase}/images/3.png`}
            data-type="3"
            onClick={() => {
              play(audioRef3.current);
            }}
          />
          <image
            x="90"
            y="50"
            width="30"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            xlinkHref={`${urlbase}/images/4.png`}
            data-type="4"
            onClick={() => {
              play(audioRef4.current);
            }}
          />
        </svg>
      </div>
    </>
  );
}
