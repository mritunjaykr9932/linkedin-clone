import { auth, provider } from "../firebase";
import { SET_USER } from "./actionType";

export  const setuser = (payload) => ({
  type:SET_USER,
  user:payload.user,
});

export function SignInAPI() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        console.log(payload);
        dispatch(setuser(payload));
      })
      .catch((error) => alert(error.message));
  };
}
