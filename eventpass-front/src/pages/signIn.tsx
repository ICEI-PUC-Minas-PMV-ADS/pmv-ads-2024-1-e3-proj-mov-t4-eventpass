import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Button, TextInput, Checkbox } from 'react-native-paper'
import { useAuth } from '../contexts/Auth'
import api from '../services/api'

const Profile = () => {
  const { signIn } = useAuth()
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [tipo, setTipo] = useState(0)
  const [isLogin, setIsLogin] = useState(true)

  const handleToggleScreen = () => {
    setIsLogin(!isLogin)
  }

  const createUser = async () => {
    const userData = {
      nome,
      cpf,
      email,
      password,
      tipo: tipo,
      confirmarSenha: confirmPassword,
    }

    try {
      await api.post('usuarios', JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('Usuário criado com sucesso')
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLogin ? (
          <View style={styles.containerContent}>
            <Text style={styles.title}>Faça o login</Text>
            <TextInput
              mode="outlined"
              activeOutlineColor="#f15a24"
              outlineStyle={{ borderRadius: 50 }}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              activeOutlineColor="#f15a24"
              outlineStyle={{ borderRadius: 50 }}
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
              secureTextEntry={true}
              keyboardType="default"
              style={styles.input}
            />
          </View>
        ) : (
          <View style={styles.containerContent}>
            <Text style={styles.title}>Faça o cadastro</Text>
            <Text style={styles.subTitle}>Escolha seu tipo de usuário</Text>
            <View style={styles.checkboxContainer}>
              <Checkbox.Item
                label="Gestor"
                status={tipo === 1 ? 'checked' : 'unchecked'}
                onPress={() => setTipo(1)}
                color="#f15a24"
                labelStyle={styles.checkboxLabel}
              />
              <Checkbox.Item
                label="Espectador"
                status={tipo === 0 ? 'checked' : 'unchecked'}
                onPress={() => setTipo(0)}
                color="#f15a24"
                labelStyle={styles.checkboxLabel}
              />
            </View>
            <TextInput
              mode="outlined"
              activeOutlineColor="#f15a24"
              outlineStyle={{ borderRadius: 50 }}
              onChangeText={setNome}
              value={nome}
              placeholder="Nome"
              keyboardType="default"
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              activeOutlineColor="#f15a24"
              outlineStyle={{ borderRadius: 50 }}
              onChangeText={setCpf}
              value={cpf}
              placeholder="CPF ou CNPJ"
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              activeOutlineColor="#f15a24"
              outlineStyle={{ borderRadius: 50 }}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              activeOutlineColor="#f15a24"
              outlineStyle={{ borderRadius: 50 }}
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
              secureTextEntry={true}
              keyboardType="default"
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              activeOutlineColor="#f15a24"
              outlineStyle={{ borderRadius: 50 }}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirme sua senha"
              secureTextEntry={true}
              keyboardType="default"
              style={styles.input}
            />
          </View>
        )}

        {/* Botão para alternar entre tela de login e cadastro */}
        <View style={styles.toggleButton}>
          <Button mode="text" onPress={handleToggleScreen} color="#f15a24">
            {isLogin
              ? 'Ainda não é cadastrado? Cadastre-se'
              : 'Já tem uma conta? Faça login'}
          </Button>
        </View>

        {/* Botão para fazer login ou cadastro */}
        <View style={styles.button}>
          <Button
            mode="contained"
            onPress={() => {
              if (isLogin) {
                signIn(email, password) // Fazer login
              } else {
                createUser()
              }
            }}
            style={{ backgroundColor: '#f15a24' }}
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  containerContent: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    marginBottom: 15,
  },
  toggleButton: {
    marginTop: 20,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
})

export default Profile
