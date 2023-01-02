import { makeStyles } from '@material-ui/core';

export const useTableStyles = makeStyles({
  tableContainer: {
    marginBottom: '5rem',
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    fontWeight: 700,
  },
  button: {
    textTransform: 'capitalize',
    backgroundColor: '#2197F3',
    color: '#fff',
  },
  loadingCell: {
    textAlign: 'center',
    '@media (max-width: 780px)': {
      textAlign: 'start',
    },
  },
  spinner: {
    color: '#2197F3',
  },
  error: {
    color: 'red',
  },
  title: {
    textAlign: 'center',
    margin: '2rem',
  },
  icon: {
    cursor: 'pointer',
  },
});
