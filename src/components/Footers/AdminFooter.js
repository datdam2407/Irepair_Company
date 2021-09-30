import React from "react";
import {
  Container,
} from "react-bootstrap";

function AdminFooter() {
  return (
    <>
      <footer className="footer">
        <Container fluid className="pl-4 ml-2">
          <nav>
            <ul className="footer-menu">
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Home
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Company
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Profile
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Blog
                </a>
              </li>
            </ul>
            <p className="copyright text-center">
              © <script>document.write(new Date().getFullYear())</script>
              <a href="#">Irepair</a>, This is azai group
            </p>
          </nav>
        </Container>
      </footer>
    </>
  );
}

export default AdminFooter;
