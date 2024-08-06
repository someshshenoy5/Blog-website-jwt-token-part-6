import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { loginUser, registerUser } from "../api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const token = await loginUser(formData.userName, formData.password);
        localStorage.setItem("token", token);
        setToken(token);
        console.log("Token:", token);
        navigate("/");
      } else {
        await registerUser({
          userName: formData.userName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          password: formData.password,
        });
        alert("User added successfully! Please login.");
        setIsLogin(true);
        setFormData({
          userName: "",
          email: "",
          phoneNumber: "",
          address: "",
          password: "",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to login/sign up. Please check your credentials.");
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form onSubmit={handleSubmit} className="login100-form validate-form">
            <span className="login100-form-title p-b-26">
              {isLogin ? "Login" : "Sign Up"}
            </span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid username is required"
            >
              <input
                className="input100"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />
              <span
                className="focus-input100"
                data-placeholder="Username"
              ></span>
            </div>

            {!isLogin && (
              <>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Valid email is: a@b.c"
                >
                  <input
                    className="input100"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="Email"
                  ></span>
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter phone number"
                >
                  <input
                    className="input100"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="Phone Number"
                  ></span>
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter address"
                >
                  <input
                    className="input100"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <span
                    className="focus-input100"
                    data-placeholder="Address"
                  ></span>
                </div>
              </>
            )}

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <span className="btn-show-pass">
                <i className="zmdi zmdi-eye"></i>
              </span>
              <input
                className="input100"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span
                className="focus-input100"
                data-placeholder="Password"
              ></span>
            </div>

            {error && <div className="error-message" style={{color: "grey"}}>{error}</div>}

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </div>
            </div>

            <div className="text-center p-t-115 ">
              <span className="txt1">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>

              <button type="button" className="txt2" onClick={toggleMode}>
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
