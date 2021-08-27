import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const UserChatProfile = () => {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>Profile</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default UserChatProfile
