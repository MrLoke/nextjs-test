import styled from 'styled-components'
import { Toolbar } from '@material-ui/core'

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

export const DisplayName = styled.p`
  color: ${({ theme }) => theme.white};
  margin-left: 0.5rem;
  font-weight: 500;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const Actions = styled.div`
  display: flex;
`

export const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  &:last-child {
    margin-left: 0;
  }
  &:hover {
    background-color: ${({ theme }) => theme.onHover};
  }
`
