import React, { useEffect, useState } from 'react';
import { Avatar, Box, Chip, IconButton, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ImUserPlus } from 'react-icons/im';
import { BiCheckCircle } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';
import PropTypes from 'prop-types';

import * as API from 'app/services/api';

const MdCell = ({ question, onAssignMd, onDeleteMD }) => {
  const [isEditMd, setIsEditMd] = useState(false);
  const [mdHelpers, setMdHelpers] = useState([]);
  useEffect(() => {
    const fetchMDs = async () => {
      const { mds } = await API.userService.getMDs();
      setMdHelpers(mds);
    };

    fetchMDs();
  }, []);

  const [selectedMd, setSelectedMd] = useState(null);

  const { mdAssigned } = question;
  const md = mdHelpers.filter((item) => item._id === mdAssigned)[0];

  const onClickAssignBtn = () => {
    onAssignMd(selectedMd);
    setIsEditMd(false);
  };

  const onClickDeleteMD = () => {
    onDeleteMD();
  };

  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      {isEditMd && (
        <Box display='flex' alignItems='center' width='100%'>
          <Autocomplete
            id='mds'
            value={selectedMd}
            options={mdHelpers}
            getOptionLabel={(option) => option.username}
            style={{ flexGrow: 1 }}
            onChange={(e, value) => setSelectedMd(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                size='small'
                label='MD Helper'
                variant='outlined'
              />
            )}
          />
          <IconButton size='small' color='primary' onClick={onClickAssignBtn}>
            <BiCheckCircle />
          </IconButton>
          <IconButton
            size='small'
            color='secondary'
            onClick={() => setIsEditMd(false)}
          >
            <FcCancel />
          </IconButton>
        </Box>
      )}
      {!isEditMd && (
        <>
          <Box mr={1}>
            {md ? (
              <Chip
                avatar={<Avatar alt={md.username} src={md.photo} />}
                label={md.username}
                onDelete={onClickDeleteMD}
              />
            ) : (
              <Chip color='secondary' label='None' />
            )}
          </Box>
          <IconButton
            color='primary'
            aria-label='Assign MD to a question'
            onClick={() => setIsEditMd(true)}
          >
            <ImUserPlus fontSize='1.2rem' />
          </IconButton>
        </>
      )}
    </Box>
  );
};

MdCell.propTypes = {
  question: PropTypes.object.isRequired,
  onAssignMd: PropTypes.func.isRequired,
};

MdCell.defaultProps = {
  question: { mdAssigned: null },
  onAssignMd: () => {},
};

export default MdCell;
