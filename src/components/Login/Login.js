import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "./firebaseConfig"
import { FaGooglePlusSquare } from 'react-icons/fa';
// import "firebase/compat/auth";
import 'firebase/firestore';
import "./login.css";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";


function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      
      return;
    }
    if (user) history.replace("/admin");
  }, [user, loading]);

  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });

  const [cardClasses, setCardClasses] = React.useState("card-hidden");
  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    }, );
  });
  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     setButton(true);
  //     setTextBtnLogin(<Spinner size="sm" color="danger" children="" />);
  //     post("auth/login", {
  //       username: username,
  //       password: password,
  //     })
  //       .then(
  //         (res) => {
  //           setButton(false);
  //           setTextBtnLogin("Login");
  //           return res;
  //         },
  //         (err) => {
  //           console.log(err.response);
  //           if (err.response)
  //             if (err.response.status === 401)
  //               popUpMessage(
  //                 "Username or password is incorrect. Please try again"
  //               );
  //             else popUpMessage(err.response.data.message);
  //           else {
  //             console.log(err.message);
  //             popUpMessage(err.message);
  //           }
  //           setButton(false);
  //           setTextBtnLogin("Login");
  //         }
  //       )
  //       .then((res) => {
  //         if (res)
  //           res.data.firstLogin === true
  //             ? setModal(true)
  //             : res.data.roles[0] === "ROLE_ADMIN"
  //             ? // ? history.push("/Admin")
  //               // : history.push("/Staff");
  //               (window.location.href = "/Admin")
  //             : (window.location.href = "/Staff");
  //       });
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
              {/* <input
                type="text"
                className="login__textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
              />
              <input
                type="password"
                className="login__textBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                className="login__btn"
                onClick={() => signInWithEmailAndPassword(email, password)}
              >
                Login
              </button> */}
              
              <h2>WELCOME TO IREPAIR</h2>
              <button
                className="login__btn login__google"
                onClick={signInWithGoogle}       
              >
                Login with Google
              </button>

            </div>
          </div>

          {/* <Container>
            <Col className="mx-auto" lg="4" md="8">
              <Form action="" className="form" method="">
                <Card className={"card-login " + cardClasses}>
                  <Card.Header>
                    <h3 className="header text-center">Login</h3>
                  </Card.Header>
                  <Card.Body>
                    <Card.Body>
                      <Form.Group
                        onSubmit={(e) => {
                          handleSubmit(e);
                        }}
                      >
                        <label>Username</label>
                        <Form.Control
                          placeholder="Enter username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          placeholder="Password"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Card.Body>
                  </Card.Body>
                  <Card.Footer className="ml-auto mr-auto">
                    <Button className="btn-wd" type="submit" variant="warning">
                      Login
                    </Button>
                  </Card.Footer>
                </Card>
              </Form>
            </Col>
          </Container> */}
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
