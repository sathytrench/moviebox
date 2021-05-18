import React from 'react';
import { Search } from './Search';
import { Votes } from './Votes.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          welcome to moviebox! 
        </p>
      </header>
      <div className = "content">
        <Search />
        <Votes />
      </div>
    </div>
  );
}

export default App;