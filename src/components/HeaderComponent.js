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
        <NavbarToggler onClick={() => {}} />
        <Collapse navbar>
          <Nav navbar>
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
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
