import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FetchLoginUser } from "../redux/slice/useSlice";
const Login = (props) => {
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);

  const auth = useSelector((state) => state.user.auth);

  const isLoading = useSelector((state) => state.user.isLoading);

  const handleBack = () => {
    Navigate("/");
  };

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Login failed");
      return;
    } else {
      dispatch(FetchLoginUser({ email, password }));
    }
  };

  const handlePress = (e) => {
    if (e && e.key === "Enter") {
      handleLogin();
    }
    console.log(e);
  };

  useEffect(() => {
    if (auth === true) {
      Navigate("/");
    }
  }, [auth]);

  return (
    <>
      <div className="login-container">
        <div className="title">Login User</div>

        <div className="input-container">
          <label for="exampleInputEmail1" className="my-2">
            Email address
          </label>
          <input
            type="email"
            className=""
            id="exampleInputEmail1"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label for="exampleInputPassword1" className="my-2">
            Password
          </label>
          <input
            type={isShowPassword === true ? "password" : "text"}
            className=""
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handlePress(e)}
          />
          <div className="icon">
            <i
              className={
                isShowPassword === true
                  ? "fa-solid fa-eye"
                  : "fa-solid fa-eye-slash"
              }
              onClick={() => setIsShowPassword(!isShowPassword)}
            ></i>
          </div>
          <button
            className={email && password ? "active" : ""}
            disabled={email && password ? false : true}
            onClick={() => handleLogin()}
          >
            {isLoading === true ? (
              <i className="fa-solid fa-spinner mx-1"></i>
            ) : (
              " "
            )}
            Login
          </button>

          <div className="back" onClick={() => handleBack()}>
            Back
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
