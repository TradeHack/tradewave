import { createTheme } from '@material-ui/core/styles'

const colors = {
	primary: '#447ae7',
	secondary: '#71bbff'
}
const theme = {
	colors
}

export const MuiDefaultTheme = createTheme({
	palette: {
		primary: {
			main: theme.colors.primary,
		},
		secondary: {
			main: theme.colors.secondary,
		}
	}
})

export default theme
