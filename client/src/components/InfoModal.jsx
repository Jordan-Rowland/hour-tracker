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
      <p>
        This app is based on the idea introduced by Josh Kaufman in his book, "The First 20 Hours".
        You might even think of this as a to-do list on steroids, a way of tracking tasks that will
        take up to 20 hours to complete.
      </p>
      <p>
        Once you add a task, you can click on the task-name to mark an hour as
        completed. When the maximum amount of hours for a task is reached, the task will automatically
        be removed from your list.
      </p>
      <p>
        Clicking on the hours block allows you to add or subtract several hours at once to make tracking
        progress easier.
      </p>
    </div>
    </div>
  );
}

export default InfoModal;