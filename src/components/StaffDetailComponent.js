import { Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';
import { useParams } from 'react-router-dom';

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

function renderStaff(staffId) {
  //! gaurd clause
  if (staffId === null) return <div></div>;

  const staff = STAFFS.find((staff) => String(staff.id) === staffId);
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
            <CardTitle className="fw-bold">Họ và tên: {staff.name}</CardTitle>
            <CardText>Ngày sinh: {getddmmyyyy(staff.doB)}</CardText>
            <CardText>
              Ngày vào công ty: {getddmmyyyy(staff.startDate)}
            </CardText>
            <CardText>Phòng ban: {staff.department.name}</CardText>
            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>{' '}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

//! Presentational Component
function StaffDetail(props) {
  const params = useParams();
  console.log('params: ', params); //! __DEBUG __params
  return (
    <div className="container-fuild my-3 mx-5">
      <div className="row">
        <div className="col-12">{renderStaff(params.staffId)}</div>
      </div>
    </div>
  );
}

export default StaffDetail;
