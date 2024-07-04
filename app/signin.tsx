import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Colors from '@/constants/Colors';
import Screen from '@/components/Screen';
import { ComicSansBold, MonoText } from '@/components/StyledText';
import InputText from '@/components/InputText';
import Button from '@/components/button';
import Separator from '@/components/Separator';
import Icon from '@expo/vector-icons/Ionicons'

export default function SignIn() {
  return (
   <Screen styles={styles.container}>
    <ComicSansBold style={styles.logo}>
      Okutitachawa
    </ComicSansBold>
    <View style={styles.group}>
      <MonoText>Email</MonoText>
      <InputText />
    </View>
    <View style={styles.group}>
      <MonoText>Password</MonoText>
      <InputText />
    </View>
    <Button title='Entrar'/>
    <Separator/>
    <TouchableOpacity style={styles.googleButton}>
        <Icon name='logo-google' size={24}/>
        <MonoText style={styles.googleButtonText}>
           Entrar com o Google
        </MonoText>
   </TouchableOpacity>
   </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  logo: {
    paddingVertical: 32,
    fontSize: 28,
    color: Colors.dark.tint,
    textAlign: 'center'
  },
  group:{
    gap: 8
  },
  googleButton: {
    backgroundColor: Colors.light.background,
    borderColor: Colors.border,
    flexDirection: 'row',
    borderWidth: 1,
    height: 50,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  googleButtonText: {
    fontSize: 18,
    color: Colors.light.text,
    marginLeft: 18
  } 
 
});