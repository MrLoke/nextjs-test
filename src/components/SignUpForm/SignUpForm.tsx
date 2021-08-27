import { useState, useRef } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { auth } from '../../../firebase'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useStyles } from './SignUpFormStyled'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
} from '@material-ui/core'

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const SignupForm = () => {
  const [avatar, setAvatar] = useState(
    'https://niezawodne-ekspresy.pl/images/user/default-avatar.png'
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const password = useRef({})
  password.current = watch('password', '')
  const classes = useStyles()

  const onSubmit = async (value: any) => {
    try {
      setLoading(true)
      const userCredentials = await auth.createUserWithEmailAndPassword(
        value.email,
        value.password
      )
      if (userCredentials.user) {
        await userCredentials.user.updateProfile({
          displayName: value.userInitials,
          photoURL: avatar,
        })
      }
      await userCredentials.user?.reload()
      router.push('/')
      setError('')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Messanger | Sign up</title>
      </Head>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('userInitials', {
                  required: 'User Initials is required',
                  minLength: {
                    value: 3,
                    message: 'User Initials is too short 3 characters minimum',
                  },
                  maxLength: {
                    value: 30,
                    message: 'User Initials is too long',
                  },
                })}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='userInitials'
                label='First name & last name'
                name='userInitials'
                autoFocus
              />
              {errors.userInitials && (
                <Alert severity='error'>{errors.userInitials.message}</Alert>
              )}
              <TextField
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              {errors.email && (
                <Alert severity='error'>{errors.email.message}</Alert>
              )}
              <TextField
                {...register('password', {
                  required: 'password is required',
                  minLength: {
                    value: 6,
                    message: 'password is to short 6 characters minimum',
                  },
                })}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              {errors.password && (
                <Alert severity='error'>{errors.password.message}</Alert>
              )}
              <TextField
                {...register('password_repeat', {
                  validate: (value) =>
                    value === password.current || 'The passwords do not match',
                })}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password_repeat'
                label='Repeat password'
                type='password'
                id='password_repeat'
                autoComplete='current-password'
              />
              {errors.password_repeat && (
                <Alert severity='error'>{errors.password_repeat.message}</Alert>
              )}
              <TextField
                {...register('avatar', {
                  pattern: {
                    value:
                      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                    message: 'invalid url',
                  },
                })}
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='avatar'
                label='Set URL avatar'
                type='avatar'
                id='avatar'
              />
              {errors.avatar && (
                <Alert severity='error'>{errors.avatar.message}</Alert>
              )}
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href='/signin'>
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}></Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default SignupForm
