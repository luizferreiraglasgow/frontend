import React from 'react';

const Excerpt = ({ text }) => {
  // Check if the text length is greater than 50 characters
  if (text.length > 50) {
    // If yes, truncate the text and add '...' after the first 50 characters
    const truncatedText = text.slice(0, 50) + '...';
    return <span>{truncatedText}</span>;
  } else {
    // If not, return the original text
    return <span>{text}</span>;
  }
};

export default Excerpt;
