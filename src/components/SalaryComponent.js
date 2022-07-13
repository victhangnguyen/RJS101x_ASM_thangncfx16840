import React from 'react';
import { STAFFS } from '../shared/staffs';
import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

//! presentational function component
function RenderStaff({ staff }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="my-2">
        <CardHeader className="fw-bold">
          {staff.name} (#{staff.id})
        </CardHeader>
        <CardBody>
          <p>Mã nhân viên: {staff.id}</p>
          <p>Hệ số lương: {staff.salaryScale}</p>
          <p className='m-0'>Số ngày làm thêm: {staff.overTime}</p>
        </CardBody>
        <CardFooter>
          <p className="fw-bold">
            Lương:{' '}
            {numberWithCommas(
              parseInt(staff.salaryScale * 3000000 + staff.overTime * 200000)
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

function SalaryComponent() {
  const staffList = STAFFS.map((staff) => (
    <RenderStaff key={staff.id} staff={staff} />
  ));
  return (
    <div className="container-fuild my-3 mx-5">
      <div className="row">{staffList}</div>
    </div>
  );
}

export default SalaryComponent;
