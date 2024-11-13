/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */


const tintColorLight = '#FF7000'
const tintColorDark = '#fff'

export const Colors = {
  light: {
    text: '#11181C',
    background: '#eeeeee',
    tint: tintColorLight,
    icon: '#000000',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    notification: '#257CFF',
    primary: '#FF7000',
    card: '#ffffff',
    border: '#687076',
  },
  dark: {
    text: '#ecedee',
    background: '#1c1917',
    tint: tintColorDark,
    icon: '#FF7000',
    tabIconDefault: '#FF7000',
    tabIconSelected: tintColorDark,
    notification: '#257CFF',
    primary: '#FF7000',
    card: '#100917',
    border: '#687076',
  },
}
