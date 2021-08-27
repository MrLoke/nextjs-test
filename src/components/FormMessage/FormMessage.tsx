import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, TextareaAutosize } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'
import firebase from 'firebase/app'

const FormMessage = () => {
  const [msgValue, setMsgValue] = useState('')
  const router = useRouter()
  const [user] = useAuthState(auth)

  const sendMessage = (e: any) => {
    e.preventDefault()

    // update last seen user
    db.collection('users').doc(user?.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

    db.collection('users').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: msgValue,
      user: user?.email,
      photoURL: user?.photoURL,
    })

    setMsgValue('')
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <TextareaAutosize
          maxRows={4}
          value={msgValue}
          onChange={(e) => setMsgValue(e.target.value)}
          disabled={!msgValue}
          aria-label='maximum height'
          placeholder='Type something...'
          defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.'
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
    </div>
  )
}

export default FormMessage
