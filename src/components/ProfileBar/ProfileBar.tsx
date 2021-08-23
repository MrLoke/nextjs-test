import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { auth } from '../../../firebase'
import Avatar from '@material-ui/core/Avatar'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import {
  Container,
  UserInfo,
  Actions,
  DisplayName,
  Span,
} from './ProfileBarStyled'
import { useAuthState } from 'react-firebase-hooks/auth'

const ProfileBar = () => {
  const [user] = useAuthState(auth)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const toggleModal = () => setIsOpen(!isOpen)

  const signOut = async () => {
    await auth.signOut()
    router.push('/signin')
  }

  return (
    <Container>
      <UserInfo>
        <Avatar src={user?.photoURL || ''} alt={`${user?.photoURL} avatar`} />
        <DisplayName>{user?.displayName}</DisplayName>
      </UserInfo>
      <Actions>
        <IconButton color='inherit' edge='start' onClick={signOut}>
          <ExitToAppIcon fontSize='medium' />
        </IconButton>
        <IconButton color='inherit' edge='start'>
          <MoreVertIcon fontSize='medium' />
        </IconButton>
      </Actions>
    </Container>
  )
}

export default ProfileBar
