import React from 'react'
import Lottie from 'react-lottie-player'

export default function AnimationOutput({ animationUrl, transcription }) {
  const [animationData, setAnimationData] = React.useState(null)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [speed, setSpeed] = React.useState(1)

  React.useEffect(() => {
    if (animationUrl) {
      fetch(animationUrl)
        .then((res) => res.json())
        .then((data) => setAnimationData(data))
        .catch(() => setAnimationData(null))
    }
  }, [animationUrl])

  if (!animationData) {
    return <div className="mt-4 text-center text-gray-600">No animation available</div>
  }

  return (
    <section className="mt-4">
      <div className="flex justify-center">
        <Lottie
          loop
          animationData={animationData}
          play={isPlaying}
          speed={speed}
          style={{ width: 300, height: 300 }}
          aria-label="Indian Sign Language animation"
        />
      </div>
      <div className="mt-2 text-center">
        <p className="mb-2 font-semibold">Transcription:</p>
        <p className="mb-4">{transcription}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => setSpeed(0.5)}
            className={`px-3 py-1 rounded focus:outline-none focus:ring-2 ${
              speed === 0.5 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
            aria-label="Set speed to 0.5x"
          >
            0.5x
          </button>
          <button
            onClick={() => setSpeed(1)}
            className={`px-3 py-1 rounded focus:outline-none focus:ring-2 ${
              speed === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
            aria-label="Set speed to 1x"
          >
            1x
          </button>
          <button
            onClick={() => setSpeed(1.5)}
            className={`px-3 py-1 rounded focus:outline-none focus:ring-2 ${
              speed === 1.5 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
            aria-label="Set speed to 1.5x"
          >
            1.5x
          </button>
        </div>
      </div>
    </section>
  )
}
