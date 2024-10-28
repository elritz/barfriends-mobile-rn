import {Path, Svg} from 'react-native-svg'

import {ThemeReactiveVar} from '#/reactive'

interface Props {
  width?: number
  height?: number
  backgroundColor?: string
  iconColor?: string
}

const CompanyCoasterLogoDynamicOutline: React.FC<Props> = ({
  width = 100,
  height = 100,
  backgroundColor = ThemeReactiveVar().colorScheme === 'light'
    ? 'white'
    : 'black',
}: Props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 520 520">
      <Path
        fill={backgroundColor}
        fillRule="evenodd"
        d="M52 0C23.281 0 0 23.281 0 52v404c0 28.719 23.281 52 52 52h404c28.719 0 52-23.281 52-52V52c0-28.719-23.281-52-52-52H52Zm22 38c-19.882 0-36 16.118-36 36v360c0 19.882 16.118 36 36 36h360c19.882 0 36-16.118 36-36V74c0-19.882-16.118-36-36-36H74Z"
        clipRule="evenodd"
      />
      <Path
        fill={backgroundColor}
        fillRule="evenodd"
        d="M412.348 261.667c-1.168-2.477-4.013-8.635-12.886-8.783-1.526-.06-3.621.366-5.878 1.365-13.834 8.605-68.46 44.167-143.596 42.12-10.705.092-73.632-.496-134.904-41.124-3.687-2.427-6.85-2.604-9.73-2.213-4.879.913-8.462 3.53-10.534 8.375-3.4 10.344-5.731 23.788-8.763 32.74-.341 1.052.87 3.208 3.08 2.026 2.65-2.178 13.748-17.092 15.806-19.843 1.586-1.902 3.563-1.375 4.364-.779 13.697 20.202 48.839 91.391 143.923 92.449 97.334-1.301 131.28-73.853 144.46-92.449.813-.547 2.897-1.306 4.671 1.15 5.003 6.687 12.998 17.308 15.501 19.472 1.531.87 3.403 0 3.107-1.972-1.274-4.026-4.775-19.167-8.621-32.534Z"
        clipRule="evenodd"
      />
      <Path
        fill={backgroundColor}
        d="M209.066 246.064c16.713 0 30.261-23.743 30.261-53.032 0-29.289-13.548-53.032-30.261-53.032s-30.261 23.743-30.261 53.032c0 29.289 13.548 53.032 30.261 53.032ZM295.62 246.064c-16.713 0-30.261-23.743-30.261-53.032 0-29.289 13.548-53.032 30.261-53.032s30.261 23.743 30.261 53.032c0 29.289-13.548 53.032-30.261 53.032Z"
      />
    </Svg>
  )
}

export default CompanyCoasterLogoDynamicOutline
