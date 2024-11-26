import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CadUsuarios from './pages/CadUsuarios';
import ListaUsuarios from './pages/Usuarios';
import AtualizarUsuario from './pages/UpdateUsuarios';

const Stack = createStackNavigator();

export default function App() {
  const [usuarios, setUsuarios] = useState([]);

  const adicionarUsuario = (nome, email, senha) => {
    const novoUsuario = {
      id: String(Date.now()),
      nome,
      email,
      senha,
    };
    setUsuarios((prevUsuarios) => [...prevUsuarios, novoUsuario]);
  };

  const removerUsuario = (id) => {
    setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
  };

  const atualizarUsuario = (id, novoNome, novoEmail) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === id ? { ...usuario, nome: novoNome, email: novoEmail } : usuario
      )
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cadastro">
          {({ navigation }) => <CadUsuarios onAddUsuario={adicionarUsuario} navigation={navigation} />}
        </Stack.Screen>
        <Stack.Screen name="Lista de Usuários">
          {({ navigation }) => (
            <ListaUsuarios usuarios={usuarios} removerUsuario={removerUsuario} navigation={navigation} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Atualizar Usuário">
          {({ route, navigation }) => (
            <AtualizarUsuario
              usuario={route.params.usuario}
              atualizarUsuario={atualizarUsuario}
              navigation={navigation}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
