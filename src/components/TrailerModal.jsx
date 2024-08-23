import React from 'react'
import PropTypes from 'prop-types';
import YouTubePlayer from 'react-player/youtube';
import TrailerContent from './TrailerContent';


export default function TrailerModal({isOpen, closeModal, videoKey}) {
    if (!isOpen) return null;
  return (
    <div className='modal-overlay' onClick={closeModal}>
        <div 
          className="modal-content"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
        >
        <div> 
         <button 
            className="close-button" 
            onClick={closeModal}>
           &times;
         </button>

        </div>
       
        <TrailerContent videoKey={videoKey}/>
        </div>
    </div>
  );
};

TrailerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    videoKey: PropTypes.string,
}
