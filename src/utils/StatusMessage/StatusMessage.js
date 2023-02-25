import React from 'react';
import './StatusMessage.css';

function StatusMessage({ isActiveMessage, message, requestStatus }) {
  if (requestStatus) {
    return (
      <div className="statusMessage statusMessage-success">
        <div className={`statusMessage__container statusMessage__container_success ${isActiveMessage ? 'statusMessage__container_opened' : ''}`}>
          <p className="statusMessage__text">{message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="statusMessage ">
      <div className={`statusMessage__container statusMessage__container_err ${isActiveMessage ? 'statusMessage__container_opened' : ''}`}>
        <p className="statusMessage__text">{message}</p>
      </div>
    </div>
  );
}

export default StatusMessage;
