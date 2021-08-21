import { useState, useRef } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { auth } from '../../../firebase'
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './SignUpFormStyled'

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
    console.log(typeof value)
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
                <span>{errors.userInitials.message}</span>
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
              {errors.email && <span>{errors.email.message}</span>}
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
              {errors.password && <span>{errors.password.message}</span>}
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
                <span>{errors.password_repeat.message}</span>
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
              {errors.avatar && <span>{errors.avatar.message}</span>}
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
