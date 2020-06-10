import React from 'react';
import Welcome from "../components/Welcome/Welcome.js"

// TODO: Import all private routes here and add in export object.

const OnlyForHeadOfOperation = () => (
    <h1>Only For HeadOfOperation</h1>
  );
  const HeadOfOperationAndManager = () => (
    <h1>HeadOfOperation And Manager</h1>
  );
  const OnlyForManager = () => (
    <h1>Only For Manager</h1>
  );
  const HeadOfOperationManagerAndHeadCashier = () => (
    <h1>HeadOfOperation Manager And HeadCashier</h1>
  );
  const CommonRoute = () => (
    <h1>Common Route</h1>
  );
  
  export {
    Welcome,
    OnlyForHeadOfOperation,
    HeadOfOperationAndManager,
    OnlyForManager,
    HeadOfOperationManagerAndHeadCashier,
    CommonRoute
  }
  