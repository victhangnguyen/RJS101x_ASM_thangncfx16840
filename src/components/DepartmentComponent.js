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
import { getDepartments } from '../redux/features/department/departmentSlice';

//! the Presentational Component
function RenderDepartment({ department }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="my-2 border border-3">
        <CardHeader>
          {department.name} (#{department.id})
        </CardHeader>
        <CardBody>
          <p>
            Tên phòng ban: <span className="fw-bold">{department.name}</span>
          </p>
          <p className="m-0">Số lượng nhân viên: {department.numberOfStaff}</p>
        </CardBody>
      </Card>
    </div>
  );
}

//! the Container Component
function Department() {
  const dispatch = useDispatch();

  //! get Departments Data
  dispatch(getDepartments());
  const departments = useSelector((state) => state.departments);

  const departmentList = departments?.map((department) => (
    <RenderDepartment key={department.id} department={department} />
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
