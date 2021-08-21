import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
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
import { useStyles } from './SignInFormStyled'
import { useRouter } from 'next/router'
import { auth } from '../../../firebase'

const SignInForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const classes = useStyles()

  const onSubmit = async (value: any) => {
    console.log(typeof value)
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
              <Box mt={5}>{error ? <span>{error}</span> : null}</Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default SignInForm
