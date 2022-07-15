import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

//! imp Components
import Main from './components/MainComponent';
import Staff from './components/StaffListComponent';
import Department from './components/DepartmentComponent';
import Salary from './components/SalaryComponent';
import Search from './components/SearchComponent';
import StaffDetail from './components/StaffDetailComponent';

//! imp Datas
import { STAFFS, DEPARTMENTS } from './shared/staffs';
import PageNotFound from './pages/PageNotFound';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              {/* <Route index element={<Navigate to="/staffs" />} /> */}
              <Route index element={<Staff staffs={this.state.staffs} />} />
              <Route
                path="staffs"
                element={<Staff staffs={this.state.staffs} />}
              />
              <Route path="staffs/:staffId" element={<StaffDetail />} />

              <Route
                path="department"
                element={<Department departments={this.state.departments} />}
              />
              <Route
                path="salary"
                element={<Salary staffs={this.state.staffs} />}
              />
              <Route
                path="search"
                element={<Search staffs={this.state.staffs} />}
              />
              {/* <Route path="search?:keywords" element={<Search />} /> */}
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
