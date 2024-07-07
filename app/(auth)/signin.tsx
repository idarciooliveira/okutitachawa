import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import Colors from '@/constants/Colors';
import Screen from '@/components/Screen';
import { ComicSansBold, MonoText } from '@/components/StyledText';
import InputText from '@/components/InputText';
import Separator from '@/components/Separator';
import Icon from '@expo/vector-icons/Ionicons'
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';
import { Link, router } from 'expo-router';
import { FormProps, FormSchema } from '@/schema/Form';
import { zodResolver } from '@hookform/resolvers/zod';


export default function SignIn() {

  const { handleSubmit, control, reset , formState: { errors}} = useForm<FormProps>({
    resolver: zodResolver(FormSchema)
  })

  const handleSignIn = async ({ email, password}: FormProps)=>{
     try {
      const result = await signInWithEmailAndPassword(auth,email, password)
      console.log(result.user)
     
     } catch (error: any) {
       Alert.alert(error.message)
     }
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
        {errors.email &&  <MonoText style={{ fontSize: 12, color: '#FF7369'}}>
         {errors.email?.message}
        </MonoText>
      }
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
        {errors.password &&  <MonoText style={{ fontSize: 12, color: '#FF7369'}}>
         {errors.password?.message}
        </MonoText>
      }
    </View>
    <Button title='Entrar' onPress={handleSubmit(handleSignIn)}/>
    <Separator/>
    <TouchableOpacity style={styles.googleButton}>
        <Icon name='logo-google' size={24}/>
        <MonoText style={styles.googleButtonText}>
           Entrar com o Google
        </MonoText>
   </TouchableOpacity>
   <Link href={'/signup'} style={{ width: '100%', textAlign: 'center'}}>
        <MonoText style={{ 
          fontWeight: '400',
          textDecorationLine: 'underline'
        }}>
         Criar um conta
        </MonoText>
   </Link>
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