import React from "react";

import {
  Container,
} from "react-bootstrap";

function AuthFooter() {
  return (
    <>
      <footer className="footer position-absolute fixed-bottom">
        <Container>
          <nav>
            <ul className="footer-menu d-flex justify-content-center">
              <li>
                <a className="m-0" href="#" onClick={(e) => e.preventDefault()}>
                  Home
                </a>
              </li>
              <li>
                <a className="m-0" href="#" onClick={(e) => e.preventDefault()}>
                  Company
                </a>
              </li>
              <li>
                <a className="m-0" href="#" onClick={(e) => e.preventDefault()}>
                  Profile
                </a>
              </li>
              <li>
                <a className="m-0" href="#" onClick={(e) => e.preventDefault()}>
                  Blog
                </a>
              </li>
            </ul>
            <p className="copyright text-center m-0">
              © {new Date().getFullYear()}{" "}
              <a href="#">Irepair</a>, This is azai group
            </p>
          </nav>
        </Container>
      </footer>
    </>
  );
}

export default AuthFooter;
