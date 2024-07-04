import { View } from './Themed'
import Constants from 'expo-constants';

type Props = {
    children: any,
    styles?: any
}
export default function Screen({ children, styles }:Props ) {
  return (
     <View style={
      [{ 
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight, 
      }, styles]}>
      {children}
    </View>
  )
}

