import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigateSearch } from '../hooks';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  NavItem,
  Collapse,
} from 'reactstrap';

function Header(props) {
  //! init Values
  const initInputValues = {
    search: '',
  };
  //! effect NavLink
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [inputValues, setInputValues] = React.useState(initInputValues);

  const navigateSearch = useNavigateSearch();

  const navList = [
    {
      navId: 0,
      navName: 'Nhân viên',
      navLink: '/staffs',
    },
    {
      navId: 1,
      navName: 'Phòng Ban',
      navLink: '/departments',
    },
    {
      navId: 2,
      navName: 'Bảng Lương',
      navLink: '/salary',
    },
    {
      navId: 3,
      navName: 'Tìm kiếm',
      navLink: '/search',
    },
  ];

  // //! onSearchChange
  // const handleChange = function (e) {
  //   setInputValues({
  //     ...inputValues,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = function (e) {
  //   e.preventDefault();
  //   // navigate(`../search/${inputValues.search}`, { replace: true });
  //   // navigateSearch('/search', { sort: 'date', order: 'newest' });

  //   navigateSearch('/search', {
  //     keyword: inputValues.search.trim().replace(/  +/g, ' '),
  //   });
  //   //! format empty
  //   setInputValues(initInputValues);
  // };

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
          {/* <form className="d-flex">
            <input
              name="search"
              value={inputValues.search}
              className="form-control me-2"
              type="search"
              placeholder="Tìm nhân viên"
              aria-label="Tìm nhân viên"
              onChange={(e) => handleChange(e)}
            />
            <button
              className="btn btn-outline-light"
              onClick={(e) => handleSubmit(e)}
            >
              Search
            </button>
          </form> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
