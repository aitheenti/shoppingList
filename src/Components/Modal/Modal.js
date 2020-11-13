import React from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
	top: "50%",
	left: "50%",
	backgroundColor: "rgb(255, 255, 255)",
	padding: "50px",
	zIndex: "1000px",
	boxShadow: "0 0 10px rgba(0,0,0.87)",
	width: "500px",
	transform: "translate(-50%, -50%)",
	position: "absolute",
	height: "535px",
};

const OVERLAY_STYLES = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0, 0, 0, .7)",
	zIndex: 1000,
	overflowY: "scroll",
};

function Modal({ children, open, onClose }) {
	if (!open) return null;

	return ReactDom.createPortal(
		<>
			<div style={OVERLAY_STYLES}>
				<div style={MODAL_STYLES}>
					<div onClick={onClose}>X</div>
					{children}
				</div>
			</div>
		</>,
		document.getElementById("portal")
	);
}

export default Modal;
