import { FormEvent, useState } from 'react';
import './App.css';
import { useDictionary } from './hooks/useDictionary';

function App() {
  const [word, setWord] = useState('');
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
    const currentTarget = e.target as HTMLFormElement;
    const input = currentTarget[0] as HTMLInputElement;
    setWord(input.value);

    getDefinitions(input.value);
    getSynonyms(input.value);
    getAntonyms(input.value);
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
        />
        <button type='submit'>Search</button>
      </form>

      {isLoading && (
        <div>
          <h2>ロディングしてます。。。</h2>
        </div>
      )}
      {!isLoading && (
        <>
          <div id='definition'>
            <h1>{word}</h1>
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
                  <li key={syn.word}>{syn.word}</li>
                ))}
              </ul>
            </div>
          )}

          {antonyms.length > 0 && (
            <div id='antonym'>
              <h3>Antonym</h3>
              <ul role='list'>
                {antonyms.map((ant) => (
                  <li key={ant.word}>{ant.word}</li>
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
