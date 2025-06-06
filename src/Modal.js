import React from "react";
// import  ReactDOM from 'react';
// import { ReactPortal } from 'react';
import { createPortal } from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(34,34,34)",
  transform: "translate(-50%,-50%)",
  zIndex: 100,
  height: "90%",
  width: "90%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 100,
};

export default function Modal({ children, onClose }) {
  return createPortal(
    <div style={OVERLAY_STYLES}>
      <div style={MODAL_STYLES}>
        <button className="" style={{ marginLeft: "96%", marginTop: "-35%" }} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("cart-root"),
  );
}
