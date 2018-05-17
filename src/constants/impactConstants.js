import React from 'react';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';

export const IMPACTS = {
  POS: 1,
  ZERO: 0,
  NEG: -1,
};

export const impactNames = {
  0: { id: 1, name: <ThumbsUp /> },
  1: { id: 0, name: '0' },
  2: { id: -1, name: <ThumbsDown /> },
};
