import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
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

  renderStaffCard(staff) {
    return (
      <div
        key={staff.id}
        className={`col-12 col-md${
          this.props.column === 2
            ? '-6'
            : this.props.column === 3
            ? '-4'
            : this.props.column === 6
            ? '-2'
            : ''
        }`}
      >
        <Card
          className={`staff my-1 border border-2 ${
            staff.id === this.state.selectedStaff?.id ? 'active' : ''
          }`}
          onClick={() => this.onStaffSelect(staff)}
        >
          <CardBody className="p-2">
            <CardTitle className="mb-0">{staff.name}</CardTitle>
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
    const staffList = this.props.staffs.map((staff) =>
      this.renderStaffCard(staff)
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
