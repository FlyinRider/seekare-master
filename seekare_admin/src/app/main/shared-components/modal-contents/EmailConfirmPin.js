import React from "react";
import { useDispatch } from "react-redux";
import PinInput from "react-pin-input";
import * as AuthActions from "app/store/auth/actions";
import useAuth from "app/hooks/useAuth";
import("./pin.css");

const MAX_ITEMS = 6;

const PinInputCom = ({ username, email, password }) => {
  const [pin, setPin] = React.useState("");
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const { code: SECRET, emailConfirming } = useAuth();
  const signUpUser = React.useCallback(
    ({ username, email, password }) => {
      return dispatch(AuthActions.signUp(username, email, password));
    },
    [dispatch]
  );

  const handleComplete = (value) => {
    if (value != SECRET) {
      inputRef.current.clear();
    } else {
      signUpUser({ username, email, password });
    }
  };

  const handleChange = (value) => {
    setPin(value);
  };
  const isValid = pin == SECRET;
  return (
    <div className="mainContainer">
      <h2 className="code">
        ➡️Enter code *{" "}
        {isValid ? (
          <span role="img">✅</span>
        ) : (
          pin.toString().length == MAX_ITEMS && <span role="img">❌</span>
        )}
      </h2>
      <div className="pinContainer">
        <PinInput
          length={MAX_ITEMS}
          bd268
          initialValue=""
          ref={inputRef}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px" }}
          inputStyle={{ borderColor: "red" }}
          inputFocusStyle={{ borderColor: "blue" }}
          onComplete={handleComplete}
          onChange={handleChange}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
      </div>
    </div>
  );
};

export default PinInputCom;
