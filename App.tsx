import { NativeBaseProvider, StatusBar } from 'native-base';
import { Temas } from './src/estilos/Temas';
import Rotas from './src/rotas';
import api from './src/servicos/api';
import { useEffect } from 'react';

export default function App() {

  useEffect(() => {
    async function pegarDados() {
      const resultado = await api.get('/pacient')
      console.log(resultado.data)
    }
    pegarDados();
  })

  return (
    <NativeBaseProvider theme={Temas}>
      <StatusBar backgroundColor={Temas.colors.blue[800]} />
      <Rotas />
    </NativeBaseProvider>
  );
}

