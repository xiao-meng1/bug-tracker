import React from 'react';

export default function ErrorFallback() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        marginTop: '100px',
      }}
    >
      <h1>Something went wrong...</h1>
      <p>Please refresh the page</p>
    </div>
  );
}
