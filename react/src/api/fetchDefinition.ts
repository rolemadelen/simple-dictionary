import { BASE_URL } from './config';

export const fetchDefinition = async (
  targetWord: string
): Promise<Definition> => {
  const url = `${BASE_URL}/words?sp=${targetWord}&md=d`;
  const response = await fetch(url);
  const data: (Word & { defs: string[] })[] = await response.json();
  return data[0]['defs'];
};
