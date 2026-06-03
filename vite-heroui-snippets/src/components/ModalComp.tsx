import { Modal } from "@heroui/react";

const ModalComp = ({
  children,
  title,
  button_function,
}: {
  children: React.ReactNode;
  title: string;
  button_function: () => void;
}) => {
  return (
    <Modal>
      <button
        onClick={button_function}
        className="btn btn-outline"
      >
        {title}
      </button>
      <Modal.Backdrop>
        <Modal.Container placement="top" size="lg">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <h2>{title}</h2>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default ModalComp;