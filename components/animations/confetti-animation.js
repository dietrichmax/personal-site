import React from "react"
import Lottie from "react-lottie"
import data from "../../data/animation-data/confetti.json"

export default function Animation() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <div title="newsletter-animation">
      <Lottie
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          height: '100%',
          width: '100%',
          zIndex: '99999'
        }}
        isClickToPauseDisabled={true}
        options={defaultOptions}
      />
    </div>
  )
}