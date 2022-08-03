import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

//! imp Components
import AnimationLayout from './components/AnimationLayoutComponent';
import Staff from './components/StaffListComponent';
import Department from './components/DepartmentComponent';
import Salary from './components/SalaryComponent';
import Search from './components/SearchComponent';
import StaffDetail from './components/StaffDetailComponent';
import StaffDetpListComponent from './components/StaffDetpListComponent';

//! imp hooks
import { withRouter } from './hooks';

//! imp pages
import PageNotFound from './pages/PageNotFound';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<AnimationLayout />}>
            {/* <Route index element={<Navigate to="/staffs" />} /> */}
            <Route index element={<Staff />} />
            <Route path="staffs" element={<Staff />} />
            <Route path="staffs/:staffId" element={<StaffDetail />} />
            <Route path="departments" element={<Department />} />
            <Route
              path="departments/:deptId"
              element={<StaffDetpListComponent />}
            />
            <Route path="salary" element={<Salary />} />
            <Route path="search" element={<Search />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    );
  }
}

export default withRouter(App);
