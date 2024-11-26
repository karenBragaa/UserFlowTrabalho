import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

function ListaUsuarios({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);

  
  const handleGetAll = async () => {
    try {
      const response = await fetch('http://localhost:5250/api/Usuario/GetAll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      const lista = data.map(usuario => ({
        id: usuario.id,
        nome: usuario.Nome,
        email: usuario.Email,
      }));

      setUsuarios(lista);
    } catch (error) {
      console.error('Erro ao buscar registro:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de usuários.');
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5250/api/Usuario/Delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      setUsuarios((prevUsuarios) => prevUsuarios.filter(usuario => usuario.id !== id)); 
      Alert.alert('Usuário apagado', 'O usuário foi apagado com sucesso.');
    } catch (error) {
      console.error('Erro ao apagar usuário:', error);
      Alert.alert('Erro', 'Não foi possível apagar o usuário.');
    }
  };

  const renderUsuario = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={() => navigation.navigate('Atualizar Usuário', { usuario: item })}
        >
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Apagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  
  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>
      {usuarios.length > 0 ? (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUsuario}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhum usuário cadastrado.</Text>
      )}
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
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#007BFF',
  },
  deleteButton: {
    backgroundColor: '#FF3D00',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
  },
});

export default ListaUsuarios;
