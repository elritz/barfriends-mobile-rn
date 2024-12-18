import {Ellipse, Path, Svg} from 'react-native-svg'

interface LogoTransparentProps {
  width?: number
  height: number
}
const LogoTransparent = ({width, height}: LogoTransparentProps) => {
  return (
    <Svg
      width={width ? width : height * 1.482}
      height={height}
      viewBox="0 0 283 195">
      <Ellipse
        cx="103.963"
        cy="44.6583"
        rx="25.5641"
        ry="44.6583"
        fill="#F87000"
      />
      <Ellipse
        rx="25.5641"
        ry="44.6583"
        transform="matrix(-1 0 0 1 177.082 44.6583)"
        fill="#F87000"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M275.691 102.457C274.704 100.37 272.301 95.1845 264.805 95.0606C263.516 95.0095 261.746 95.3686 259.84 96.2098C248.153 103.456 202.006 133.403 138.533 131.679C129.49 131.756 76.3304 131.261 24.5692 97.0486C21.4544 95.0045 18.7829 94.8554 16.3497 95.1845C12.2279 95.9539 9.20102 98.1579 7.4512 102.238C4.57854 110.949 2.60914 122.269 0.0482618 129.808C-0.240298 130.694 0.782699 132.509 2.65057 131.514C4.88902 129.68 14.2644 117.121 16.0025 114.804C17.3422 113.203 19.0127 113.646 19.689 114.148C31.2602 131.161 60.9475 191.109 141.272 192C223.498 190.905 252.174 129.808 263.309 114.148C263.995 113.688 265.755 113.048 267.254 115.117C271.48 120.748 278.234 129.692 280.349 131.514C281.642 132.247 283.224 131.514 282.974 129.854C281.898 126.464 278.94 113.712 275.691 102.457Z"
        fill="#F87000"
      />
    </Svg>
  )
}

export default LogoTransparent
