import React from 'react';
import PropTypes from 'prop-types';
import { BiCheck } from 'react-icons/bi';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';

import CustomButton from '../Button';

const useStyle = makeStyles((theme) => ({
  root: (props) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: '1rem',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    background: 'white',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderTop: '3px solid gray',
    },
  }),
  memberShipType: {
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0.5rem 0',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
  },
  currentPlan: {
    position: 'absolute',
    background: '#09e5ab',
    padding: '0.2rem',
    color: 'white',
    fontWeight: 'bold',
    top: '-6px',
    left: '0',
  },
  memberShipTitle: (props) => ({
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  }),
  membershipBadge: {
    margin: '0 0.5rem',
    width: '20px',
    height: '20px',
  },
  price: {
    fontWeight: '600',
    color: 'gray',
    fontSize: '1.2rem',
  },

  benefitList: {
    flex: 1,
  },
  benefitItem: {
    alignItems: 'flex-start',
    paddingLeft: 0,
    paddingRight: 0,
  },
  benefitItemText: {
    margin: 0,
    '& span': {
      color: theme.palette.text.primary,
      fontSize: '0.9rem',
    },
  },
  benefitIconCheck: {
    minWidth: '2rem',
  },
  tabSecTitle: {
    padding: '1rem 0',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '4px',
  },
}));

const memberships = {
  freemium: {
    type: 'freemium',
    title: 'Free Member',
    badge: null,
    price: 0,
    discount: 0,
    benefits: [
      'Can Post Your Own Medical Questions',
      'Can Answer To Any Questions',
      '8 MD Review Request Per Month',
    ],
  },
  premium: {
    type: 'premium',
    title: 'Premium Member',
    badge: 'images/membership/premium_badge.svg',
    price: 50,
    discount: 15,
    benefits: [
      'Help us keep the site live',
      'All your questions will be reviewed by board certified physicians',
      'Get emails when your questions have been answered',
      'Upload your medication list once a year for us to review, we will advise you on things such as proper dosages, possible interactions, and side effects',
      "Send us copies of your case files once a year (ex. pictures of EKG's, chest Xrays, lab results) to obtain a virtual second opinion",
      'Plus other perks',
    ],
  },
};

const MemberShipCard = ({
  type,
  onClickUpgrade,
  onClickDowngrade,
  selected,
  isCurrentPlan,
}) => {
  const classes = useStyle({ type, selected });
  const memberShip = memberships[type];

  return (
    <Box className={classes.root}>
      <Box className={classes.memberShipType}>
        <Box>{memberShip.type}</Box>
        {memberShip.type === 'premium' && (
          <CustomButton type='button' variant='contained' color='primary'>
            Best Value
          </CustomButton>
        )}
      </Box>
      <Box display='flex' alignItems='center'>
        <Typography
          className={classes.memberShipTitle}
          component='h5'
          variant='h6'
        >
          {memberShip.title}
        </Typography>
        {memberShip.badge ? (
          <img
            className={classes.membershipBadge}
            width='30'
            height='30'
            src={memberShip.badge}
            alt='membership badge'
          />
        ) : null}
      </Box>
      <Typography className={classes.price}>
        {memberShip.price === 0 ? 'Free' : `$${memberShip.price}/yr`}
      </Typography>
      <List
        className={classes.benefitList}
        component='nav'
        aria-label='benefits'
      >
        {memberShip.benefits.length > 0
          ? memberShip.benefits.map((_benefit_item) => (
              <ListItem className={classes.benefitItem} key={_benefit_item}>
                <ListItemIcon className={classes.benefitIconCheck}>
                  <span className={classes.iconWrapper}>
                    <BiCheck
                      color='#09e5ab'
                      fontWeight='bold'
                      fontSize='1.2rem'
                    />
                  </span>
                </ListItemIcon>
                <ListItemText
                  className={classes.benefitItemText}
                  primary={_benefit_item}
                />
              </ListItem>
            ))
          : null}
      </List>
      <Box display='flex' marginTop='5rem'>
        {type === 'premium' && (
          <Button
            size='medium'
            color={type === 'premium' ? 'secondary' : 'primary'}
            variant='outlined'
            onClick={onClickUpgrade}
          >
            {type === 'premium' ? 'Upgrade Membership' : 'Downgrade Membership'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

MemberShipCard.propTypes = {
  type: PropTypes.string,
  isCurrentPlan: PropTypes.bool,
  onClickDowngrade: PropTypes.func,
  onClickUpgrade: PropTypes.func,
};

MemberShipCard.defaultProps = {
  type: 'freemium',
  isCurrentPlan: true,
  onClickUpgrade: () => {},
  onClickDowngrade: () => {},
};

export default MemberShipCard;
