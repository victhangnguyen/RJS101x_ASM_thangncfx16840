import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { sortBy } from '../utils';

//! Presentational Function Component
function RenderStaff({ staff }) {
  return (
    <div key={staff.id} className="col-6 col-md-4 col-lg-2">
      <Card
        className="card-staff my-2 border border-3"
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
}

//! Container Function
function StaffListComponent(props) {
  // console.log(`context StaffList`);
  const initialSetting = {
    sort: 'id-ascending',
  };

  const [setting, setSetting] = React.useState(initialSetting);

  //! setting State change => re-render
  const staffList = sortBy(props.staffs, setting.sort).map((staff) => (
    <RenderStaff key={staff.id} staff={staff} />
  ));

  // React.useEffect(() => {
  //   console.log(`compDidUpdate: `, setting.sort);
  //   return () => {
  //     staffList.current = props.staffs.map((staff) => (
  //       <RenderStaff key={staff.id} staff={staff} />
  //     ));
  //     //! unmount
  //     console.log(`Unmount: `, staffList.current);
  //   };
  // }, []);

  const handleSortChange = function (e) {
    // console.log(e.target.value);
    //! re-render
    setSetting({
      ...setting,
      sort: e.target.value,
    });
  };

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5 mx-md-5">
      <div className="hm-title">
        <div className="row">
          <div className="col-6 col-md-8">
            <h3>Nhân viên</h3>
          </div>
          <div className="col-6 col-md-4">
            <FormGroup className="d-flex justify-content-center align-items-center">
              <Label className="m-2" for="exampleSelect">
                Sort:
              </Label>
              <Input
                value={setting.sort}
                id="exampleSelect"
                name="select"
                type="select"
                onChange={(e) => handleSortChange(e)}
              >
                <option value="id-ascending">Index tăng dần (A → Z)</option>
                <option value="id-descending">Index giảm dần (Z → A)</option>
                <option value="name-ascending">Tên tăng dần (A → Z)</option>
                <option value="name-descending">Tên giảm dần (Z → A)</option>
              </Input>
            </FormGroup>
          </div>
          <hr />
        </div>
      </div>
      {/* {console.log(`render`)} */}
      <div className="row">{staffList}</div>
    </div>
  );
}

export default StaffListComponent;
