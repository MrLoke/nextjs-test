import SearchIcon from '@material-ui/icons/Search'
import { SearchUserContainer, SearchInput } from './SearchBarStyled'

const SearchBar = () => {
  return (
    <SearchUserContainer>
      <SearchInput
        type='search'
        placeholder='Search user...'
        // onChange={(e) => setSearchingUser(e.target.value.toLowerCase())}
      />
      <SearchIcon>
        <SearchIcon fontSize='medium' />
      </SearchIcon>
    </SearchUserContainer>
  )
}

export default SearchBar
