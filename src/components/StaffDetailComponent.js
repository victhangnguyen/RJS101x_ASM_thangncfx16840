import {
  Card,
  CardBody,
  CardHeader,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
// import { Link } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';

//! imp Datas
import { STAFFS } from '../shared/staffs';

function getddmmyyyy(isoDate) {
  const date = new Date(isoDate);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '/' + mm + '/' + yyyy;
}
//! presentational function Component
function RenderStaff({ staff }) {
  return (
    <Card>
      <CardHeader className="px-3">Thông tin nhân viên</CardHeader>
      <CardBody className="px-3">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            <div className="card-avatar">
              <img src="/assets/images/avatar.png" alt="" />
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <p className="fw-bold">Họ và tên: {staff.name}</p>
            <p>Ngày sinh: {getddmmyyyy(staff.doB)}</p>
            <p>Ngày vào công ty: {getddmmyyyy(staff.startDate)}</p>
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
function StaffDetail(props) {
  const params = useParams();

  const staff = STAFFS.find((staff) => String(staff.id) === params.staffId);

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
