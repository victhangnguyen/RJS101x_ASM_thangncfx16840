import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { toVNDate } from '../utils';
import { useParams, Link } from 'react-router-dom';
//! imp RTK
import { useDispatch, useSelector } from 'react-redux';
//! imp RTK-Actions
import { fetchStaffById } from '../redux/features/staff/staffSlice';

//! presentational function Component
function RenderStaff({
  id,
  name,
  doB,
  departmentId,
  image,
  startDate,
  salaryScale,
  annualLeave,
  overTime,
}) {
  return (
    <Card>
      <CardHeader className="px-3">Thông tin nhân viên</CardHeader>
      <CardBody className="px-3">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            <div className="card-avatar">
              <img src={image} alt="" />
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <p className="fw-bold">Họ và tên: {name}</p>
            <p>Ngày sinh: {toVNDate(doB)}</p>
            <p>Ngày vào công ty: {toVNDate(startDate)}</p>
            <p>Phòng ban: {departmentId}</p>
            <p>Số ngày nghỉ còn lại: {annualLeave}</p>
            <p>Số ngày đã làm thêm: {overTime}</p>{' '}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

//! Presentational Component
function StaffDetail() {
  const params = useParams();
  const dispatch = useDispatch();

  const staff = useSelector((state) => state.staffs.entities)[0];

  //! componentDidMount
  React.useEffect(() => {
    dispatch(fetchStaffById(params.staffId));
  }, []);
  console.log('%c_staff: ', 'color: violet; font-weight: bold', staff); //! __DEBUG

  //! guard clause
  if (!staff) return <></>;

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/staffs">Nhân viên</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{staff?.name}</BreadcrumbItem>
      </Breadcrumb>
      <div className="row">
        <div className="col-12">
          <RenderStaff
            id={staff.id}
            name={staff.name}
            doB={staff.doB}
            departmentId={staff.departmentId}
            image={staff.image}
            startDate={staff.startDate}
            salaryScale={staff.salaryScale}
            annualLeave={staff.annualLeave}
            overTime={staff.overTime}
          />
        </div>
      </div>
    </div>
  );
}

export default StaffDetail;
