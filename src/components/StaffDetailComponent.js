import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export default class StaffDetail extends Component {
  constructor(props) {
    super(props);
  }

  getddmmyyyy(isoDate) {
    const date = new Date(isoDate);
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;
  }

  renderStaff(staff) {
    //! gaurd clause
    if (staff === null) return <div></div>;
    console.log(staff);

    return (
      <Card>
        <CardBody>
          <CardTitle className="fw-bold">Họ và tên: {staff.name}</CardTitle>
          <CardText>Ngày sinh: {this.getddmmyyyy(staff.doB)}</CardText>
          <CardText>
            Ngày vào công ty: {this.getddmmyyyy(staff.startDate)}
          </CardText>
          <CardText>Phòng ban: {staff.department.name}</CardText>
          <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
          <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
        </CardBody>
      </Card>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">{this.renderStaff(this.props.staff)}</div>
        <div className="col-md-6"></div>
      </div>
    );
  }
}
