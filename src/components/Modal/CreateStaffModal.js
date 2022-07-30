import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
} from 'reactstrap';

//! imp formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CreateStaffModal({ addStaff }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      doB: '',
      salaryScale: '',
      startDate: '',
      departmentId: '',
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
      departmentId: Yup.string()
        .required('Yêu cầu chọn phòng ban')
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
      if (formik.isValid && formik.dirty) {
        addStaff(values);
      }
      formik.resetForm();
      toggleModal();
    },
  });

  const handleCancel = function () {
    formik.resetForm();
    toggleModal();
  };

  const toggleModal = function () {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Button
        className="my-2"
        type="button"
        color="danger"
        onClick={toggleModal}
      >
        Thêm nhân viên
      </Button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
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
              //! __departmentId
            }
            <FormGroup row>
              <Label htmlFor="departmentId">Phòng ban</Label>
              <Input
                id="departmentId"
                name="departmentId"
                type="select"
                placeholder="Tên phòng ban"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.departmentId}
                valid={
                  formik.touched.departmentId &&
                  formik.errors.departmentId === undefined
                }
                invalid={
                  formik.touched.departmentId &&
                  formik.errors.departmentId !== undefined
                }
              >
                <option value="">Chọn phòng ban</option>
                <option value="Dept01">#Dept01 - Sale </option>
                <option value="Dept02">#Dept02 - HR </option>
                <option value="Dept03">#Dept03 - Marketing </option>
                <option value="Dept04">#Dept04 - IT</option>
                <option value="Dept05">#Dept05 - Finance</option>
              </Input>
              {formik.touched.departmentId && formik.errors.departmentId ? (
                <FormFeedback>{formik.errors.departmentId}</FormFeedback>
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
    </div>
  );
}

export default CreateStaffModal;
