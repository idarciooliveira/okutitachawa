

import Colors from '@/constants/Colors'
import { View } from 'react-native'

export default function Separator() {
  return (
    <View style={{ width: '100%', height: 1, backgroundColor: Colors.border}}/>
  )
}