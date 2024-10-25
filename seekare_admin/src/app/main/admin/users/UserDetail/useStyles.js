import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
  },
  detailContent: {},

  userCard: {
    padding: '1rem',
  },
  cardAvatar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: '8rem',
    height: '8rem',
    margin: '1rem 0',
  },
  membershipBadge: {
    textTransform: 'uppercase',
  },
  qas: {
    marginTop: '1rem',
  },
  listCardHeader: {
    backgroundColor: '#1b5a90',
    color: 'white',
    padding: '0.5rem',
    borderTopRightRadius: '0.4rem',
    borderTopLeftRadius: '0.4rem',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    width: '100%',
    margin: '0 0 1rem',
  },
  submitWrapper: {
    width: '100%',
    textAlign: 'right',
  },
  submitbutton: {
    backgroundColor: '#1b5a90',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '0.4rem',
    margin: '0 .25rem',
    '&:hover': {
      backgroundColor: '#096fc7',
    },
  },
}));

export default useStyles;
