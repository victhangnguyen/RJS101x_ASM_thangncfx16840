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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { sortBy } from '../utils';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//! imp TRK
import { useDispatch, useSelector } from 'react-redux';
//! imp Actions
import { fetchStaffs } from '../redux/features/staff/staffSlice';

//! Presentational Function Component
function RenderStaff({ staff }) {
  return (
    <div key={staff.id} className="col-6 col-md-4 col-lg-2">
      <Card className="card-staff my-2 border border-3">
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
function StaffListComponent(props) {
  // console.log('context StaffList');
  const inputSearch = React.useRef();
  const dispatch = useDispatch();
  const entitiesStaff = useSelector((state) => state.staffs.entities);

  const [keywordSearch, setKeywordSearch] = React.useState(
    inputSearch.current?.value ? inputSearch.current.value : ''
  );
  const [setting, setSetting] = React.useState({ sort: 'id-ascending' });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      doB: '',
      salaryScale: '',
      startDate: '',
      department: '',
      annualLeave: '',
      overTime: '',
      salary: '',
      image: '/assets/images/alberto.png',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Yêu cầu nhập')
        .min(3, 'Yều cầu nhiều hơn 2 ký tự')
        .max(30, 'Yều cầu ít hơn 30 ký tự'),
      doB: Yup.string().required('Yêu nhập ngày, tháng, năm'),
      startDate: Yup.string().required('Yêu nhập ngày, tháng, năm'),
      department: Yup.string()
        .required('Yêu cầu nhập')
        .min(2, 'Yều cầu nhiều hơn 1 ký tự')
        .max(20, 'Yều cầu ít hơn 20 ký tự'),
      salaryScale: Yup.number()
        // .matches(/^[0-9]+$/, 'Chỉ nhận số từ 0 tới 9')
        .required('Yêu cầu nhập')
        .min(0.1, 'Yều cầu lớn hơn 0')
        .max(5, 'Yều cầu nhỏ hơn 5'),
      annualLeave: Yup.number()
        .required('Yêu cầu nhập')
        .max(30, 'Yều cầu nhỏ hơn số 30'),
      overTime: Yup.number()
        .required('Yêu cầu nhập')
        .max(30, 'Yều cầu nhỏ hơn số 30'),
    }),
    onSubmit: (values) => {
      // console.log('handleSubmit');
      if (formik.isValid && formik.dirty) {
        // dispatch(postStaff(formik.values));
      }
      formik.resetForm();
      toggleModal();
    },
  });

  //! componentDidMount
  React.useEffect(() => {
    dispatch(fetchStaffs());
  }, []);

  const staffsList = sortBy(
    //! staffs.entities => thêm 1 lần render
    entitiesStaff.filter((staff) => {
      const name = staff.name.toLowerCase().replace(/ +/g, '');
      return (
        String(staff.id) === keywordSearch ||
        name.indexOf(keywordSearch.toLowerCase()) !== -1
      );
    }),
    setting.sort
  ).map((staff) => <RenderStaff key={staff.id} staff={staff} />);

  console.log(
    '%c_var-staffsList: ',
    'color: blue; font-weight: bold',
    staffsList
  ); //! __DEBUG

  const handleSearch = function (e) {
    e.preventDefault();
    console.log('handleSearch');
    setKeywordSearch(inputSearch.current.value);
  };

  const handleSortChange = function (e) {
    //! re-render
    setSetting({
      ...setting,
      sort: e.target.value,
    });
  };

  const handleCancel = function () {
    formik.resetForm();
    toggleModal();
  };

  const toggleModal = function () {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container-fuild my-2 my-md-3 mx-3 mx-md-5 mx-md-5">
      <Modal isOpen={isModalOpen} toggle={toggleModal} {...props}>
        <Form onSubmit={formik.handleSubmit}>
          <ModalHeader toggle={toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody className="px-5">
            {
              //! __name
            }
            <FormGroup row>
              <Label htmlFor="name">Tên</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Tên nhân viên"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                valid={formik.touched.name && formik.errors.name === undefined}
                invalid={
                  formik.touched.name && formik.errors.name !== undefined
                }
              />
              {formik.touched.name && formik.errors.name ? (
                <FormFeedback>{formik.errors.name}</FormFeedback>
              ) : null}
            </FormGroup>
            {
              //! __doB
            }
            <FormGroup row>
              <Label htmlFor="doB">Ngày sinh</Label>
              <Input
                id="doB"
                name="doB"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.doB}
                valid={formik.touched.doB && formik.errors.doB === undefined}
                invalid={formik.touched.doB && formik.errors.doB !== undefined}
              />
              {formik.touched.doB && formik.errors.doB ? (
                <FormFeedback>{formik.errors.doB}</FormFeedback>
              ) : null}
            </FormGroup>
            {
              //! __startDate
            }
            <FormGroup row>
              <Label htmlFor="startDate">Ngày vào công ty</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
                valid={
                  formik.touched.startDate &&
                  formik.errors.startDate === undefined
                }
                invalid={
                  formik.touched.startDate &&
                  formik.errors.startDate !== undefined
                }
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <FormFeedback>{formik.errors.startDate}</FormFeedback>
              ) : null}
            </FormGroup>
            {
              //! __department
            }
            <FormGroup row>
              <Label htmlFor="department">Phòng ban</Label>
              <Input
                id="department"
                name="department"
                type="text"
                placeholder="Tên phòng ban"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.department}
                valid={
                  formik.touched.department &&
                  formik.errors.department === undefined
                }
                invalid={
                  formik.touched.department &&
                  formik.errors.department !== undefined
                }
              />
              {formik.touched.department && formik.errors.department ? (
                <FormFeedback>{formik.errors.department}</FormFeedback>
              ) : null}
            </FormGroup>
            {
              //! __salaryScale
            }
            <FormGroup row>
              <Label htmlFor="salaryScale">Hệ số lương</Label>
              <Input
                id="salaryScale"
                name="salaryScale"
                type="number"
                placeholder="Hệ số lương"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salaryScale}
                valid={
                  formik.touched.salaryScale &&
                  formik.errors.salaryScale === undefined
                }
                invalid={
                  formik.touched.salaryScale &&
                  formik.errors.salaryScale !== undefined
                }
              />
              {formik.touched.salaryScale && formik.errors.salaryScale ? (
                <FormFeedback>{formik.errors.salaryScale}</FormFeedback>
              ) : null}
            </FormGroup>
            {
              //! annualLeave
            }
            <FormGroup row>
              <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
              <Input
                id="annualLeave"
                name="annualLeave"
                type="number"
                placeholder="Số ngày nghỉ còn lại"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.annualLeave}
                valid={
                  formik.touched.annualLeave &&
                  formik.errors.annualLeave === undefined
                }
                invalid={
                  formik.touched.annualLeave &&
                  formik.errors.annualLeave !== undefined
                }
              />
              {formik.touched.annualLeave && formik.errors.annualLeave ? (
                <FormFeedback>{formik.errors.annualLeave}</FormFeedback>
              ) : null}
            </FormGroup>
            {
              //! overTime
            }
            <FormGroup row>
              <Label htmlFor="overTime">Số ngày nghỉ còn lại</Label>
              <Input
                id="overTime"
                name="overTime"
                type="number"
                placeholder="Số ngày nghỉ còn lại"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.overTime}
                valid={
                  formik.touched.overTime &&
                  formik.errors.overTime === undefined
                }
                invalid={
                  formik.touched.overTime &&
                  formik.errors.overTime !== undefined
                }
              />
              {formik.touched.overTime && formik.errors.overTime ? (
                <FormFeedback>{formik.errors.overTime}</FormFeedback>
              ) : null}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              // disabled={!(formik.isValid && formik.dirty)}
            >
              Thêm
            </Button>
            <Button color="secondary" onClick={handleCancel}>
              Hủy
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

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
      <Form className="my-2">
        <FormGroup>
          <Row>
            <Col className="col-12 col-md-3 my-2">
              <Button type="button" color="danger" onClick={toggleModal}>
                Thêm nhân viên
              </Button>
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

      <div className="row">{staffsList}</div>
    </div>
  );
}

export default StaffListComponent;
