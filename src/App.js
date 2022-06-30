import React from 'react';
import './App.css';
import { STAFFS } from './shared/staffs';
import { Navbar, NavbarBrand } from 'reactstrap';

//! import Components
import StaffList from './components/StaffListComponent';
import Setting from './components/SettingComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      setting: {
        column: 'default', //! init column is equal to 2
      },
    };
  }

  setColumn(column) {
    // console.log('nowThis: ', this); //! __DEBUG __this
    this.setState({
      setting: {
        column: column,
      },
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container-fluid">
            <NavbarBrand href="/">
              <div className="logo"><img src="assets/images/logo192.png" alt="" /></div>
              Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <Setting setColumn={(column) => this.setColumn(column)} />
        <StaffList
          staffs={this.state.staffs}
          column={this.state.setting.column}
        />
      </div>
    );
  }
}

export default App;
