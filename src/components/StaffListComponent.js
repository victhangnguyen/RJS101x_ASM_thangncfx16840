import React from 'react';
import { Card, CardBody, CardTitle, CardHeader, CardImg } from 'reactstrap';
//! imp Components
import StaffDetail from './StaffDetailComponent';

//! create Component named StaffList (Container Component)
class StaffList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null, //! init null
    };
  }

  renderStaffCard(staff, index) {
    return (
      <div
        key={staff.id}
        className={`${
          this.props.column === 'default'
            ? 'col-12 col-md-6 col-lg-4'
            : this.props.column === '2'
            ? 'col-12 col-md-6'
            : this.props.column === '3'
            ? 'col-12 col-md-4'
            : this.props.column === '6'
            ? 'col-12 col-md-2'
            : ''
        }`}
      >
        <Card
          className={`staff my-2 border border-2 ${
            staff.id === this.state.selectedStaff?.id ? 'active' : ''
          }`}
          onClick={() => this.onStaffSelect(staff)}
        >
          <CardHeader className="px-3">Nhân viên {index + 1}</CardHeader>
          <CardBody className="px-3">
            <div className="row">
              <div className="col-4">
                <div className="card-avatar">
                  <img src="assets/images/avatar.png" alt="" />
                </div>
              </div>
              <div className="col-8">
                <CardTitle className="fw-bold mb-0">{staff.name}</CardTitle>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  onStaffSelect(staff) {
    this.setState({
      selectedStaff: staff,
    });
  }

  render() {
    const staffList = this.props.staffs.map((staff, index) =>
      this.renderStaffCard(staff, index)
    );
    return (
      <div className="container">
        <div className="row">{staffList}</div>
        <div className="row">
          <StaffDetail
            staff={this.state.selectedStaff}
            column={this.props.column}
          />
        </div>
      </div>
    );
  }
}

export default StaffList;
