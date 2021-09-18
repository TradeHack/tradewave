import { createStyles, FormControl, makeStyles, Theme } from '@material-ui/core';
import styled from 'styled-components'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

export const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`

export const StyledFormControl = styled(FormControl)`
  margin-top: 32px;
  width: 100%;
`