import React from 'react';
import PropTypes from 'prop-types';
import YouTubePlayer from 'react-player/youtube';

const TrailerContent = ({ videoKey }) => {
  const videoUrl = videoKey ? `https://www.youtube.com/watch?v=${videoKey}` : null;
  return videoUrl ? (
    <YouTubePlayer url={videoUrl} />
  ) : (
    <div className="generalPadding">
      <h6 className='no-trailer'>No trailer available. Try another movie.</h6>
    </div>
  );
};

TrailerContent.propTypes = {
  videoKey: PropTypes.string,
};

export default TrailerContent;
