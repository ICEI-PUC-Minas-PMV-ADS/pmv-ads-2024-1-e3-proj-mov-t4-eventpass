import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Carousel from 'react-native-snap-carousel'

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const data = [
  {
    id: 1,
    nomeEvento: 'Conferência Internacional de Tecnologia',
    data: '15-17 de Maio de 2024',
    local: 'San Francisco, Califórnia, EUA',
    flyer:
      'https://images.unsplash.com/photo-1617777934845-a818fd6e1bcb?q=80&w=3431&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    nomeEvento: "Festival de Música 'Sons do Verão'",
    data: '7-9 de Julho de 2024',
    local: 'Rio de Janeiro, Brasil',
    flyer:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    nomeEvento: 'Convenção de Literatura Fantástica',
    data: '20-22 de Setembro de 2024',
    local: 'Edimburgo, Escócia',
    flyer:
      'https://images.unsplash.com/photo-1660092506466-6e433fb9cdbc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

class PaginaPrincipal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventos: [],
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        'http://192.168.15.28:8080/Eventos/GetTopThreeEvents',
        { method: 'GET' }
      )
      if (!response.ok) {
        throw new Error('Erro ao obter os eventos')
      }
      const data = await response.json()
      this.setState({ eventos: data })
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({
        error:
          'Ocorreu um erro ao carregar os eventos. Verifique sua conexão com a internet e tente novamente.',
      })
    }
  }

  handlePress = () => {
    console.log('Pressed')
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: item.flyer }} />
      <View style={styles.childCarousel}>
        <Text style={styles.title}>{item.data}</Text>
        <Text style={styles.title}>Ver detalhes</Text>
      </View>
      <View style={styles.body}>
        <TouchableRipple onPress={this.handlePress}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {item.nomeEvento}
          </Text>
        </TouchableRipple>
        <Text style={{ marginTop: 10 }}>{item.local}</Text>
      </View>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          layout={'default'}
          data={data}
          renderItem={this.renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  tinyLogo: {
    width: '100%',
    borderRadius: 15,
  },
  child: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  childCarousel: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: '#F15A24',
    fontSize: 16,
    marginTop: 10,
  },
  item: {
    marginTop: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  body: {
    flexDirection: 'column',
    marginTop: 16,
    justifyContent: 'flex-start',
  },
})

export default PaginaPrincipal
