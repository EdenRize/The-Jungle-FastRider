import { useRef, useEffect, FC } from 'react'
import Lottie from 'lottie-web'

interface LottieProps {
  animationData: any
}

const LottieAnimation: FC<LottieProps> = ({ animationData }) => {
  const lottieContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lottieContainer.current) {
      Lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: 'svg', // Choose renderer: svg, canvas, html
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          className: 'lottie-svg-class',
        },
      })
    }
  }, [animationData])

  return <div className="lottie" ref={lottieContainer}></div>
}

export default LottieAnimation
