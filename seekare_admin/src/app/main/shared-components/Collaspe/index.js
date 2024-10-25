import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const Accordion = withStyles({
  root: {
    '&:not(:last-child)': {},
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    fontWeight: 600,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '10px 0',
    },
    margin: 0,
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    display: 'block',
    padding: '10px',
    background: '#ebebeb',
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions({
  header,
  expanded,
  onChangePanel,
  panelKey,
  children,
  statusIcon: StatusIcon,
}) {
  return !children ? null : (
    <Accordion
      square
      expanded={expanded === panelKey}
      onChange={onChangePanel(panelKey)}
    >
      <AccordionSummary
        aria-controls={`${panelKey}-content`}
        id={`${panelKey}-header`}
        expandIcon={StatusIcon && <StatusIcon />}
      >
        {header}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
