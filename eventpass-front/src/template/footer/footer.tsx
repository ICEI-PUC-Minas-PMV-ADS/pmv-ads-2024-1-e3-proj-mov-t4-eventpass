import * as React from 'react'
import HomePage from '../../pages/home'
import Buscar from '../../pages/buscar'
import Profile from '../../pages/signIn'
import { BottomNavigation } from 'react-native-paper'
import { useAuth } from '../../contexts/Auth'
import SignIn from '../../pages/signIn'

const Footer: React.FC = () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Início',
      focusedIcon: 'home',
    },
    { key: 'search', title: 'Buscar', focusedIcon: 'magnify' },
    { key: 'profile', title: 'Perfil', focusedIcon: 'account' },
  ])

  const { user } = useAuth()

  const HomeRoute = () => <HomePage />

  const SearchRoute = () => <Buscar />

  const ProfileRoute = () => (user ? <Profile /> : <SignIn />)

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    profile: ProfileRoute,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{
        backgroundColor: 'black',
      }}
      activeIndicatorStyle={{ backgroundColor: '#f15a24' }}
      activeColor="white"
      inactiveColor="white"
      shifting={true}
    />
  )
}

export default Footer
