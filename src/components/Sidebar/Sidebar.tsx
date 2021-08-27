import { useState, useEffect } from 'react'
import ProfileBar from 'components/ProfileBar/ProfileBar'
import SearchBar from 'components/SearchBar/SearchBar'
import Chat from 'components/Chat/Chat'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'
import { QueryDocumentSnapshot, DocumentData } from '@firebase/firestore-types'
import firebase from 'firebase/app'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import Modal from 'components/Modal/Modal'

// interface IChat {
//   chatSnapshot:
//     | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
//     | undefined
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100vh',
      overflowY: 'scroll',
    },
    inline: {
      display: 'inline',
    },
  })
)

const Sidebar = () => {
  const [usersChat, setUsersChat] = useState<any>()
  const [user] = useAuthState(auth)
  const classes = useStyles()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const usersChatRef = db
          .collection('chats')
          .where('users', 'array-contains', user?.email)

        setUsersChat(usersChatRef)
      }
    })
    return () => unsubscribe()
  }, [])

  const [chatSnapshot] = useCollection(usersChat)

  const createChat = async (value: any) => {
    console.log(typeof value)
    const { email } = value

    if (!email) return

    if (email && !chatAlreadyExists(email) && email !== user?.email) {
      // Add the chat into the DB 'chats' collection if it doesnt already exist and is valid
      db.collection('chats').add({
        users: [user?.email, email],
      })
    }
  }

  const chatAlreadyExists = (recipientEmail: any) =>
    !!chatSnapshot?.docs.find(
      (chat: any) =>
        chat.data().users.find((user: any) => user === recipientEmail)?.length >
        0
    )

  return (
    <List className={classes.root}>
      <Modal createChat={createChat} />
      {chatSnapshot?.docs.map((chat: QueryDocumentSnapshot<DocumentData>) => (
        <Chat key={chat?.id} users={chat.data().users} id={chat?.id} />
      ))}
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary='Brunch this weekend?'
          secondary={
            <>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='textPrimary'>
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary='Summer BBQ'
          secondary={
            <>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='textPrimary'>
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary='Oui Oui'
          secondary={
            <>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='textPrimary'>
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </>
          }
        />
      </ListItem>
    </List>
  )
}

export default Sidebar
