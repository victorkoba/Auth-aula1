// Victor Luiz Koba Batista
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";

export default function SobreNos() {
  return (
    <ImageBackground
      source={require("../assets/img-fundo.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.titulo}>
            Sobre o Maior do Mundo:{" "}
          </Text>
          <View style={styles.card}>
            <Text style={styles.texto}>
              O Real Madrid Club de Fútbol é
              amplamente considerado um dos
              maiores e mais prestigiados clubes
              da história do futebol mundial.
              Fundado em 1902, o time espanhol se
              destacou ao longo das décadas por
              sua excelência em campo,
              colecionando títulos e formando uma
              identidade única. Seu tradicional
              uniforme branco lhe rendeu o apelido
              de "Los Blancos", e a equipe é
              admirada mundialmente por ter
              abrigado atletas lendários que
              marcaram época.
            </Text>

            <Text style={styles.texto}>
              Durante sua trajetória, o Real
              Madrid acumulou inúmeros troféus
              nacionais e internacionais. No
              cenário espanhol, conquistou várias
              edições da LaLiga, da Copa do Rei e
              da Supercopa da Espanha.
              Internacionalmente, é o maior
              campeão da UEFA Champions League,
              com um histórico impressionante que
              solidifica sua fama como um dos
              clubes mais dominantes da Europa.
              Sua mentalidade vitoriosa e a busca
              constante pelos melhores jogadores
              ajudaram a manter sua superioridade
              ao longo dos anos.
            </Text>

            <Text style={styles.texto}>
              Além das vitórias dentro de campo, o
              clube investe pesado em estrutura e
              formação de atletas. O estádio
              Santiago Bernabéu, inaugurado em
              1947, é um dos templos mais icônicos
              do futebol mundial, recentemente
              modernizado para oferecer ainda mais
              inovação e conforto. Já o centro de
              treinamento e base do clube,
              conhecido como "La Fábrica", é
              responsável por revelar talentos
              promissores que frequentemente
              brilham no futebol profissional.
            </Text>

            <Text style={styles.texto}>
              Fora das quatro linhas, o Real
              Madrid é uma das marcas esportivas
              mais valiosas e influentes do
              planeta, contando com uma torcida
              global e presença marcante na mídia
              e no mercado. Sua rivalidade
              histórica com o Barcelona, conhecida
              como "El Clásico", é um dos
              confrontos mais intensos e
              acompanhados do esporte, carregando
              emoção e tradição. Com um passado
              glorioso, uma base sólida e uma
              visão estratégica para o futuro, o
              Real Madrid continua sendo um
              símbolo de excelência e grandeza no
              futebol mundial.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  box: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 25,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    color: "#000",
  },
});
