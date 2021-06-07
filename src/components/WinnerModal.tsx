import React from 'react';
import { Modal, Button, ModalProps } from 'react-bootstrap';

interface Props extends ModalProps {
  winner: number | null;
}

const WinnerModal: React.FC<Props> = ({
  winner, show, onHide, ...props
}) => (
  <Modal onHide={onHide} show={show} {...props}>
    <Modal.Header closeButton>
      <Modal.Title>Congratulations!</Modal.Title>
    </Modal.Header>

    {show && (
      <Modal.Body>
        {winner === null
          ? <p>It look like we have a draw!</p>
          : <p>{`The winner is player ${winner}!`}</p>}
      </Modal.Body>
    )}

    <Modal.Footer>
      <Button onClick={onHide}>Ok</Button>
    </Modal.Footer>
  </Modal>
);

export { WinnerModal };
