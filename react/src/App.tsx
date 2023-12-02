import { FormEvent, useState } from 'react';
import './App.css';
import { useDictionary } from './hooks/useDictionary';

function App() {
  const [word, setWord] = useState('');
  const [currentWord, setCurrentWord] = useState('');

  const {
    isLoading,
    getDefinitions,
    getSynonyms,
    getAntonyms,
    definitions,
    synonyms,
    antonyms,
  } = useDictionary();

  const handleWordSearch = (e: FormEvent) => {
    e.preventDefault();
    setCurrentWord(word);

    getDefinitions(word);
    getSynonyms(word);
    getAntonyms(word);
  };

  const handleWordClick = (word: string) => {
    setWord(word);
    setCurrentWord(word);
    getDefinitions(word);
    getSynonyms(word);
    getAntonyms(word);
  };

  return (
    <>
      <form
        id='form'
        onSubmit={handleWordSearch}>
        <label htmlFor='wordInput'>Word</label>
        <input
          type='text'
          id='wordInput'
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>

      {isLoading ? (
        <div>
          <h2>ロディングしてます。。。</h2>
        </div>
      ) : (
        <>
          <div id='definition'>
            <h1>{currentWord}</h1>
            <ol role='list'>
              {definitions &&
                definitions.map((def, index) => <li key={index}>{def}</li>)}
            </ol>
          </div>

          {synonyms.length > 0 && (
            <div id='synonym'>
              <h3>Synonym</h3>
              <ul role='list'>
                {synonyms.map((syn) => (
                  <li
                    key={syn.word}
                    onClick={() => handleWordClick(syn.word)}>
                    {syn.word}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {antonyms.length > 0 && (
            <div id='antonym'>
              <h3>Antonym</h3>
              <ul role='list'>
                {antonyms.map((ant) => (
                  <li
                    key={ant.word}
                    onClick={() => handleWordClick(ant.word)}>
                    {ant.word}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
