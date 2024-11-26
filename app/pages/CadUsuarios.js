import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
function CadUsuarios({ onAddUsuario }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
   const navigation = useNavigation();
   
  const handleCadastro = () => {
    if (nome && email && senha) {
      onAddUsuario(nome, email, senha);
      Alert.alert('Cadastro realizado!', `Usuário ${nome} foi adicionado.`);
      setNome('');
      setEmail('');
      setSenha('');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };


  const handleGotoList = () => {
  navigation.navigate('Lista de Usuários');

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuários</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={handleGotoList}
      >
        <Text style={styles.buttonText}>Ver Lista de Usuários</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CadUsuarios;
