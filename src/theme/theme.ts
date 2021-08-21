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
      light: 'rgb(83, 109, 254)',
      main: 'rgb(61, 90, 254)',
      dark: 'rgb(48, 79, 254)',
    },
    secondary: {
      main: 'rgb(48, 79, 254)',
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
