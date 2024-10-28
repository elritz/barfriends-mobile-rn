import {ImageSourcePropType} from 'react-native'

export type Product = {
  type: '_ad1' | '_ad2' | '_ad3' | '_ad4' | '_ad5'
  color1: string
  color2: string
  primaryTextColor: string
  secondaryTextColor: string
  buttonColor: string
  buttonTextColor: string
  buttoncta: string
  route: string
} & (
  | {
      type: '_ad1'
      title: string
      subtitle: string
    }
  | {
      type: '_ad2'
      picture: ImageSourcePropType
      aspectRatio: number
      title: string
      subtitle: string
    }
  | {
      type: '_ad3'
      title: string
      subtitle: string
    }
  | {
      type: '_ad4'
      cover: ImageSourcePropType
    }
  | {
      type: '_ad5'
      title: string
      subtitle: string
      logo: ImageSourcePropType
    }
)

// {
// 	title?: string
// 	subtitle?: string
// 	logo?: ImageSourcePropType | undefined
// 	cover?: ImageSourcePropType | undefined
// 	picture?: ImageSourcePropType | undefined
// }

export const products: Product[] = [
  {
    type: '_ad1',
    title: `This buds \non us.`,
    subtitle: '#KingOfTheNorth',
    color1: '#E60022',
    color2: '#A8021B',
    buttonColor: '#ffffff',
    buttonTextColor: '#000000',
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#ffffff',
    buttoncta: 'Claim',
    route: '/(app)/ad',
  },
  {
    type: '_ad2',
    title: 'Get a beer on us',
    picture: require('#/assets/images/ad/bud_light.png'),
    subtitle: 'Medium, Creamy Cream, Ice cold and perfect',
    color1: '#00A1E1',
    color2: '#061148',
    buttonColor: '#061148',
    buttonTextColor: '#ffffff',
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#ffffff',
    buttoncta: 'Continue',
    aspectRatio: 1,
    route: '/(app)/ad',
  },

  {
    type: '_ad3',
    title: 'Get a beer on us',
    subtitle: 'Medium, Creamy Cream, Ice cold and perfect',
    color1: '#00A1E1',
    color2: '#061148',
    buttonColor: '#061148',
    buttonTextColor: '#ffffff',
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#ffffff',
    buttoncta: 'Continue',
    route: '/(app)/ad',
  },
  {
    type: '_ad4',
    cover: require('#/assets/images/ad/coors_banquet2.png'),
    color1: '#FEB829',
    color2: '#FDD446',
    buttonColor: '#ffffff',
    buttonTextColor: '#000000',
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#ffffff',
    buttoncta: 'View',
    route: '/(app)/public/venue/1',
  },

  // Venue advertisments
  {
    type: '_ad5',
    title: 'The Shed',
    subtitle: 'Pumping the vibes and tunes ',
    logo: require('#/assets/images/ad/coors_banquet2.png'),
    color1: '#4D0049',
    color2: '#92008C',
    buttonColor: '#ffffff',
    buttonTextColor: '#000000',
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#ffffff',
    buttoncta: 'View',
    route: '/(app)/public/venue/1',
  },
]
// {
// {
// 	title: 'Craving a new Cold Brew?',
// 	subtitle: 'Try Philtered Soul',
// 	color1: '#FEB829',
// 	color2: '#FDD446',
// 	picture: require('#/assets/images/coffee/coldbrew.png'),
// 	aspectRatio: 1,
// },
// {
// 	title: 'Excited for an Ecstatic?',
// 	subtitle: 'Large, No cream, No sugar, Iced',
// 	color1: '#FE8E01',
// 	color2: '#FF9A16',
// 	picture: require('#/assets/images/coffee/dark.png'),
// 	aspectRatio: 1,
// },
// {
// 	title: 'Craving a Croissant?',
// 	subtitle: 'Flaky perfection, baked fresh daily',
// 	color1: '#E2DDD1',
// 	color2: '#F3F1ED',
// 	picture: require('#/assets/images/coffee/croissant.png'),
// 	aspectRatio: 757 / 735,
// },
/*

  {
    title: "More Cold Brew to Love",
    subtitle: "32oz bottle now available",
    color1: "#FEAC00",
    color2: "#FDC946",
    picture: require("./assets/coldbrew2.png"),
    aspectRatio: 719 / 277,
  }, */
