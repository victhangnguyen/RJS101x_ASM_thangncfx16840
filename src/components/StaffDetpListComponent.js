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
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import { sortBy } from '../utils';
//! imp RTK
import { useDispatch, useSelector } from 'react-redux';
//! imp RTK-Actions
import { fetchStaffsByDeptId } from '../redux/features/staff/staffSlice';
import { fetchDepartments } from '../redux/features/department/departmentSlice';
//! imp Components
import { CreateStaffModal } from './Modal';
import Loading from './LoadingComponent';

//! Presentational Function Component
function RenderStaff({ staff }) {
  return (
    <div key={staff.id} className="col-6 col-md-4 col-lg-2">
      <Card className="card-effect my-2 border border-3">
        <Link to={`/staffs/${staff.id}`}>
          <CardHeader>#{staff.id}</CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-12">
                <div className="card-avatar">
                  <img src={staff.image} alt={staff.name} />
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
function StaffDeptListComponent(props) {
  const inputSearch = React.useRef();
  const [keywordSearch, setKeywordSearch] = React.useState(
    inputSearch.current?.value ? inputSearch.current.value : ''
  );
  const params = useParams();
  // console.log('%c_params: ', 'color: brown; font-weight: bold', params); //! __DEBUG

  const dispatch = useDispatch();
  const staffs = useSelector((state) => state.staffs);
  // console.log(
  //   '%c_loading-StaffDept: ',
  //   'color: green; font-weight: bold',
  //   staffs.loading
  // ); //! __DEBUG
  const currentDept = useSelector((state) => state.departments).entities.filter(
    (dept) => dept.id.toLowerCase() === params.deptId.toLowerCase()
  )[0];
  // console.log('%c_currentDept: ', 'color: red; font-weight: bold', currentDept); //! __DEBUG

  const [setting, setSetting] = React.useState({ sort: 'id-ascending' });

  //! componentDidMount
  React.useEffect(() => {
    dispatch(fetchStaffsByDeptId(params.deptId));
    dispatch(fetchDepartments());
  }, []);

  // const staffsList = sortBy(staffs.entities).map((staff) => (
  //   <RenderStaff key={staff.id} staff={staff} />
  // ));
  const staffsList = sortBy(
    //! staffs.entities => thêm 1 lần render
    staffs.entities.filter((staff) => {
      const name = staff?.name.toLowerCase().replace(/ +/g, '');
      return (
        String(staff.id) === keywordSearch ||
        name.indexOf(keywordSearch.toLowerCase()) !== -1
      );
    }),
    setting.sort
  ).map((staff) => <RenderStaff key={staff.id} staff={staff} />);

  const handleSearch = function (e) {
    e.preventDefault();
    setKeywordSearch(inputSearch.current.value);
  };

  const handleSortChange = function (e) {
    //! re-render
    setSetting({
      ...setting,
      sort: e.target.value,
    });
  };

  const handleAddStaff = function (staff) {
    // dispatch(addStaff(staff));
  };

  const render = function () {
    if (staffs.loading === 'pending') {
      return (
        <div className="row">
          <Loading />
        </div>
      );
    } else if (staffs.loading === 'failed') {
      return (
        <div className="row">
          <h3>{staffs.errorMessage}</h3>
        </div>
      );
    } else if (staffs.loading === 'succeeded') {
      return <div className="row">{staffsList}</div>;
    }
  };

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5 mx-md-5">
      <div className="hm-title">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/departments">Phòng ban</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{currentDept?.id}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-6 col-md-8">
            <h3>{`Phòng ${currentDept?.name}`}</h3>
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
      <Form className="my-2">
        <FormGroup>
          <Row>
            <Col className="col-12 col-md-3 my-2">
              {
                //! here CreateStaffModal
              }
              {/* <CreateStaffModal addStaff={handleAddStaff} /> */}
            </Col>
            <Col className="col-9 col-md-5 offset-0 offset-md-2 my-2">
              <Input
                /*
              innerRef is the ref attribute
              */
                innerRef={inputSearch}
                id="search"
                name="search"
                type="text"
                placeholder="Tìm thông tin nhân viên"
              />
            </Col>
            <Button
              className="col-3 col-md-2 my-2"
              color="primary"
              type="button"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Row>
        </FormGroup>
      </Form>
      {render()}
    </div>
  );
}

export default StaffDeptListComponent;
