// TODO: UX(Complete this card for venues etc....)
import {Dimensions, StyleSheet, Text, View} from 'react-native'

import Button from './components/Button'
import {Product} from './Model'

const {width} = Dimensions.get('window')
export const CARD_HEIGHT = (width * 1564) / 1300
const styles = StyleSheet.create({
  container: {
    width,
    height: CARD_HEIGHT,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#432406',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#432406',
  },
})

interface CardProps {
  product: Product
}

const Card = ({product: {color1, title, subtitle}}: CardProps) => (
  <View style={styles.container}>
    <View
      style={{
        borderRadius: 16,
        margin: 32,
        flex: 1,
        backgroundColor: color1,
        padding: 16,
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Button onPress={() => console.log('route')} label="I'll try it" />
    </View>
  </View>
)

export default Card
