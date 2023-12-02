import { useState } from 'react';
import { fetchDefinition } from '../api/fetchDefinition';
import { fetchAntonyms } from '../api/fetchAntonyms';
import { fetchSynonyms } from '../api/fetchSynonyms';

export const useDictionary = () => {
  const [definitions, setDefinitions] = useState<Definition>([]);
  const [synonyms, setSynonyms] = useState<Word[]>([]);
  const [antonyms, setAntonyms] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDefinitions = (word: string) => {
    setIsLoading(true);
    fetchDefinition(word)
      .then(setDefinitions)
      .then(() => setIsLoading(false));
  };
  const getAntonyms = (word: string) => {
    fetchAntonyms(word).then(setAntonyms);
  };
  const getSynonyms = (word: string) => {
    fetchSynonyms(word).then(setSynonyms);
  };

  return {
    isLoading,
    getDefinitions,
    getSynonyms,
    getAntonyms,
    definitions,
    synonyms,
    antonyms,
  };
};
