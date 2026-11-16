/* ORX prototype feature flags.
   These defaults match the preview. A fresh browser with no saved settings uses exactly these values.
   Bump the ?v= number on the <script src="flags.js?v=..."> tag in login.html whenever you change this file. */
window.ORX_FLAGS = {
  showSso: false,          // "Sign in with Microsoft" button
  accountNotFound: false,  // email step: show "couldn't find an account"
  wrongCredentials: false, // password step: show "incorrect email or password"
  resetLinkFails: false,   // forgot password: sending the reset link fails
  codeMismatch: false,     // reset code is rejected
  changeFails: false       // setting the new password fails
};
