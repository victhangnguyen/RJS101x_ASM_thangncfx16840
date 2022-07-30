import React from 'react';
import { Modal, ModalBody, ModalHeader, Row, Col, Button } from 'reactstrap';

function YesNoModal({
  buttonName,
  buttonColor,
  header,
  body,
  entity,
  handleConfirm,
}) {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const handleToggle = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSubmit = () => {
    handleConfirm(entity.id);
    handleToggle();
  };

  return (
    <div>
      <Button color={buttonColor} className="my-2" onClick={handleToggle}>
        {buttonName}
      </Button>
      <Modal isOpen={isOpenModal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>{header}</ModalHeader>
        <ModalBody>
          <Row><Col className='p-3 pb-5'>{body}</Col></Row>
          <Row>
            <Col className='d-flex justify-content-center'>
              <Button className='mx-5' onClick={handleSubmit}>Yes</Button>
              <Button className='mx-5' onClick={handleToggle}>No</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default YesNoModal;
