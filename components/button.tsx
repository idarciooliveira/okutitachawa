

import Colors from '@/constants/Colors'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { MonoText } from './StyledText'

type Props = TouchableOpacityProps &  {
    title: string
}

export default function Button({ title, ...props }: Props) {
  return (
   <TouchableOpacity {...props} style={styles.container}>
        <MonoText style={styles.text}>
            {title}
        </MonoText>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        height: 50,
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: Colors.dark.text
    }
})