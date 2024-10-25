import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, makeStyles, Modal, Paper } from '@material-ui/core';
import { MdClose } from 'react-icons/md';

import { closeModal } from 'app/store/ui/actions';
import modals from '../modal-contents';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '50%',
    margin: 'auto',
  },
  modalContentWrapper: {
    position: 'relative',
    outline: 'none',
  },
  closebtn: {
    position: 'absolute',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    top: '-1.5rem',
    right: '-1.5rem',
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
});

const ModalWrapper = () => {
  const classes = useStyles();
  const modalRef = useRef();
  const dispatch = useDispatch();

  const open = useSelector((state) => state.ui.modal.open);
  const modalType = useSelector((state) => state.ui.modal.modalType);
  const modalProps = useSelector((state) => state.ui.modal.modalProps);

  const handleClose = useCallback(() => dispatch(closeModal()), [dispatch]);

  const ModalContent = modals[modalType];
  return (
    <Modal
      className={classes.root}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Paper ref={modalRef} className={classes.modalContentWrapper}>
        <span className={classes.closebtn} onClick={handleClose}>
          <MdClose />
        </span>
        {modalType && <ModalContent {...modalProps} />}
      </Paper>
    </Modal>
  );
};

export default ModalWrapper;
