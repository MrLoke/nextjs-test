import { useAuthState } from 'react-firebase-hooks/auth'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import { auth } from '../../../firebase'
import {
  Container,
  StyledAvatar,
  UserInfo,
  EditProfile,
  ProfileLabel,
  DisplayName,
} from './ProfileStyled'

const UserProfile = () => {
  const [user] = useAuthState(auth)

  return (
    <Container>
      <UserInfo>
        <StyledAvatar
          src={user?.photoURL || ''}
          alt={`${user?.photoURL} avatar`}
        />
        <ProfileLabel>
          <Typography variant='h5' gutterBottom>
            {user?.displayName}
          </Typography>
        </ProfileLabel>
        <ProfileLabel>
          <Typography variant='h5' gutterBottom>
            {user?.email}
          </Typography>
        </ProfileLabel>
      </UserInfo>
      <EditProfile>
        <ProfileLabel>
          <IconButton color='inherit' edge='start'>
            <EditIcon fontSize='large' />
          </IconButton>
          <Typography variant='subtitle1' gutterBottom>
            Edit profile
          </Typography>
        </ProfileLabel>
        <ProfileLabel>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </ProfileLabel>
      </EditProfile>
    </Container>
  )
}

export default UserProfile
