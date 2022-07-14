import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

//! presentational function component
function RenderStaff({ staff }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="card-staff my-2 border border-3">
        <Link to={`/staffs/${staff.id}`}>
          <CardHeader className="fw-bold">
            {staff.name} (#{staff.id})
          </CardHeader>
          <CardBody>
            <p>Mã nhân viên: {staff.id}</p>
            <p>Hệ số lương: {staff.salaryScale}</p>
            <p className="m-0">Số ngày làm thêm: {staff.overTime}</p>
          </CardBody>
          <CardFooter>
            <p className="fw-bold">
              Lương:{' '}
              {numberWithCommas(
                parseInt(staff.salaryScale * 3000000 + staff.overTime * 200000)
              )}
            </p>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}

function SalaryComponent(props) {
  const staffList = props.staffs.map((staff) => (
    <RenderStaff key={staff.id} staff={staff} />
  ));
  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/staffs">Nhân viên</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
      </Breadcrumb>
      <div className="hm-title">
        <h3>Bảng lương</h3>
        <hr />
      </div>
      <div className="row">{staffList}</div>
    </div>
  );
}

export default SalaryComponent;
