import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function apiPinger(props) {
  const [apiIsConnected, setApiIsConnected] = useState(false);
  const intervalId = useRef();

  const testApiConnection = async () => {
    try {
      const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/api/test-api-connection`;

      await axios.get(uri);
      setApiIsConnected(true);
    } catch {
      // empty
    }
  };

  useEffect(() => {
    if (apiIsConnected) return;

    intervalId.current = setInterval(() => {
      testApiConnection();
    }, 500);
  }, []);

  useEffect(() => {
    if (apiIsConnected) {
      clearInterval(intervalId.current);
    }
  }, [apiIsConnected]);

  if (apiIsConnected) {
    return props.children;
  }

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
      <h1>Waking up API...</h1>
      <p>Please wait a few seconds</p>
    </div>
  );
}
