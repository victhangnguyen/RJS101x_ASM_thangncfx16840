import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { sortBy } from '../utils';
//! imp RTK
import { useDispatch, useSelector } from 'react-redux';
//! Actions
import { getStaffs } from '../redux/features/staff/staffSlice';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

//! presentational function component
function RenderStaff({ staff }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="card-effect my-2 border border-3">
        <Link to={`/staffs/${staff.id}`}>
          <CardHeader className="fw-bold">
            {staff.name} (#{staff.id})
          </CardHeader>
          <CardBody>
            <p>Mã nhân viên: {staff.id}</p>
            <p>Hệ số lương: {staff.salaryScale}</p>
            <p className="m-0">Số ngày làm thêm: {staff.overTime}</p>
          </CardBody>
          <CardFooter>
            <p className="fw-bold">
              Lương:{' '}
              {numberWithCommas(
                parseInt(staff.salaryScale * 3000000 + staff.overTime * 200000)
              )}
            </p>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}

function SalaryComponent() {
  const initilalSetting = {
    sort: 'id-ascending',
  };
  const [setting, setSetting] = React.useState(initilalSetting);
  // const dispatch = useDispatch();

  //! get Staffs Data
  // dispatch(getStaffs());
  const staffs = useSelector((state) => state.staffs);

  //! renderStaff with the Shallow Array (sortBy)
  const staffList =
    staffs &&
    sortBy(staffs, setting.sort).map((staff) => (
      <RenderStaff key={staff.id} staff={staff} />
    ));

  const handleSortChange = function (e) {
    setSetting({
      sort: e.target.value,
    });
  };

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5">
      <div className="bread-crumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="hm-title">
        <div className="row">
          <div className="col-6 col-md-8">
            <h3>Bảng lương</h3>
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
                <option value="salary-ascending">Lương tăng dần (A → Z)</option>
                <option value="salary-descending">
                  Lương giảm dần (Z → A)
                </option>
              </Input>
            </FormGroup>
          </div>
          <hr />
        </div>
      </div>
      <div className="row">{staffList}</div>
    </div>
  );
}

export default SalaryComponent;
