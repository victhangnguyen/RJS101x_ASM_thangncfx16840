import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// //! imp formik
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Yêu cầu nhập')
    .min(3, 'Yều cầu nhiều hơn 2 ký tự')
    .max(30, 'Yều cầu ít hơn 30 ký tự'),
  // doB: Yup.date().required('Yêu nhập ngày, tháng, năm'),
  // startDate: Yup.date().required('Yêu nhập ngày, tháng, năm'),
  departmentId: Yup.string()
    .required('Yêu cầu chọn phòng ban')
    .min(2, 'Yều cầu nhiều hơn 1 ký tự')
    .max(20, 'Yều cầu ít hơn 20 ký tự'),
  salaryScale: Yup.number()
    .required('Yêu cầu nhập')
    .min(0.1, 'Yều cầu lớn hơn 0')
    .max(5, 'Yều cầu nhỏ hơn 5'),
  annualLeave: Yup.number()
    .required('Yêu cầu nhập')
    .max(30, 'Yều cầu nhỏ hơn số 30'),
  overTime: Yup.number()
    .required('Yêu cầu nhập')
    .max(30, 'Yều cầu nhỏ hơn số 30'),
});
// .required();

function EditStaffModal({ currentStaff, handleEdit }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const handleCancel = function () {
    // formik.resetForm();
    toggleModal();
  };

  const toggleModal = function () {
    setIsModalOpen(!isModalOpen);
  };

  // React.useEffect(() => {
  //   if (currentStaff) {
  //     console.log('ren');
  //     reset({ name: 'hello' }, { doB: currentStaff.doB });
  //   }
  // }, []);

  return (
    <div>
      <Button
        className="my-2"
        type="button"
        color="warning"
        onClick={toggleModal}
      >
        Thay đổi thông tin
      </Button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <Form
          noValidate
          onSubmit={handleSubmit((data) => {
            // console.log('%c_data: ', 'color: red; font-weight: bold', data); //! __DEBUG
            data.id = currentStaff?.id;
            handleEdit(data);
            toggleModal();
          })}
        >
          <ModalHeader toggle={toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody className="px-5">
            {
              //! __name
            }
            <FormGroup row>
              <Label htmlFor="name">Tên</Label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Tên nhân viên"
                defaultValue={currentStaff?.name}
                {...register('name', { required: true })}
              />
              {errors.name && (
                <p className="feedback">{errors.name?.message}</p>
              )}
            </FormGroup>
            {
              //! __doB
            }
            <FormGroup row>
              <Label htmlFor="doB">Ngày sinh</Label>
              <Controller
                control={control}
                name="doB"
                render={({ field }) => (
                  <DatePicker
                    id="doB"
                    className="form-control"
                    placeholderText="Chọn ngày sinh"
                    onChange={(date) => field.onChange(date)}
                    selected={
                      field.value ? field.value : new Date(currentStaff?.doB)
                    }
                  />
                )}
              />
              {errors.doB && <p className="feedback">{errors.doB?.message}</p>}
            </FormGroup>
            {
              //! __startDate
            }
            <FormGroup row>
              <Label htmlFor="startDate">Ngày vào công ty</Label>

              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    id="startDate"
                    className="form-control"
                    placeholderText="Select ngày vào công ty"
                    onChange={(date) => field.onChange(date)}
                    selected={
                      field.value
                        ? field.value
                        : new Date(currentStaff?.startDate)
                    }
                  />
                )}
              />
              {errors.startDate && (
                <p className="feedback">{errors.startDate?.message}</p>
              )}
            </FormGroup>
            {
              //! __departmentId
            }
            <FormGroup row>
              <Label htmlFor="departmentId">Phòng ban</Label>
              <select
                id="departmentId"
                name="departmentId"
                type="select"
                className="form-control"
                placeholder="Tên phòng ban"
                defaultValue={currentStaff?.departmentId}
                {...register('departmentId')}
              >
                <option value="">Chọn phòng ban</option>
                <option value="Dept01">#Dept01 - Sale </option>
                <option value="Dept02">#Dept02 - HR </option>
                <option value="Dept03">#Dept03 - Marketing </option>
                <option value="Dept04">#Dept04 - IT</option>
                <option value="Dept05">#Dept05 - Finance</option>
              </select>
              {errors.departmentId && (
                <p className="feedback">{errors.departmentId?.message}</p>
              )}
            </FormGroup>
            {
              //! __salaryScale
            }
            <FormGroup row>
              <Label htmlFor="salaryScale">Hệ số lương</Label>
              <input
                id="salaryScale"
                name="salaryScale"
                type="number"
                className="form-control"
                placeholder="Hệ số lương"
                {...register('salaryScale')}
                defaultValue={currentStaff?.salaryScale}
              />
            </FormGroup>
            {
              //! annualLeave
            }
            <FormGroup row>
              <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
              <input
                id="annualLeave"
                name="annualLeave"
                type="number"
                className="form-control"
                placeholder="Số ngày nghỉ còn lại"
                {...register('annualLeave')}
                defaultValue={currentStaff?.annualLeave}
              />
            </FormGroup>
            {
              //! overTime
            }
            <FormGroup row>
              <Label htmlFor="overTime">Số ngày nghỉ còn lại</Label>
              <input
                id="overTime"
                name="overTime"
                type="number"
                className="form-control"
                placeholder="Số ngày nghỉ còn lại"
                {...register('overTime')}
                defaultValue={currentStaff?.overTime}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Thay đổi
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
export default EditStaffModal;
