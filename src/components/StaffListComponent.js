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
    // console.log('this.state ID: ', this.state.selectedStaff?.id); //! __DEBUG __state
    // console.log(staff.id)
    return (
      <div key={staff.id} className="col-md-6">
        <Card
          className={`my-1 border border-2 ${
            staff.id === this.state.selectedStaff?.id ? 'border-danger' : ''
          }`}
          onClick={() => this.onStaffSelect(staff)}
        >
          <CardBody
            className={`p-2 ${
              staff.id === this.state.selectedStaff?.id ? 'bg-light' : ''
            }`}
          >
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
          <StaffDetail staff={this.state.selectedStaff} />
        </div>
      </div>
    );
  }
}

export default StaffList;
