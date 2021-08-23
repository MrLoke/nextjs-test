import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${({ theme }) => theme.media.sm} {
    display: flex;
    flex: 0.25;
    border-right: 2px solid #ccc;
  }
  ${({ theme }) => theme.media.xl} {
    flex: 0.2;
  }
`

export const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${({ theme }) => theme.media.sm} {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 0.75;
  }
  ${({ theme }) => theme.media.xl} {
    flex: 0.8;
  }
`
