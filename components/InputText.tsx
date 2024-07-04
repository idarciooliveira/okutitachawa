
import { StyleSheet, TextInput, TouchableOpacityProps } from 'react-native'
import Colors from '@/constants/Colors'

type Props = TouchableOpacityProps &  {}

export default function InputText({...props}: Props) {
  return (
    <TextInput 
        {...props}
        style={styles.input}
      />
  )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        paddingHorizontal: 12,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 8
      }
})