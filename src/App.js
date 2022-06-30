import React from 'react';
import './App.css';
import { STAFFS } from './shared/staffs';
import { Navbar, NavbarBrand } from 'reactstrap';

//! import Components
import StaffList from './components/StaffListComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
    };
  }
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container-fluid">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;
