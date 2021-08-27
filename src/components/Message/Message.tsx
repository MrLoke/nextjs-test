import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const Message = ({ user, message }) => {
  console.log(user, message)
  return (
    <div>
      <Avatar src='' alt='' />
      <Typography variant='h2'>{message.message}</Typography>
    </div>
  )
}

export default Message
