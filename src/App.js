import { observer } from 'mobx-react-lite';
import React from 'react';
import { Status } from './components/Status';
import './App.css';
import { Commands } from './components/Commands';
import { Attempts } from './components/Attempts';
import { MaskedWord } from './components/MaskedWord';
import { Chars } from './components/Chars';

const App = observer(() => {

  return (
    <div className="App">
      <header>
        <h1>Hangman</h1>        
      </header>
      <main>
        <Status />
        <Attempts />
        <MaskedWord />
        <Chars />
        <Commands />
      </main>
    </div>
  );
});

export default App;
