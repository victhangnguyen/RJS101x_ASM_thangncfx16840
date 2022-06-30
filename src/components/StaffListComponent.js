import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

//! create Component named StaffList
class StaffList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderStaffCard(staff) {
    return (
      <div key={staff.id} className="col-md-6">
        <Card className='my-1'>
          <CardBody className='p-2'>
            <CardTitle className='mb-0'>{staff.name}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }

  render() {
    const staffList = this.props.staffs.map((staff) => this.renderStaffCard(staff));
    return (
      <div className="container">
        <div className="row">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;
