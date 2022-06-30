import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

function getddmmyyyy(isoDate) {
  const date = new Date(isoDate);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '/' + mm + '/' + yyyy;
}

function renderStaff(staff) {
  //! gaurd clause
  if (staff === null) return <div></div>;

  return (
    <Card className="mt-2 border border-2 border-secondary">
      <CardBody>
        <CardTitle className="fw-bold">Họ và tên: {staff.name}</CardTitle>
        <CardText>Ngày sinh: {getddmmyyyy(staff.doB)}</CardText>
        <CardText>Ngày vào công ty: {getddmmyyyy(staff.startDate)}</CardText>
        <CardText>Phòng ban: {staff.department.name}</CardText>
        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
      </CardBody>
    </Card>
  );
}

//! Presentational Component
function StaffDetail(props) {
  return <div className="col-md-6">{renderStaff(props.staff)}</div>;
}

export default StaffDetail;