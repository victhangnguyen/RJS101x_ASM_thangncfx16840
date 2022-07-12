import React from 'react';
import { DEPARTMENTS } from '../shared/staffs';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

//! presentational function component
function RenderDepartment({ department }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="my-2">
        <CardHeader>#{department.id}</CardHeader>
        <CardBody>
          <CardTitle className='fw-bold'>Tên phòng ban: {department.name}</CardTitle>
          Số lượng nhân viên: {department.numberOfStaff}
        </CardBody>
      </Card>
    </div>
  );
}

function DepartmentComponent() {
  const departmentList = DEPARTMENTS.map((department) => (
    <RenderDepartment key={department.id} department={department} />
  ));
  return (
    <div className="container-fuild my-3 mx-5">
      <div className="row">{departmentList}</div>
    </div>
  );
}

export default DepartmentComponent;
