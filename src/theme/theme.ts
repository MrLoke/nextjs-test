import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontFamily: 'Open Sans, sans-serif',
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#9fa8da',
      main: '#3d5afe',
      dark: '#283593',
    },
    error: {
      main: '#f44336',
    },
  },

  typography: {
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
})
