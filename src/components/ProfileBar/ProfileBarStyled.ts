import styled from 'styled-components'

export const Input = styled.input`
  color: ${({ theme }) => theme.darkText};
  margin: 0.7rem 0;
  padding: 1rem;
  width: 100%;
  border: none;
  border-radius: ${({ theme }) => theme.utils.smallRadius};
  font-size: ${({ theme }) => theme.size.s};
  outline: none;
  transition: all 0.2s linear;
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.sizeXS};
  color: ${({ theme }) => theme.errorText};
  text-align: center;
  padding: 10px 0;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0 1rem 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

export const Avatar = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`

export const DisplayName = styled.p`
  color: ${({ theme }) => theme.white};
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
