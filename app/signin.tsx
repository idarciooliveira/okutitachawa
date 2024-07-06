import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Colors from '@/constants/Colors';
import Screen from '@/components/Screen';
import { ComicSansBold, MonoText } from '@/components/StyledText';
import InputText from '@/components/InputText';
import Separator from '@/components/Separator';
import Icon from '@expo/vector-icons/Ionicons'
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { 
  createUserWithEmailAndPassword,
   signInWithEmailAndPassword, 
} from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';

type Form = {
  email: string
  password: string
}

export default function SignIn() {

  const { handleSubmit, control } = useForm<Form>()

  const handleSignIn = async ({ email, password}: Form)=>{
     console.log(email,password)
     const user = await signInWithEmailAndPassword(auth,email, password)
     console.log(user)
  }

  return (
   <Screen styles={styles.container}>
    <ComicSansBold style={styles.logo}>
      Okutitachawa
    </ComicSansBold>
    <View style={styles.group}>
      <MonoText>Email</MonoText>
      <Controller
         name='email'
          control={control}
          render={({ field: { onBlur, onChange, value}})=>(
            <InputText
              value={value}
              onChange={onChange}
              onBlur={onBlur}
             />
          )}
      
      />
    </View>
    <View style={styles.group}>
      <MonoText>Password</MonoText>
      <Controller
         name='password'
          control={control}
          render={({ field: { onBlur, onChange, value}})=>(
            <InputText
              value={value}
              onChange={onChange}
              onBlur={onBlur}
             />
          )}
      />
    </View>
    <Button title='Entrar' onPress={handleSubmit(handleSignIn)}/>
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