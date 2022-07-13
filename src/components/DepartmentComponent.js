import React from 'react';
import { DEPARTMENTS } from '../shared/staffs';
import { Card, CardHeader, CardBody } from 'reactstrap';

//! presentational function component
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

function DepartmentComponent() {
  const departmentList = DEPARTMENTS.map((department) => (
    <RenderDepartment key={department.id} department={department} />
  ));
  return (
    <div className="container-fuild my-3 mx-5">
      <div className="hm-title">
        <h3>Phòng ban</h3>
        <hr />
      </div>
      <div className="row">{departmentList}</div>
    </div>
  );
}

export default DepartmentComponent;
