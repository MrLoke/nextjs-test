import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`

export const StyledAvatar = styled(Avatar)`
  width: 8rem;
  height: 8rem;
  margin-bottom: 1rem;
`

export const DisplayName = styled.p`
  font-weight: 500;
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const ProfileLabel = styled.div`
  display: flex;
  align-items: center;
`

export const EditProfile = styled.div`
  display: flex;
  flex-direction: column;
`
