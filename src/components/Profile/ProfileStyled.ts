import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  background-color: ${({ theme }) => theme.secondaryBg};
  color: ${({ theme }) => theme.primaryText};
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Avatar = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
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

export const EditProfile = styled.div`
  display: flex;
`
