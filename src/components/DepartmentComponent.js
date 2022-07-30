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
import staffSlice, { fetchStaffs } from '../redux/features/staff/staffSlice';
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
  console.log(
    '%c_deparmentLoading: ',
    'color: blue; font-weight: bold',
    departments.loading
  ); //! __DEBUG

  const departmentList = departments.entities?.map((department) => (
    <RenderDepartment
      key={department.id}
      id={department.id}
      name={department.name}
      numberOfStaff={
        staffs.entities.filter((staff) => staff.departmentId === department.id)
          .length
      }
    />
  ));
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
      <div className="row">{departmentList}</div>
    </div>
  );
}

export default Department;
