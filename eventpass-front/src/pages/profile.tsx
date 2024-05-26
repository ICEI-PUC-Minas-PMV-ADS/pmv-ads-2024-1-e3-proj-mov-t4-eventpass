import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useAuth } from '../contexts/Auth'

const ProfilePage: React.FC = () => {
  const { signOut } = useAuth()

  return (
    <View>
      <Text>Profile</Text>
      <Button
        mode="contained"
        onPress={() => {
          signOut()
        }}
        style={{ backgroundColor: 'red' }}
      >
        Sair da conta
      </Button>
    </View>
  )
}

export default ProfilePage
