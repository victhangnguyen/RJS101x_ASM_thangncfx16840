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
import Avatar from './AvatarComponent';

//! presentational function Component
function RenderStaff({ entity, currentStaff, handleEdit, handleConfirm }) {

  console.log('%c_RenderStaff currentStaff: ', 'color: green; font-weight: bold', currentStaff); //! __DEBUG
  
  return (
    <Card>
      <CardHeader className="px-3 py-2 d-flex align-items-center justify-content-between">
        <div>Thông tin nhân viên</div>
      </CardHeader>
      <CardBody className="px-3">
        <Row>
          <Col sm={12} md={4} lg={3}>
            <Avatar
              staffsLoading={entity.loading}
              staffsErrMess={entity.errorMessage}
              image={currentStaff?.image}
              name={currentStaff?.name}
            />
          </Col>
          <Col sm={8} md={4} lg={6}>
            <p className="fw-bold">Họ và tên: {currentStaff?.name}</p>
            <p>Ngày sinh: {toVNDate(currentStaff?.doB)}</p>
            <p>Ngày vào công ty: {toVNDate(currentStaff?.startDate)}</p>
            <p>Phòng ban: {currentStaff?.departmentId}</p>
            <p>Số ngày nghỉ còn lại: {currentStaff?.annualLeave}</p>
            <p>Số ngày đã làm thêm: {currentStaff?.overTime}</p>{' '}
          </Col>
          <Col sm={4} md={4} lg={3}>
            {
              //! __btnEdit
            }
            <EditStaffModal
              currentStaff={currentStaff}
              handleEdit={handleEdit}
            />
            {
              //! __btnDelete
            }
            <YesNoModal
              buttonName="Xóa nhân viên"
              buttonColor="danger"
              header="Xoá nhân viên"
              body="Bạn muốn xóa nhân viên này không?"
              entity={currentStaff}
              handleConfirm={handleConfirm}
            />
          </Col>
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

  React.useEffect(() => {

    dispatch(fetchStaffById(params.staffId));
  }, []);

  const staff = useSelector((state) => state.staffs);
  const curStaff = staff.entities[0]
  // const [curStaff, setCurStaff] = React.useState(staff.entities[0]);
  console.log('%c_StaffDetail loding: ', 'color: blue; font-weight: bold', staff.loading); //! __DEBUG
  

  const handleEdit = (staffValues) => {
    dispatch(editStaff(staffValues));
    // setCurStaff(staffValues);
  };

  const handleDelete = (staffId) => {
    if (String(staffId) === String(curStaff.id)) {
      dispatch(deleteStaff(curStaff.id));
      navigate('../', { replace: true });
    }
  };

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/staffs">Nhân viên</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{curStaff?.name}</BreadcrumbItem>
      </Breadcrumb>
      <div className="row">
        <div className="col-12">
          <RenderStaff
            entity={staff}
            currentStaff={curStaff}
            handleEdit={handleEdit}
            handleConfirm={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default StaffDetail;
