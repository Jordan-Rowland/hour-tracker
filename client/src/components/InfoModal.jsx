import React from "react";
import "../styles/InfoModal.css";


function InfoModal(props) {

  function dispatchCloseModal() {
    props.onCloseModal()
  }

  return(
    <div className="modal-component">
    <div className="modal-backdrop" onClick={dispatchCloseModal}></div>
    <div className="info-modal">
      <div className="exit-modal">
        <span className="exit-icon" onClick={dispatchCloseModal}>✖</span>
      </div>
      <h2>What is this?</h2>
      <hr/>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quam tempora suscipit similique saepe rerum, odio, tenetur nobis numquam libero quas eaque. Aliquam cum, deserunt sint cumque quas officiis iusto?
    </div>
    </div>
  );
}

export default InfoModal;