import React from "react";
import { useDispatch } from "react-redux";
import PinInput from "react-pin-input";
import * as AuthActions from "app/store/auth/actions";
import useAuth from "app/hooks/useAuth";
import { getVisitor } from "app/store/tocVisited/actions";
import { getToc } from "app/store/toc/actions";
import { openModal } from "app/store/ui/actions";
import("./pin.css");

const MAX_ITEMS = 6;

const PinInputCom = ({ username, email, password }) => {
  const [pin, setPin] = React.useState("");
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const { code: SECRET } = useAuth();
  const signUpUser = React.useCallback(
    ({ username, email, password }) => {
      return dispatch(AuthActions.signUp(username, email, password));
    },
    [dispatch]
  );
  const tocVisitorGetter = async (userId) => {
    const res = await getVisitor();
    let flag = true;
    let flag2 = false;
    const tocT = await getToc();
    res.visitors.map(visitor => {
      if (visitor.userId == userId){
        if(tocT.tocs[0].updated > visitor.visited){
          flag = false
          return
        } 
      }
    })
    res.visitors.map(visitor => {
      if (visitor.userId == userId){
        flag2 = true;
        return
      }
    })
    if(!flag || !flag2) {
      dispatch(openModal('TERMS_MODAL', 'HIDECLOSE'))
    }
  }

  const handleComplete = async (value) => {
    if (value != SECRET) {
      inputRef.current.clear();
    } else {
      const res = await signUpUser({ username, email, password });
      await tocVisitorGetter(res.data.userID)
    }
  };

  const handleChange = (value) => {
    setPin(value);
  };
  const isValid = pin === SECRET;
  return (
    <div className="mainContainer">
      <h2 className="code">
        ➡️Enter code *{" "}
        {isValid ? (
          <span role="img">✅</span>
        ) : (
          pin.toString().length === MAX_ITEMS && <span role="img">❌</span>
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
          inputStyle={{ borderColor: "red", width: "40px", height: "40px" }}
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
