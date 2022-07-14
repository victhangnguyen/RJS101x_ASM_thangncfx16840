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
//! imp Components
import StaffDetail from './StaffDetailComponent';

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

function sortBy(property, value) {}

//! Container Function
function StaffListComponent(props) {
  const initConfig = {
    sort: 'default',
  };
  const [config, setConfig] = React.useState(initConfig);

  //! init staffList
  // const staffList = React.useRef(null);

  console.log(`context: `, config.sort);
  const newStaffList = props.staffs.sort((a, b) => {
    return b.name - a.name
  });
  console.log('context: ', newStaffList);

  const staffList = props.staffs.map((staff) => (
    <RenderStaff key={staff.id} staff={staff} />
  ));

  // React.useEffect(() => {
  //   console.log(`compDidUpdate: `, config.sort);
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
    setConfig({
      ...config,
      sort: e.target.value,
    });
  };

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5 mx-md-5">
      <div className="row">
        <div className="hm-title col-6 col-md-8">
          <h3>Nhân viên</h3>
        </div>
        <div className="col-6 col-md-4 setting">
          <FormGroup className="d-flex justify-content-center align-items-center mb-0">
            <Label className="m-2" for="exampleSelect">
              Sort:{' '}
            </Label>
            <Input
              value={config.sort}
              id="exampleSelect"
              name="select"
              type="select"
              onChange={(e) => handleSortChange(e)}
            >
              <option value="default">Mặc định</option>
              <option value="ascending">Tăng dần (A → Z)</option>
              <option value="descending">Giảm dần (Z → A)</option>
            </Input>
          </FormGroup>
        </div>
      </div>
      <hr />
      {console.log(`render`)}
      <div className="row">{staffList}</div>
    </div>
  );
}

export default StaffListComponent;
