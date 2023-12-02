import { BASE_URL } from './config';

export async function fetchAntonyms(word: string): Promise<Word[]> {
  const url = `${BASE_URL}/words?rel_ant=${word}`;
  const response = await fetch(url);
  const data: Word[] = await response.json();
  return data;
}
