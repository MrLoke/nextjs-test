import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useStyles } from './SignInFormStyled'
import { useRouter } from 'next/router'
import { auth } from '../../../firebase'
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

const SignInForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const classes = useStyles()

  const onSubmit = async (value: any) => {
    auth
      .signInWithEmailAndPassword(value.email, value.password)
      .then(() => {
        setLoading(true)
        router.push('/')
      })
      .catch((error) => {
        setLoading(false)
        setError(error.message)
      })
  }

  return (
    <>
      <Head>
        <title>Messanger | Sign in</title>
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
                {...register('email')}
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
              <TextField
                {...register('password')}
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
                <Grid item xs>
                  <Link href='#'>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link href='/signup'>{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                {error ? <Alert severity='error'>{error}</Alert> : null}
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default SignInForm
