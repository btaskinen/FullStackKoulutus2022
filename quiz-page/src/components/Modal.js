import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="modal">
      <p>{props.modalText}</p>
      <button className="modal-btn" onClick={props.confirmHandler}>
        {props.modalButton}
      </button>
      <button className="modal-btn btn--alt" onClick={props.closeModalHandler}>
        Cancel
      </button>
    </div>
  );
};

export default Modal;
