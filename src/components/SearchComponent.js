import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Link, useSearchParams } from 'react-router-dom';

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
  // const [staffArr, setStaffArr] = React.useState([]);
  const [staffList, setStaffList] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log('searchParams: ', searchParams.get('keywords')); //! __DEBUG __params
  const keyword = searchParams.get('keyword')?.toLowerCase().replace(/ +/g, '');
  console.log('keyword: ', keyword); //! type: a b c  => abc

  React.useEffect(() => {
    const staffArr = [];

    props.staffs.forEach((staff) => {
      const name = staff.name.toLowerCase().replace(/ +/g, '');
      if (String(staff.id) === keyword || name.indexOf(keyword) !== -1) {
        staffArr.push(staff);
      }
    });
    setStaffList(staffArr);
    //!
    console.log('staffArr: ', staffArr);
  }, [keyword]);

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/staffs">Nhân viên</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Tìm kiếm</BreadcrumbItem>
      </Breadcrumb>
      <div className="hm-title">
        <h3>Tìm kiếm</h3>
        <hr />
      </div>
      <form action="" className="">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Tìm kiếm thông tin nhân viên"
          />
          <button type="submit" className="input-group-text btn-success">
            <i className="bi bi-search me-2"></i> Tìm kiếm
          </button>
        </div>
      </form>
      <div className="row">
        {staffList?.map((staff) => (
          <RenderStaff key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
  );
}

export default Search;
