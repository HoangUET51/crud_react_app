import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/cat.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/slice/useSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);

  const auth = useSelector((state) => state.user.auth);
  console.log("Check out >>>>>>", auth);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (auth === false && window.location.pathname !== "/login") {
      navigate("/");
      toast.success("logout success");
    }
  }, [auth]);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavLink to="/" className="navbar-brand">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            ></img>
            APP-HOANG-MEO
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link" active>
                Home
              </NavLink>
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
              <NavLink to="/comments" className="nav-link">
                Comments
              </NavLink>
            </Nav>
            <Nav>
              <div className="icon-setting">
                {auth ? (
                  <span className="mx-xl-5">
                    <b>{email}</b>
                  </span>
                ) : (
                  ""
                )}

                <i className="fa-solid fa-gear "></i>
              </div>

              <NavDropdown title="Settings" id="basic-nav-dropdown">
                {auth === true ? (
                  <NavDropdown.Item
                    className="dropdown-item"
                    onClick={() => handleLogout()}
                  >
                    <i className="fa-solid fa-right-to-bracket mx-1"></i>
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <NavLink to="/login" className="dropdown-item" active>
                    <i className="fa-solid fa-user-minus mx-1"></i>
                    Login
                  </NavLink>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
