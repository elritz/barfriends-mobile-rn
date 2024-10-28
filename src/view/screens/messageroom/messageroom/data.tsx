import {StyleSheet, Text, View} from 'react-native'

import {MessageProps} from './Message'

const Message = ({text, sender}: MessageProps) => {
  return (
    <View style={sender ? styles.senderContainer : styles.recipientContainer}>
      <Text style={styles.message}>{text}</Text>
    </View>
  )
}

export default Message

const container = {
  borderRadius: 10,
  padding: 10,
  margin: 10,
  marginVertical: 5,
}

const styles = StyleSheet.create({
  senderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#e0e0e0',
    ...container,
  },
  recipientContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#50FF00',
    ...container,
  },
  message: {
    color: '#000000',
  },
})
