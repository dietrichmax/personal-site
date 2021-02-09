import React from "react"
import Lottie from "react-lottie"
import data from "../../lib/data/animation-data/confetti.json"

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
          width: '100%',
        }}
        isClickToPauseDisabled={true}
        options={defaultOptions}
      />
    </div>
  )
}
