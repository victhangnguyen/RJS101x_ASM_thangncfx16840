import React from 'react';
import { Modal, ModalBody, ModalHeader, Row, Col, Button } from 'reactstrap';

function YesNoModal({ buttonName, header, body, entity, handleConfirm }) {
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
      <Button className="my-2" onClick={handleToggle}>
        {buttonName}
      </Button>
      <Modal isOpen={isOpenModal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>{header}</ModalHeader>
        <ModalBody>
          <Row>{body}</Row>
          <Row>
            <Col>
              <Button onClick={handleSubmit}>Yes</Button>
              <Button onClick={handleToggle}>No</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default YesNoModal;
