import React from 'react';

function AvatarComponent({ staffsLoading, staffsErrMess, image, name }) {

  return (
    <div className="card-avatar-container">
      <div className="card-avatar">
        {staffsLoading === 'pending' ? (
          <div className="card-avatar-center">
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : staffsLoading === 'failed' ? (
          <h3 className="card-avatar-center">{staffsErrMess}</h3>
        ) : (
          <></>
        )}

        {staffsLoading !== 'succeeded' ? (
          <img src="/assets/images/avatar-loading.png" alt="image-loading" />
        ) : (
          <img src={image} alt={name} />
        )}
      </div>
    </div>
  );
}

export default AvatarComponent;
