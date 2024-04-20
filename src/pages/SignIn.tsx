import SignInForm from "../forms/SignInForm";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/slices/userSlice";
import User from "../model/User";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  function submitFn(userData: User) {
    const emailInputed = userData!.email;
    const passInputed = userData!.password;

    let userObj: User = {
      email: emailInputed,
      password: passInputed
    };

    dispatch(userActions.set(userObj));

  }
  return <SignInForm submitFn={submitFn}

  />

}

export default SignIn;