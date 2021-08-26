import SearchIcon from '@material-ui/icons/Search'
import { useStyles } from './SearchBarStyled'
import { InputBase } from '@material-ui/core'

const SearchBar = () => {
  const classes = useStyles()

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder='Search…'
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )
}

export default SearchBar
