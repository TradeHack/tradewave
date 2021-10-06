import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        height: 30
    },
    button: {
        maxWidth: 145
    }
}));
