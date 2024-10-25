import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  createStyles,
  Typography,
  Button,
} from "@material-ui/core";

import { tags } from "app/config/medTok_profile2";
import MDCheckBox from "app/main/shared-components/MDCheckBox";
import useAuth from "app/hooks/useAuth";
import * as API from "app/services/api";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { useDispatch } from "react-redux";
import { pushSnackbar } from "app/store/ui/actions";

const genders = tags.categories.filter((catItem) => {
  return catItem.type.includes("demo") && catItem.sys.includes("gen");
});

const ages = tags.categories.filter((catItem) => {
  return catItem.type.includes("sxs") && catItem.sys.includes("gen");
});

const conditions = tags.categories.filter((catItem) =>
  catItem.type.includes("dx")
);

// const meds = tags.categories.filter((catItem) => catItem.type.includes('med'));

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
    },
    fieldRow: {
      flexDirection: "row",
      paddingLeft: "0.5rem",
    },
    conditionCheck: {
      display: "flex",
      alignItems: "center",
    },
    medExpand: {},
    genderTitle: {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
    box: {
      backgroundColor: theme.palette.secondary.lightest,
      borderRadius: "8px",
      padding: "10px 16px",
      marginBottom: "15px",
    },
    radio: {
      color: theme.palette.secondary.light,
    },
    submitButton: {
      backgroundColor: theme.palette.secondary.blue,
      border: "none",
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.secondary.blue,
      },
    },
  })
);

const BigographTab = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const { currentUser } = useAuth();

  const [gender, setGender] = useState(""); // gender
  const [age, setAge] = useState("");
  const [conditionArr, setConditionArr] = useState([]);
  const [conditionsTemp, setConditionsTemp] = useState([]);

  useEffect(() => {
    if (user) {
      setGender(user.gender);
      setAge(user.age);
      const resConditions = user.conditions;
      setConditionArr(resConditions);

      const temp = conditions;
      temp.forEach((item) => {
        let tempItem = item;
        tempItem.checked = false;
        resConditions.forEach((condition) => {
          if (tempItem.concept[0] === condition) {
            tempItem.checked = true;
          }
        });
      });
      setConditionsTemp(temp);
    }
  }, [user]);

  useEffect(() => {
    const temp = [...conditionsTemp];
    temp.forEach((item) => {
      // eslint-disable-next-line no-unused-expressions
      let tempItem = item;
      tempItem.checked = false;
      conditionArr.forEach((condition) => {
        if (tempItem.concept[0] === condition) {
          tempItem.checked = true;
        }
      });
    });
    setConditionsTemp(temp);
  }, [conditionArr]);

  const handleChangeRadio = (event) => {
    const name = event.target.name;
    if (name === "gender") setGender(event.target.value);
    if (name === "age") setAge(event.target.value);
  };

  const handleChangeCondition = (e, item) => {
    if (e.target.checked) {
      setConditionArr([...conditionArr, item.concept[0]]);
    } else {
      const temp = [...conditionArr];
      const index = temp.indexOf(item.concept[0]);
      if (index !== -1) {
        temp.splice(index, 1);
        setConditionArr(temp);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const { status, message } = await API.userService.updateUser({
        userID: currentUser.userID,
        gender,
        age,
        conditions: conditionArr,
      });

      safeDispatch(pushSnackbar(message, status));
    } catch (error) {
      safeDispatch(pushSnackbar("Can not update profile", "error"));
    } finally {
    }
  };

  return (
    <Box className={classes.root}>
      <Typography component="h2" variant="h6">
        Please provide more information about you. {`(Optional)`}
      </Typography>
      <Grid container className={classes.box}>
        <Grid
          item
          xs={12}
          md={1}
          component={Box}
          display="flex"
          alignItems="center"
          className={classes.genderTitle}
        >
          Gender:
        </Grid>
        <Grid item xs={12} md={11}>
          <FormControl component="fieldset">
            <RadioGroup
              className={classes.fieldRow}
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {genders.map((gItem) => (
                <FormControlLabel
                  key={gItem.concept[0]}
                  value={gItem.concept[0]}
                  control={<Radio className={classes.radio} />}
                  label={gItem.profileDisplay[0]}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.box}>
        <Grid
          item
          xs={12}
          md={1}
          component={Box}
          display="flex"
          alignItems="center"
          className={classes.genderTitle}
        >
          Age:
        </Grid>
        <Grid item xs={12} md={11}>
          <RadioGroup
            className={classes.fieldRow}
            aria-label="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            {ages.map((aItem) => (
              <FormControlLabel
                key={aItem.concept[0]}
                value={aItem.concept[0]}
                control={<Radio className={classes.radio} />}
                label={aItem.profileDisplay[0]}
              />
            ))}
          </RadioGroup>
        </Grid>
      </Grid>

      <Grid container className={classes.box}>
        <Typography component="h3" className={classes.genderTitle}>
          Do you suffer from any of these conditions?
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {conditionsTemp.map((cItem, index) => (
            <Box className={classes.conditionCheck} key={index}>
              <MDCheckBox
                id={cItem.concept[0]}
                name={cItem.concept[0]}
                checked={cItem.checked}
                onChange={(e) => handleChangeCondition(e, cItem)}
              />
              <label htmlFor={cItem.concept[0]}>
                {cItem.profileDisplay[0]}
              </label>
            </Box>
          ))}
        </Box>
      </Grid>
      {/* <Box className={classes.medExpand}>
        <Typography component='h3'>
          Do you take any of these medicines?
        </Typography>
        <Box display='flex' flexWrap='wrap'>
          {meds.map((mItem) => (
            <Box className={classes.conditionCheck}>
              <MDCheckBox id={mItem.concept[0]} name={mItem.concept[0]} />
              <label htmlFor={mItem.concept[0]}>
                {mItem.profileDisplay[0]}
              </label>
            </Box>
          ))}
        </Box>
      </Box> */}
      <Box display="flex" justifyContent="flex-end">
        <Button
          type="button"
          disabled={false}
          variant="outlined"
          onClick={handleSubmit}
          className={classes.submitButton}
        >
          Save
        </Button>
      </Box>
      <Grid container>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={9}></Grid>
      </Grid>
    </Box>
  );
};

export default BigographTab;
