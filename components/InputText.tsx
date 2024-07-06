
import { StyleSheet, TextInput, TouchableOpacityProps } from 'react-native'
import Colors from '@/constants/Colors'

interface Props extends  TouchableOpacityProps {
  value: string
  onChange: (text: string)=> void
}

export default function InputText({value, onChange,...props}: Props) {
  return (
    <TextInput 
        {...props}
        autoCapitalize='none'
        onChangeText={onChange}
        value={value}
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