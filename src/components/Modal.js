import { createPortal } from "react-dom";

export default function Modal({ open, children, close }) {
  if (!open) return null;
  return createPortal(
    <>
      <div className="modal-backdrop"></div>
      <div className="modal">
        <div className="modal-dialog">
          <div className="w-full bg-white rounded relative px-9 pt-12 pb-9">
            <button
              onClick={close}
              className="absolute top-6 right-6 z-10 cursor-pointer text-gray-400 hover:text-gray-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {children}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
