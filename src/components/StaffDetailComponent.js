import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
} from 'reactstrap';
import { toVNDate } from '../utils';
import { useParams, useNavigate, Link } from 'react-router-dom';
//! imp RTK
import { useDispatch, useSelector } from 'react-redux';
//! imp RTK-Actions
import { fetchStaffById } from '../redux/features/staff/staffSlice';
import { editStaff, deleteStaff } from '../redux/features/staff/staffSlice';
//! imp Component
import { EditStaffModal, YesNoModal } from './Modal';

//! presentational function Component
function RenderStaff({ staff, handleEdit, handleConfirm }) {
  return (
    <Card>
      <CardHeader className="px-3 py-2 d-flex align-items-center justify-content-between">
        <div>Thông tin nhân viên</div>
      </CardHeader>
      <CardBody className="px-3">
        <Row>
          <Col sm={12} md={4} lg={3}>
            <div className="card-avatar">
              <img src={staff?.image} alt={staff.name} />
            </div>
          </Col>
          <Col sm={8} md={4} lg={6}>
            <p className="fw-bold">Họ và tên: {staff?.name}</p>
            <p>Ngày sinh: {toVNDate(staff?.doB)}</p>
            <p>Ngày vào công ty: {toVNDate(staff?.startDate)}</p>
            <p>Phòng ban: {staff?.departmentId}</p>
            <p>Số ngày nghỉ còn lại: {staff?.annualLeave}</p>
            <p>Số ngày đã làm thêm: {staff?.overTime}</p>{' '}
          </Col>
          <Col sm={4} md={4} lg={3}>
            {
              //! __btnEdit
            }
            <EditStaffModal currentStaff={staff} handleEdit={handleEdit} />
            {
              //! __btnDelete
            }
            <YesNoModal
              buttonName="Xóa nhân viên"
              header="Xoá nhân viên"
              body="Bạn muốn xóa nhân viên này không?"
              entity={staff}
              handleConfirm={handleConfirm}
            />
          </Col>
          {/* <div className="col-12 col-md-4 col-lg-3"></div>
          <div className="col-12 col-md-8 col-lg-9"></div> */}
        </Row>
      </CardBody>
    </Card>
  );
}

//! Presentational Component
function StaffDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const staff = useSelector((state) => state.staffs);
  const currentStaff = staff.entities[0];

  React.useEffect(() => {
    dispatch(fetchStaffById(params.staffId));
  }, []);
  // console.log('%c_loadingStaffDetail: ', 'color: blue; font-weight: bold', staff.loading); //! __DEBUG

  // console.log(
  //   '%c_Render Staff Detail: ',
  //   'color: green; font-weight: bold',
  //   currentStaff
  // ); //! __DEBUG

  const handleEdit = (staffValues) => {
    dispatch(editStaff(staffValues));
  };

  const handleDelete = (staffId) => {
    if (staffId === currentStaff.id) {
      dispatch(deleteStaff(currentStaff.id));
      // console.log('%c_Hello: ', 'color: red; font-weight: bold', staffId); //! __DEBUG
      navigate('../staffs', { replace: true });
    }
  };
  //! guard clause
  if (!currentStaff) return <></>;

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/staffs">Nhân viên</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{currentStaff?.name}</BreadcrumbItem>
      </Breadcrumb>
      <div className="row">
        <div className="col-12">
          <RenderStaff
            staff={currentStaff}
            handleEdit={handleEdit}
            handleConfirm={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default StaffDetail;
