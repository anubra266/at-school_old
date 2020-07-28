import React, { useState, useEffect } from "react";

import {
  strengthIndicator,
  strengthColor,
  strengthlabel,
} from "./Strength-Password";
import { Input } from "reactstrap";
export default function PasswordInput(props) {
  const { settings } = props;
  const strength = strengthIndicator(props.value);
  const color = strengthColor(strength);
  const label = strengthlabel(strength);
  const [showPassword, setshowPassword] = useState(false);
  useEffect(() => {});
  return (
    <div>
      {settings ? (
        <Input
          style={{ color: "black" }}
          required
          minLength="6"
          type={showPassword ? "text" : "password"}
          name="password"
          value={props.value}
          onChange={props.handleChanges}
          placeholder="Password"
        />
      ) : (
        <div className="wrap-input100  m-b-16">
          {showPassword ? (
            <i
              onClick={() => {
                setshowPassword(false);
              }}
              className="icon-eye icc"
            ></i>
          ) : (
            <i
              onClick={() => {
                setshowPassword(true);
              }}
              className="icon-eye-slash icc"
            ></i>
          )}
          <Input
            className="input100"
            required
            minLength="6"
            type={showPassword ? "text" : "password"}
            name="password"
            value={props.value}
            onChange={props.handleChanges}
            placeholder="Password"
          />
          <span className="focus-input100"></span>
        </div>
      )}

      {props.value !== "" ? (
        <label
          style={{
            fontWeight:"bold",
            color: props.value !== "" ? color : "",
          }}
        >
          {props.value !== "" ? label : ""}
        </label>
      ) : (
        ""
      )}
    </div>
  );
}
