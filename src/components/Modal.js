import { createPortal } from "react-dom";
import CloseButton from "./CloseButton";

export default function Modal({ open, children, close }) {
  if (!open) return null;
  return createPortal(
    <>
      <div className="modal-backdrop"></div>
      <div className="modal">
        <div className="modal-dialog">
          <div className="w-full bg-white rounded relative px-9 pt-12 pb-9">
            <CloseButton
              close={close}
              className="absolute top-6 right-6 z-10"
            />
            {children}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
