import Svg, {G, Path} from 'react-native-svg'

import {ThemeReactiveVar} from '#/reactive'
import {DynamicIllustrationProps} from '#/types/app'

const IllustrationDynamicLocation: React.FC<DynamicIllustrationProps> = ({
  width = 200,
  height = 200,
  primary = ThemeReactiveVar().theme?.gluestack.tokens.colors.primary500,
  secondary = ThemeReactiveVar().theme?.gluestack.tokens.colors.secondary900 ||
    'black',
}: DynamicIllustrationProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 508 508"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M0 90C0 40.294 40.294 0 90 0h318.937c49.706 0 90 40.294 90 90v319.121c0 49.706-40.294 90-90 90H90c-49.706 0-90-40.294-90-90V90z"
        fill={primary}
      />
      <G filter="url(#filter0_d_345_3298)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M242.096 390.282L160.25 273.361C110.608 202.443 162.903 105 249.468 105c86.566 0 138.861 97.443 89.219 168.36l-81.845 116.922c-3.583 5.119-11.163 5.119-14.746 0zm8.615-228.403c-27.062 0-49 22.198-49 49.26 0 27.062 21.938 49.261 49 49.261h2.552c27.062 0 49-22.199 49-49.261s-21.938-49.26-49-49.26h-2.552z"
          fill={secondary}
        />
      </G>
    </Svg>
  )
}

export default IllustrationDynamicLocation
