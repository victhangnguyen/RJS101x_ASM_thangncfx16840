import React from 'react';
import { Card, CardBody, CardTitle, CardHeader, CardImg } from 'reactstrap';
//! imp Components
import StaffDetail from './StaffDetailComponent';

//! Presentational Function

//! Container Function
function StaffListComponent(props) {
  const [currentStaff, setCurrentStaff] = React.useState(null);

  const onSelectedStaff = function (staffId) {
    setCurrentStaff(staffId);
  };

  const staffList = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-6 col-md-4 col-lg-2">
        <Card
          className={`staff my-2 border border-2 ${
            staff.id === currentStaff ? 'active' : ''
          }`}
          onClick={onSelectedStaff.bind(this, staff.id)}
        >
          <CardHeader className="px-3">ID: {staff.id}</CardHeader>
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
  });

  return (
    <div className="container">
      <div className="row">{staffList}</div>
      {/* <div className="row">
        <StaffDetail
          staff={this.state.selectedStaff}
          column={this.props.column}
        />
      </div> */}
    </div>
  );
}

export default StaffListComponent;
