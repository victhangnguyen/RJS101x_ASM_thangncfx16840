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

{
  /* <React.Fragment>
<Navbar dark expand="md">
  <div className="container">
    <NavbarBrand className="mr-auto" href="#">
      <img
        src="assets/images/logo.png"
        alt="Ristorante Con Fusion"
        height="30"
        width="41"
      />
    </NavbarBrand>
    <NavbarToggler onClick={this.toggleNav} />
    <Collapse navbar isOpen={this.state.isNavOpen}>
      <Nav navbar>
        <NavItem>
          <NavLink className="nav-link" to="/home">
            <span className="fa fa-home fa-lg"> Home</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/aboutus">
            <span className="fa fa-info fa-lg"> About Us</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/menu">
            <span className="fa fa-list fa-lg"> Menu</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/contactus">
            <span className="fa fa-address-card fa-lg"> Contact Us</span>
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </div>
</Navbar>
<Jumbotron>
  <div className="container">
    <div className="row row-header">
      <div className="col-12 col-sm-6">
        <h1>Ristorante Con Fusion</h1>
        <p>
          We take inspiration from the World's best cuisines, and create
          a unique fusion experience. Our lipsmacking creations will
          tickle your culinary senses!
        </p>
      </div>
    </div>
  </div>
</Jumbotron>
</React.Fragment> */
}
