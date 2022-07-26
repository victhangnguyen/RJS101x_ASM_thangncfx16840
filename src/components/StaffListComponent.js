import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from 'reactstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { sortBy } from '../utils';
//! imp TRK
import { useDispatch, useSelector } from 'react-redux';
//! imp Actions
import { getStaffs } from '../redux/features/staffs/staffsSlice';

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
function StaffListComponent() {
  // console.log('context StaffList');
  const initialSetting = {
    sort: 'id-ascending',
  };

  const [setting, setSetting] = React.useState(initialSetting);
  const [staffList, setStaffList] = React.useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  // console.log('searchParams: ', searchParams.get('keywords')); //! __DEBUG __params
  const keyword = searchParams.get('keyword')?.toLowerCase().replace(/ +/g, '');

  const dispatch = useDispatch();
  dispatch(getStaffs());
  const staffs = useSelector((state) => state.staffs);
  console.log('staffs - StaffListComponent: ', staffs);
  console.log('staffs - renderedStaffs: ', staffList);
  /*
  Sử dụng chức năng tìm kiếm nhân viên bằng tên nhân viên thành công sử dụng Uncontrolled Form.
  */
  const inputSearch = React.useRef();
  console.log('inputSearch.current: ', inputSearch.current); //! __DEBUG __inputSearch

  //! Effect with [staffs]
  React.useEffect(() => {
    console.log('%cstaffs data render', 'color: red; font-weight: bold');
    setStaffList(staffs);
  }, [dispatch, staffs]);

  // render <Presentational Staff>
  let renderStaffList =
    staffList &&
    sortBy(staffList, setting.sort).map((staff) => (
      <RenderStaff key={staff.id} staff={staff} />
    ));

  const handleSearch = function (e) {
    console.log('handleSearch');
    e.preventDefault();
    // alert('A name was submitted: ' + inputSearch.current?.value);
    const filteredStaff = sortBy(
      staffs.filter((staff) => {
        if (!inputSearch.current) return true;
        const name = staff.name.toLowerCase().replace(/ +/g, '');
        return (
          String(staff.id) === inputSearch.current.value ||
          name.indexOf(inputSearch.current.value) !== -1
        );
      }),
      setting.sort
    );
    setStaffList(filteredStaff);
  };

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
      <Form className="my-2" onSubmit={handleSearch}>
        <FormGroup>
          <Row>
            <Col className="col-10">
              <Input
                /*
                innerRef is the ref attribute
                */
                innerRef={inputSearch}
                id="search"
                name="search"
                type="search"
                placeholder="Tìm thông tin nhân viên"
              />
            </Col>
            <Button type="submit" className="col-2" color="primary">
              Tìm kiếm
            </Button>
          </Row>
        </FormGroup>
      </Form>

      <div className="row">{renderStaffList}</div>
    </div>
  );
}

export default StaffListComponent;
