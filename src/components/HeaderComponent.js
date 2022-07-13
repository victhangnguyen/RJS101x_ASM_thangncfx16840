import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  NavItem,
  Collapse,
} from 'reactstrap';

function Header(props) {
  //! effect NavLink
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [selectedNav, SetSelectedNav] = React.useState(0);

  const navList = [
    {
      navId: 0,
      navName: 'Nhân viên',
      navLink: '/staffs',
    },
    {
      navId: 1,
      navName: 'Phòng Ban',
      navLink: '/department',
    },
    {
      navId: 2,
      navName: 'Bảng Lương',
      navLink: '/salary',
    },
  ];

  return (
    <div className="header">
      <Navbar dark expand="md">
        <NavbarBrand className="mr-auto" href="/">
          <div className="logo">
            <img
              src="/assets/images/logo192.png"
              alt="Ứng dụng quản lý nhân sự v1.0"
            />
          </div>
        </NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
        />
        <Collapse navbar isOpen={isNavOpen}>
          <Nav navbar className="me-auto mb-4 mb-md-0">
            {navList.map((nav) => {
              return (
                <NavItem key={nav.navId}>
                  <NavLink className="nav-link" to={nav.navLink}>
                    {nav.navName}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
