import { createPortal } from "react-dom";

const Modal = ({ onClose, children }) => {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
