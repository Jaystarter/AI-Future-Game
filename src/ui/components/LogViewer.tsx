import React, { useState, useEffect } from 'react';

export const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // This is a placeholder. In a real scenario, you'd intercept console.log
    // or use a dedicated logging library.
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const captureLog = (type: string) => (...args: any[]) => {
      setLogs(prevLogs => [...prevLogs, `[${type}] ${args.map(arg => String(arg)).join(' ')}`].slice(-100)); // Keep last 100 logs
      originalLog.apply(console, args);
    };

    console.log = captureLog('LOG');
    console.error = captureLog('ERR');
    console.warn = captureLog('WRN');

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        width: 'calc(100% - 20px)',
        height: '200px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        overflowY: 'scroll',
        padding: '10px',
        boxSizing: 'border-box',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 999,
      }}
    >
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
};
