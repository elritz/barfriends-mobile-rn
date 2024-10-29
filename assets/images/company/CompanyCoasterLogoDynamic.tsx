import React from 'react'
import {Defs, Ellipse, G, Path, Rect, Svg} from 'react-native-svg'

import {defaulttheme} from '#/assets/theme/default'
import {ThemeReactiveVar} from '#/reactive'

interface Props {
  width?: number
  height?: number
  backgroundColor?: string
  iconColor?: string
}

const CompanyCoasterLogoDynamic: React.FC<Props> = ({
  width = 100,
  height = 100,
  backgroundColor = ThemeReactiveVar().colorScheme === 'light'
    ? 'white'
    : 'black',
  iconColor = defaulttheme.barfriends.dark.primary,
}: Props) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G filter="url(#filter0_d_108_513)">
        <Rect
          x={4}
          y={4}
          width={500}
          height={500}
          rx={85}
          fill={backgroundColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M412.348 261.667c-1.168-2.477-4.013-8.635-12.886-8.783-1.526-.06-3.621.366-5.878 1.365-13.834 8.605-68.46 44.167-143.596 42.12-10.705.092-73.632-.496-134.904-41.124-3.687-2.427-6.85-2.604-9.73-2.213-4.879.913-8.462 3.53-10.534 8.375-3.4 10.344-5.731 23.788-8.763 32.74-.341 1.052.87 3.208 3.08 2.026 2.65-2.178 13.748-17.092 15.806-19.843 1.586-1.902 3.563-1.375 4.364-.779 13.697 20.202 48.839 91.391 143.923 92.449 97.334-1.301 131.28-73.853 144.46-92.449.813-.547 2.897-1.306 4.671 1.15 5.003 6.687 12.998 17.308 15.501 19.472 1.531.87 3.403 0 3.107-1.972-1.274-4.026-4.775-19.167-8.621-32.534z"
          fill={iconColor}
        />
        <Ellipse
          cx={209.066}
          cy={193.032}
          rx={30.2614}
          ry={53.0318}
          fill={iconColor}
        />
        <Ellipse
          rx={30.2614}
          ry={53.0318}
          transform="matrix(-1 0 0 1 295.62 193.032)"
          fill={iconColor}
        />
      </G>
      <Defs />
    </Svg>
  )
}

export default CompanyCoasterLogoDynamic
