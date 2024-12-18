import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

interface ButtonProps {
  label: string
  onPress: () => void
}

const width = (Dimensions.get('window').width - 64) / 2

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#432406',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 27,
    height: 54,
    width,
  },
  label: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
})

const Button = ({label, onPress}: ButtonProps) => (
  <TouchableWithoutFeedback accessibilityRole="button" onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableWithoutFeedback>
)

export default Button
