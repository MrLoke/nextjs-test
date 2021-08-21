import firebase from 'firebase/app'

const getRecipientEmail = (
  users: string[],
  userLoggedIn: firebase.User | null
) => {
  return users.filter((user) => user !== userLoggedIn?.email)[0]
}

export default getRecipientEmail
