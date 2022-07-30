import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//! imp Components
import Main from './components/MainComponent';
import Staff from './components/StaffListComponent';
import Department from './components/DepartmentComponent';
import Salary from './components/SalaryComponent';
import Search from './components/SearchComponent';
import StaffDetail from './components/StaffDetailComponent';
import StaffDetpListComponent from './components/StaffDetpListComponent';

//! imp Datas
import PageNotFound from './pages/PageNotFound';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
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
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
