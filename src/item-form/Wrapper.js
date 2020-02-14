import React from 'react';

export function Wrapper(props) {
  return (
    <div style={{
      margin: '10px',
      padding: '20px',
      border: '3px solid #ccc',
    }}>
      {props.children}
    </div>
  );
}