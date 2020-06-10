import React from 'react';

import {strengthIndicator, strengthColor, strengthlabel} from './Strength-Password';
import {Input} from "reactstrap";
export default function PasswordInput(props) {

    const strength = strengthIndicator(props.value);
    const color = strengthColor(strength);
    const label = strengthlabel(strength);

    return (
        <div>
            <Input
                type='password'
                minLength='6'
                value={props.value}
                className='password-input'
                placeholder={props.placeholder}
                onChange={props.handleChanges}
                style={{
                borderColor: props.value !== ""
                    ? color
                    : ''
            }}
                required/>
            <label
                style={{
                color: props.value !== ""
                    ? color
                    : ''
            }}>
                {props.value !== ""
                    ? label
                    : ''}
            </label>
        </div>
    )

}