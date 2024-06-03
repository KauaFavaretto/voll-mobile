import { VStack, Divider, ScrollView } from 'native-base'
import { Botao } from '../componentes/Botao'
import { CardConsulta } from '../componentes/CardConsulta'
import { Titulo } from '../componentes/Titulo'
import { useEffect, useState } from 'react'
import { NavigationProps } from '../@types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { pegarConsultasPaciente } from '../servicos/PacienteServico'

interface Especialista {
  nome: string;
  imagem: string;
  especialidade: string;
  id: string;
}

interface Consulta {
  id: string;
  data: string;
  especialista: Especialista;
}

export default function Consultas({ navigation }: NavigationProps<'Consultas'>) {
  const [consultasProximas, setConsultasProximas] = useState<Consulta[]>([]);
  const [consultasPassadas, setConsultasPassadas] = useState<Consulta[]>([]);

  useEffect(() => {
    async function pegarConsultas() {
      const pacienteId = await AsyncStorage.getItem('pacienteId');
      if (!pacienteId) return;

      const todasConsultas: Consulta[] = await pegarConsultasPaciente(pacienteId);
      const agora = new Date();

      const proximas = todasConsultas.filter((consulta) => new Date(consulta.data) > agora);
      const passadas = todasConsultas.filter((consulta) => new Date(consulta.data) <= agora);

      setConsultasProximas(proximas);
      setConsultasPassadas(passadas);
    }
    pegarConsultas()
  }, [])

  return (
    <ScrollView p="5">
      <Titulo color="blue.500">Minhas consultas</Titulo>
      <Botao mt={5} mb={5}>Agendar nova consulta</Botao>

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Próximas consultas</Titulo>
      {consultasProximas.map((consulta) =>
        <CardConsulta
          key={consulta.id}
          nome={consulta?.especialista?.nome}
          especialidade={consulta?.especialista?.especialidade}
          foto={consulta?.especialista?.imagem}
          data={consulta?.data}
          foiAgendado
        />
      )}

      <Divider mt={5} />

      <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Consultas passadas</Titulo>
      {consultasPassadas.map((consulta) =>
        <CardConsulta
          key={consulta.id}
          nome={consulta?.especialista?.nome}
          especialidade={consulta?.especialista?.especialidade}
          foto={consulta?.especialista?.imagem}
          data={consulta?.data}
          foiAtendido
        />
      )}
    </ScrollView>
  )
}