import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: 20
    },
    text: {
        marginBottom: 100
    },
    buttons: {
        float: 'right'
    }
}));

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)',
    p: 4,
    borderRadius: 4
};
