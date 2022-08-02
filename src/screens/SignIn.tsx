import auth from '@react-native-firebase/auth';
import { useState } from 'react';

import {
  Heading,
  Icon,
  useTheme, VStack
} from 'native-base';

import { Envelope, Key } from 'phosphor-react-native';
import Logo from '../assets/logo_primary.svg';

import { Alert } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';


export function SignIn() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();

  //Autenticação com Firebase/Auth
  function handleSignIn() {
    if (!email || !senha) {
      return Alert.alert('Entrar', 'Informe e-mail e senha.');
    }

    setIsLoading(true);
    auth().signInWithEmailAndPassword(email, senha).catch((error) => {
      console.log(error.code);
      setIsLoading(false);

      if (error.code === 'auth/invalid-email') {
        return Alert.alert('Entrar', 'E-mail inválido!');
      }

      if (error.code === 'auth/user-not-found') {
        return Alert.alert('Entrar', 'E-mail ou senha inválida!');
      }

      if (error.code === 'auth/wrong-password') {
        return Alert.alert('Entrar', 'E-mail ou senha inválida!');
      }

      return Alert.alert('Entrar', 'Não foi possível acessar');
    })
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
        autoCorrect={false}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setSenha}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}