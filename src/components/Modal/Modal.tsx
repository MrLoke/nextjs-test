import { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import QueueIcon from '@material-ui/icons/Queue'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useForm } from 'react-hook-form'

interface IChat {
  createChat: (value: any) => void
}

const Modal = ({ createChat }: IChat) => {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Add new chat
        <QueueIcon fontSize='medium' />
      </Button>
      <form onSubmit={handleSubmit(createChat)}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Add new chat</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
              autoFocus
              margin='dense'
              id='name'
              label='Email Address'
              type='email'
              name='email'
              fullWidth
            />
            {errors.email && <span>{errors.email.message}</span>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  )
}

export default Modal
