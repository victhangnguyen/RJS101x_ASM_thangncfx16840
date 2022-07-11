import React from 'react';
import { Outlet } from 'react-router-dom';
//! imp Components
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import StaffList from '../components/StaffListComponent';
import Setting from '../components/SettingComponent';
//! imp Datas
import { STAFFS } from '../shared/staffs';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      setting: {
        column: 'default', //! init column is equal to 2
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Main;
