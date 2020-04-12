import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const exportScheme = () => {
    axios('/api/Excel', {
      responseType: 'blob',
    })
      .then((res) => {
        console.log('res:', res);
        const blob = new Blob([res.data], {
          type: res.data.type,
        });
        const fileName = 'xxx.xlsx';
        const linkNode = document.createElement('a');

        linkNode.download = fileName;
        linkNode.style.display = 'none';
        linkNode.href = URL.createObjectURL(blob);
        document.body.appendChild(linkNode);
        linkNode.click();

        URL.revokeObjectURL(linkNode.href);
        document.body.removeChild(linkNode);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };
  return (
    <div className="App">
      <button onClick={exportScheme}>导出</button>
    </div>
  );
}

export default App;
