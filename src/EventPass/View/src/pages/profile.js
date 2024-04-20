import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

const Profile = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState()

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerCadastro}>
          <Text style={styles.fraseCadastro}>
            Seu passaporte para diversão sem limites começa aqui. Faça o login
            agora!
          </Text>
          <View style={styles.cadastrarButton}>
            <Text style={styles.cadastrarButton.text}>
              Ainda não é cadastrado?
            </Text>
            <Button mode="contained" buttonColor="#f15a24">
              Cadastrar
            </Button>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            padding: 16,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            Faça o login
          </Text>
          <View
            style={{
              width: '100%',
              marginTop: 16,
            }}
          >
            <TextInput
              mode="outlined"
              outlineStyle={{ borderRadius: 50 }}
              activeOutlineColor="#f15a24"
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 16,
            }}
          >
            <TextInput
              mode="outlined"
              outlineStyle={{ borderRadius: 50 }}
              activeOutlineColor="#f15a24"
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
              secureTextEntry={true}
              keyboardType="default"
            />
          </View>

          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              marginTop: 16,
            }}
          >
            Esqueceu a senha?
          </Text>
        </View>

        <View style={styles.buttonEntrar}>
          <Button mode="contained" buttonColor="#f15a24">
            Entrar
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonEntrar: {
    width: 100,
  },
  cadastrarButton: {
    width: '100%',
    marginTop: 80,
    flexDirection: 'column',
    alignItems: 'center',
    text: { color: '#FFFFFF', fontSize: 16, marginBottom: 10 },
  },
  containerCadastro: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 29,
    marginTop: 10,
  },
  fraseCadastro: {
    textAlign: 'center',
    color: '#F15A24',
    fontSize: 24,
  },
})

export default Profile
