import { Ionicons } from '@expo/vector-icons'
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { TextInput, TouchableRipple, Button, Divider } from 'react-native-paper'
import { HomeStackParamList } from '../router/AuthStack'
import {
  createEventoData,
  getMyEventos,
  updateEventoData,
} from '../services/EventosService'
import { useAuth } from '../contexts/Auth'
import * as ImagePicker from 'expo-image-picker'
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates'
import { pt, registerTranslation } from 'react-native-paper-dates'
import Loading from '../components/loading'

registerTranslation('pt', pt)
type EditEventosRouteProp = RouteProp<HomeStackParamList, 'EditEvento'>

const CreateEvento: React.FC = () => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()
  const route = useRoute<EditEventosRouteProp>()
  const { idEvento } = route.params
  const { user } = useAuth()
  const [nome, setNome] = useState('')
  const [dataHora, setDataHora] = useState<Date | undefined>(undefined)
  const [totalIngressos, setTotalIngressos] = useState('')
  const [descricao, setDescricao] = useState('')
  const [local, setLocal] = useState('')
  const [flyer, setFlyer] = useState<string | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const updateEvento = async () => {
    const editEventoForm = {
      nome,
      dataHora: dataHora ? dataHora.toISOString() : '',
      totalIngressos: Number(totalIngressos),
      descricao,
      local,
      flyer,
    }

    await updateEventoData(idEvento, editEventoForm, user)
    navigation.navigate('Ingresso')
  }

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        setFlyer(result.assets[0].uri)
      }
    } catch (error) {
      console.error('ImagePicker error:', error)
    }
  }

  const handleDateConfirm = (date: Date) => {
    setDataHora(date)
    setShowDatePicker(false)
  }

  const handleTimeConfirm = ({
    hours,
    minutes,
  }: {
    hours: number
    minutes: number
  }) => {
    if (dataHora) {
      const newDate = new Date(dataHora)
      newDate.setHours(hours, minutes)
      setDataHora(newDate)
    }
    setShowTimePicker(false)
  }

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={() => navigation.navigate('Ingresso')}>
        <View style={styles.goBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.titleBack}>Voltar</Text>
        </View>
      </TouchableRipple>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.title}>ATUALIZE SEU EVENTO</Text>
          <TextInput
            mode="outlined"
            activeOutlineColor="#f15a24"
            outlineStyle={{ borderRadius: 50 }}
            onChangeText={setNome}
            value={nome}
            placeholder="Nome"
            keyboardType="default"
          />
          <TextInput
            mode="outlined"
            activeOutlineColor="#f15a24"
            outlineStyle={{ borderRadius: 50 }}
            onChangeText={setTotalIngressos}
            value={totalIngressos}
            placeholder="Total de ingressos"
            keyboardType="numeric"
          />
          <TextInput
            mode="outlined"
            multiline
            activeOutlineColor="#f15a24"
            outlineStyle={{ borderRadius: 50 }}
            onChangeText={setDescricao}
            value={descricao}
            placeholder="Descrição"
            keyboardType="default"
          />
          <TextInput
            mode="outlined"
            activeOutlineColor="#f15a24"
            outlineStyle={{ borderRadius: 50 }}
            onChangeText={setLocal}
            value={local}
            placeholder="Local"
            keyboardType="default"
          />
          <Divider bold />
          <View style={styles.containerData}>
            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              labelStyle={{ color: '#f15a24' }}
            >
              Selecionar Data
            </Button>
            <Button
              mode="outlined"
              onPress={() => setShowTimePicker(true)}
              labelStyle={{ color: '#f15a24' }}
            >
              Selecionar Hora
            </Button>
          </View>
          {dataHora && (
            <Text style={styles.textData}>
              Data e Hora: {dataHora.toLocaleString()}
            </Text>
          )}
          <Divider bold />

          <View style={styles.buttonFlyer}>
            {flyer && (
              <Image source={{ uri: flyer }} style={styles.flyerImage} />
            )}
            <Button
              mode="outlined"
              onPress={selectImage}
              labelStyle={{ color: '#f15a24' }}
            >
              Selecionar Flyer
            </Button>
          </View>
          <Divider bold />
          <Button
            mode="contained"
            onPress={updateEvento}
            style={styles.buttonCreate}
          >
            Atualizar Evento
          </Button>
        </View>
      </ScrollView>
      <DatePickerModal
        locale="pt"
        visible={showDatePicker}
        mode="single"
        onDismiss={() => setShowDatePicker(false)}
        date={dataHora}
        onConfirm={(params) => handleDateConfirm(params.date as Date)}
        label="Selecione a data"
      />
      <TimePickerModal
        locale="pt"
        visible={showTimePicker}
        onDismiss={() => setShowTimePicker(false)}
        onConfirm={handleTimeConfirm}
        hours={dataHora ? dataHora.getHours() : undefined}
        minutes={dataHora ? dataHora.getMinutes() : undefined}
        label="Selecione a hora"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 150,
    height: '100%',
    backgroundColor: '#fff',
  },
  form: {
    gap: 15,
    marginHorizontal: 10,
    marginBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  titleBack: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  goBack: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginLeft: 10,
    gap: 10,
  },
  flyerImage: {
    marginRight: 10,
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  buttonCreate: {
    width: '50%',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#f15a24',
  },
  containerData: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    gap: 16,
  },
  buttonDate: {},
  buttonFlyer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textData: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
})

export default CreateEvento
