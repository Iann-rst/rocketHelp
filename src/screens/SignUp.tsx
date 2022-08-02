import { Heading, Icon, VStack, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import auth from '@react-native-firebase/auth'


import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SignUp() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSignUp() {
    if (!password || !email || !confirmPassword) {
      return Alert.alert('Cadastrar', 'Informe todos os campos.')
    }

    if (password !== confirmPassword) {
      return Alert.alert('Cadastrar', 'Senhas diferentes.')
    }

    setIsLoading(true);
    auth().createUserWithEmailAndPassword(email, password).then(() => {
      return Alert.alert('Cadastrar', 'Conta cadastrada com sucesso.')
    })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert('Cadastrar', 'E-mail está em uso.')
        }

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Cadastrar', 'E-mail inválido.');
        }
        setIsLoading(false);
      })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
        <Logo />
        <Heading color="gray.100" textAlign="center" fontSize="xl" mt={20} mb={6}>
          Faça seu cadastro de forma {'\n'} rápida e fácil
        </Heading>

        <Input
          placeholder='E-mail'
          mb={4}
          InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <Input
          placeholder='Senha'
          mb={4}
          InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Input
          placeholder='Confirmar senha'
          mb={4}
          InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />

        <Button
          w="full"
          title="Criar Conta"
          onPress={handleSignUp}
          isLoading={isLoading}
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
}