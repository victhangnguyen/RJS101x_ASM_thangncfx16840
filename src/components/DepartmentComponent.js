import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//! imp Actions
import { fetchDepartments } from '../redux/features/department/departmentSlice';
import { fetchStaffs } from '../redux/features/staff/staffSlice';
//! imp Component
import Loading from './LoadingComponent';

//! the Presentational Component
function RenderDepartment({ id, name, numberOfStaff }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="card-effect my-2 border border-3">
        <Link to={`/departments/${id}`}>
          <CardHeader>
            {name} (#{id})
          </CardHeader>
          <CardBody>
            <p>
              Tên phòng ban: <span className="fw-bold">{name}</span>
            </p>
            <p className="m-0">
              Số lượng nhân viên:{' '}
              <span className="fw-bold">{numberOfStaff}</span>
            </p>
          </CardBody>
        </Link>
      </Card>
    </div>
  );
}

//! the Container Component
function Department() {
  const dispatch = useDispatch();

  //! componentDidMount
  React.useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchStaffs());
  }, []);

  const staffs = useSelector((state) => state.staffs);
  const departments = useSelector((state) => state.departments);
  // console.log(
  //   '%c_deparmentLoading: ',
  //   'color: blue; font-weight: bold',
  //   departments.loading
  // ); //! __DEBUG

  const departmentList = departments.entities?.map((department) => (
    <RenderDepartment
      key={department.id}
      id={department.id}
      name={department.name}
      numberOfStaff={department.numberOfStaff}
    />
  ));

  const render = function () {
    if (departments.loading === 'pending') {
      return (
        <div className="row">
          <Loading />
        </div>
      );
    } else if (departments.loading === 'failed') {
      return (
        <div className="row">
          <h3>{departments.errorMessage}</h3>
        </div>
      );
    } else if (staffs.loading === 'succeeded') {
      return <div className="row">{departmentList}</div>;
    }
  };

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/staffs">Nhân viên</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Phòng ban</BreadcrumbItem>
      </Breadcrumb>
      <div className="hm-title">
        <h3>Phòng ban</h3>
        <hr />
      </div>
      {render()}
    </div>
  );
}

export default Department;
