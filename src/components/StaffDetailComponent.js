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
import { fetchStaffs } from '../redux/features/staff/staffSlice';

//! presentational function Component
function RenderStaff({ staff }) {
  return (
    <Card>
      <CardHeader className="px-3">Thông tin nhân viên</CardHeader>
      <CardBody className="px-3">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            <div className="card-avatar">
              <img src={staff.image} alt="" />
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <p className="fw-bold">Họ và tên: {staff.name}</p>
            <p>Ngày sinh: {toVNDate(staff.doB)}</p>
            <p>Ngày vào công ty: {toVNDate(staff.startDate)}</p>
            <p>Phòng ban: {staff.department.name}</p>
            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
            <p>Số ngày đã làm thêm: {staff.overTime}</p>{' '}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

//! Presentational Component
function StaffDetail() {
  const params = useParams();
  // const dispatch = useDispatch();

  //! get Staffs Data
  // dispatch(getStaffs());
  const staffs = useSelector((state) => state.staffs);

  console.log('staffs - StaffDetail: ', staffs);

  const staff = staffs?.find((staff) => String(staff.id) === params.staffId);

  //! guard clause
  if (!staff) return <></>;
  // console.log('params: ', params); //! __DEBUG __params

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/staffs">Nhân viên</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
      </Breadcrumb>
      <div className="row">
        <div className="col-12">
          <RenderStaff staff={staff} />
        </div>
      </div>
    </div>
  );
}

export default StaffDetail;
