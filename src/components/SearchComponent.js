import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { useNavigateSearch } from '../hooks';
import { Link, useSearchParams } from 'react-router-dom';
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

//! container component
function Search(props) {
  //! init Values
  const initialInputValues = {
    search: '',
  };
  const initialSetting = {
    sort: 'id-ascending',
  };
  const [setting, setSeting] = React.useState(initialSetting);
  const [inputValues, setInputValues] = React.useState(initialInputValues);
  // const [staffList, setStaffList] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log('searchParams: ', searchParams.get('keywords')); //! __DEBUG __params
  const keyword = searchParams.get('keyword')?.toLowerCase().replace(/ +/g, '');
  // console.log('keyword: ', keyword); //! type: a b c  => abc

  const navigateSearch = useNavigateSearch();

  //! Re-render context
  const staffList = sortBy(
    props.staffs.filter((staff) => {
      const name = staff.name.toLowerCase().replace(/ +/g, '');
      return String(staff.id) === keyword || name.indexOf(keyword) !== -1;
    }),
    setting.sort
  ).map((staff) => <RenderStaff key={staff.id} staff={staff} />);

  const handleChange = function (e) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`handleSearchSubmit`);

    navigateSearch('/search', {
      keyword: inputValues.search.trim().replace(/  +/g, ' '),
    });
  };

  const handleSortChange = function (e) {
    setSeting({
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
          <BreadcrumbItem active>Tìm kiếm</BreadcrumbItem>
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
              </Input>
            </FormGroup>
          </div>
          <hr />
        </div>
      </div>
      <div className="row">
        <form className="p-3" onSubmit={(e) => handleSearchSubmit(e)}>
          <div className="input-group mb-3">
            <input
              name="search"
              value={inputValues.search}
              type="text"
              className="form-control form-control-lg"
              placeholder="Tìm kiếm thông tin nhân viên"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit" className="input-group-text btn-success">
              <i className="fa fa-search"> Tìm kiếm</i>
            </button>
          </div>
        </form>
      </div>
      <div className="row">
        {/* {staffList?.map((staff) => (
          <RenderStaff key={staff.id} staff={staff} />
        ))} */}
        {staffList}
      </div>
    </div>
  );
}

export default Search;
