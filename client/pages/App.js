import React from 'react';
import {Search} from './Search';
import {Nominations} from './Nominations.js'

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
        <Nominations />
      </div>
    </div>
  );
}

export default App;