import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

function AtualizarUsuario({ usuario, navigation }) {
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [senha, setSenha] = useState('');

 
  const HandleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5250/api/Usuario/Update/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: usuario.id,
          Nome: nome,
          Email: email,
          Senha: senha,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      Alert.alert('Atualização realizada!', `Usuário ${nome} foi atualizado com sucesso.`);
      navigation.goBack(); // Voltar para a lista de usuários
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
    }
  };

  const handleAtualizar = () => {
    if (nome && email && senha) {
      HandleUpdate(); 
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Usuário</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleAtualizar}>
        <Text style={styles.buttonText}>Salvar</Text>
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
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AtualizarUsuario;
