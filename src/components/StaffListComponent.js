import React from 'react';
import { Card, CardBody, CardTitle, CardHeader, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
//! imp Components
import StaffDetail from './StaffDetailComponent';

//! Presentational Function

//! Container Function
function StaffListComponent(props) {
  // const [selectedStaff, setSelectedStaff] = React.useState(null);

  // const onSelectedStaff = function (staffId) {
  //   setSelectedStaff(staffId);
  // };

  const staffList = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-6 col-md-4 col-lg-2">
        <Card
          className="card-staff my-2 border border-2"
          // onClick={onSelectedStaff.bind(this, staff.id)}
        >
          <Link to={`/staffs/${staff.id}`}>
            <CardHeader>#{staff.id}</CardHeader>
            <CardBody>
              <div className="row">
                <div className="col-12">
                  <div className="card-avatar">
                    <img src="assets/images/avatar.png" alt="" />
                  </div>
                </div>
                <div className="col-12">
                  <CardTitle className="fw-bold mb-0">{staff.name}</CardTitle>
                </div>
              </div>
            </CardBody>
          </Link>
        </Card>
      </div>
    );
  });

  return (
    <div className="container-fuild my-3 mx-5">
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
