import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
//! imp Components
import StaffDetail from './StaffDetailComponent';

//! create Component named StaffList
class StaffList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null, //! init null
    };
  }

  renderStaffCard(staff) {
    return (
      <div key={staff.id} className="col-md-6">
        <Card
          className="my-1 border border-2"
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
        <StaffDetail staff={this.state.selectedStaff} />
      </div>
    );
  }
}

export default StaffList;
