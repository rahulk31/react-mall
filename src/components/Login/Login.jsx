import { useEffect, useState, useCallback } from "react";
import Button from "../Button/Button";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { IoInformationCircleOutline, IoWarningOutline } from "react-icons/io5";
import { setToast } from "../../store/slices/toastSlice";
import { clearToastAfterDelay } from "../../utils/cartUtils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const guestLoginData = {
    username: "mor_2314",
    password: "83r5^_",
  };

  const onChangeHandler = useCallback((e, type) => {
    const value = e.target.value;
    if (type === "username") {
      setUsername(value);
    } else if (type === "password") {
      setPassword(value);
    }
  }, []);

  const loginHandler = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Logging in");
      fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.token) {
            setFailedLogin(false);
            dispatch(login({ username, password }));
          } else {
            setFailedLogin(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setFailedLogin(true);
        });
    },
    [dispatch, username, password]
  );

  const loginAsGuestHandler = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Logging in as guest");
      dispatch(login(guestLoginData));
      console.log("Logging in as guest - dispatched");
      dispatch(setToast({ status: "success", message: "Logged in as guest" }));
      clearToastAfterDelay(dispatch);
    },
    [dispatch, guestLoginData]
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-container">
      <div className="login">
        <h1>Login</h1>
        <form>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => onChangeHandler(e, "username")}
            value={username}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => onChangeHandler(e, "password")}
            value={password}
            required={true}
          />
          {failedLogin && (
            <p className="error">
              <IoWarningOutline />
              <span>Invalid username or password</span>
            </p>
          )}
          <Button btnVariant="primary" text="Login" onClick={loginHandler} />
          <Button
            btnVariant="secondary"
            text="Login as guest"
            onClick={loginAsGuestHandler}
          />
          {failedLogin && (
            <div className="api-down-info">
              <IoInformationCircleOutline className="info-icon" />
              <p>
                Auth API might be down, login as guest to bypass the
                authentication and checkout the app.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
