import { BASE_URL } from './config';

export async function fetchSynonyms(word: string): Promise<Word[]> {
  const url = `${BASE_URL}/words?rel_syn=${word}`;
  const response = await fetch(url);
  const data: Word[] = await response.json();
  return data;
}
