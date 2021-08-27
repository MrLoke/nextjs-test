import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: 100vh;
`

export const SidebarContainer = styled.div`
  display: none;
  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    flex: 0.25;
  }
  @media (min-width: 1050px) {
    flex: 0.2;
  }
`

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    flex: 0.75;
  }
  @media (min-width: 1050px) {
    flex: 0.6;
  }
`

export const ProfileContainer = styled.div`
  display: none;
  @media (min-width: 1050px) {
    display: flex;
    flex-direction: column;
    flex: 0.2;
  }
`
