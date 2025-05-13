// Victor Luiz Koba Batista
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RealizarLogin from "./src/screens/realizarLogin";
import PaginaPrincipal from "./src/screens/paginaPrincipal";
import ListarJogadores from "./src/screens/listaJogadores";
import SobreNos from "./src/screens/sobreNos";
import EditarPerfil from "./src/screens/editarPerfil";
import CalcularImc from "./src/screens/CalculoImc";
import Lampada from "./src/screens/lampada";
import AdicionarUsuario from "./src/screens/adicionarUsuarios";
import EditarUsuario from "./src/screens/editarUsuario";
import ListarImagem from "./src/screens/listagemImagem";
import ListarVideo from "./src/screens/listagemVideo";
import UploadImagem from "./src/screens/uploadImagem";
import UploadVideo from "./src/screens/uploadVideo";
import adicionarJogador from "./src/screens/adicionarJogador";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RealizarLogin">
        <Stack.Screen
          name="RealizarLogin"
          component={RealizarLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaginaPrincipal"
          component={PaginaPrincipal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListarJogadores"
          component={ListarJogadores}
          options={{
            title: "Listar Jogadores",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="SobreNos"
          component={SobreNos}
          options={{
            title: "Sobre Nos",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="EditarPerfil"
          component={EditarPerfil}
          options={{
            title: "Editar Perfil",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="CalcularImc"
          component={CalcularImc}
          options={{
            title: "Calcular IMC",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="Lampada"
          component={Lampada}
          options={{
            title: "Acender e Apagar Lampada",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="AdicionarUsuario"
          component={AdicionarUsuario}
          options={{
            title: "Adicionar Usuário",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="EditarUsuario"
          component={EditarUsuario}
          options={{
            title: "Editar Usuário",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ListarImagem"
          component={ListarImagem}
          options={{
            title: "Listagem Imagens",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ListarVideo"
          component={ListarVideo}
          options={{
            title: "Listagem Vídeos",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="UploadImagem"
          component={UploadImagem}
          options={{
            title: "Upload Imagens",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="UploadVideo"
          component={UploadVideo}
          options={{
            title: "Upload Vídeos",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="adicionarJogador"
          component={adicionarJogador}
          options={{
            title: "Adicionar Jogador",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
