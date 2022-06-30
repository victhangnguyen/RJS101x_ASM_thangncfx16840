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
      <div
        key={staff.id}
        className={`${
          this.props.column === 2
            ? 'col-md-6'
            : this.props.column === 3
            ? 'col-md-4'
            : this.props.column === 6
            ? 'col-md-2'
            : ''
        }`}
      >
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
    console.log('this.props: ', this.props); //! __DEBUG __props
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
