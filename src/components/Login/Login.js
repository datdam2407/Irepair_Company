import React from "react";

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
    
    const [cardClasses, setCardClasses] = React.useState("card-hidden");
    React.useEffect(() => {
        setTimeout(function () {
            setCardClasses("");
        }, 1000);
    });
    function handleSubmit(e) {
        e.preventDefault();
        setButton(true);
        setTextBtnLogin(<Spinner size="sm" color="danger" children="" />);
        post("auth/login", {
          username: username,
          password: password,
        })
          .then((res) => {
            setButton(false);
            setTextBtnLogin("Login");
            return res;
          }, (err) => {
            console.log(err.response)
            if (err.response)
              if (err.response.status === 401)
                popUpMessage("Username or password is incorrect. Please try again")
              else
                popUpMessage(err.response.data.message);
            else {
              console.log(err.message)
              popUpMessage(err.message)
            }
            setButton(false);
            setTextBtnLogin("Login");
          })
          .then((res) => {
            if (res)
              res.data.firstLogin === true
                ? setModal(true)
                : res.data.roles[0] === "ROLE_ADMIN"
                  // ? history.push("/Admin")
                  // : history.push("/Staff");
                  ? window.location.href = "/Admin"
                  : window.location.href = "/Staff";
          })
          ;
      }
    return (
        <>
            <div
                className="full-page section-image"
                data-color="black"
                data-image={require("assets/img/full-screen-image-2.jpg").default}
            >
                <div className="content d-flex align-items-center p-0">
                    <Container>
                        <Col className="mx-auto" lg="4" md="8">
                            <Form action="" className="form" method="">
                                <Card className={"card-login " + cardClasses}>
                                    <Card.Header>
                                        <h3 className="header text-center">Login</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Body>
                                            <Form.Group onSubmit={(e) => {
                                                handleSubmit(e);}}>
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
                    </Container>
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
