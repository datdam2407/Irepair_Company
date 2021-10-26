import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../../Firebase/firebaseConfig";
import { FcGoogle } from "react-icons/fc";
import "./login.css";
import "firebase/firestore";
import loginMan from "../../assets/img/worker-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Form,
  Input,
  Spinner,
} from "reactstrap";
function Login() {

  // const [user, loading, error] = useAuthState(auth);
  // const history = useHistory();
  // useEffect(() => {
  //   if (loading) {
  //     return;
  //   }
  //   if (user)
  //    history.replace("/company/dashboard");
  // }, [user, loading]);
 

  const [cardClasses, setCardClasses] = React.useState("card-hidden");
  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    }, 1000);
  });
  // function handleSubmit(e) {
  //     e.preventDefault();
  //     setButton(true);
  //     setTextBtnLogin(<Spinner size="sm" color="danger" children="" />);
  //     post("auth/login", {
  //       username: username,
  //       password: password,
  //     })
  //       .then((res) => {
  //         setButton(false);
  //         setTextBtnLogin("Login");
  //         return res;
  //       }, (err) => {
  //         console.log(err.response)
  //         if (err.response)
  //           if (err.response.status === 401)
  //             popUpMessage("Username or password is incorrect. Please try again")
  //           else
  //             popUpMessage(err.response.data.message);
  //         else {
  //           console.log(err.message)
  //           popUpMessage(err.message)
  //         }
  //         setButton(false);
  //         setTextBtnLogin("Login");
  //       })
  //       .then((res) => {
  //         if (res)
  //           res.data.firstLogin === true
  //             ? setModal(true)
  //             : res.data.roles[0] === "ROLE_ADMIN"
  //               // ? history.push("/Admin")
  //               // : history.push("/Staff");
  //               ? window.location.href = "/Admin"
  //       })
  //       ;
  //   }

  return (
    <>
      <div
        className="full-page section-image"
        data-color="white"
        data-image={require("assets/img/full-screen-image-2.jpg").default}
      >
        <div className="content d-flex align-items-center p-0">
          <div className="login">
            <div className="login__container">
              <h3 className="title-login">WELCOME TO IREPAIR</h3>
              <img className="login-logon" src={loginMan} />
              <div class="input-div one">
                <div class="i">
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
                <div class="div">
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div class="input-div pass">
                <div class="i">
                  <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                </div>
                <div class="div">
                  {/* <h5>Password</h5> */}
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <a className="a-login" href="#">Forgot Password?</a>

              {/* <div className="google-btn" onClick={signInWithGoogle} > */}
              <div className="google-btn" onClick={(e) => 
                      window.location.href = "/Company/history"}
                      // window.location.href = "http://localhost:3000/admin/user-page"}
                  >
                {/* <div className="google-icon-wrapper">
                  <FcGoogle className="google-icon" />
                </div> */}

                <p className="btn-text">
                  <b className="title-login">Sign in</b>
                </p>
              </div>
            </div>
          </div>

        </div>

        <div
          className="full-page-background"
          style={{
            backgroundImage:
              "url(" +
              require("assets/img/full-screen-image-2.jpg").default +
              ")",
          }}
        ></div>
      </div>
    </>
  );
}

export default Login;
