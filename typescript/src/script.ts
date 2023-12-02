const BASE_URL: string = 'https://api.datamuse.com';

const $ = function (id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
};

type Word = {
  score: number;
  word: string;
};

type Definition = Word & { defs: string[] };

async function fetchDefinition(word: string): Promise<Definition[]> {
  const url = `${BASE_URL}/words?sp=${word}&md=d`;
  const response = await fetch(url);
  const data: Definition[] = await response.json();
  return data;
}

async function fetchSynonymOrAntonym(
  word: string,
  type: string
): Promise<Word[]> {
  const url = `${BASE_URL}/words?${type}=${word}`;
  const response = await fetch(url);
  const data: Word[] = await response.json();
  return data;
}

function getSynonymOrAntonym(arr: Word[], id: string): void {
  const div = $(id);
  const ulElement = div.children[1];
  ulElement.innerHTML = '';
  div.classList.remove('hidden');

  if (arr.length === 0) {
    div.classList.add('hidden');
  }

  for (const data of arr) {
    const li = document.createElement('li');
    li.addEventListener('click', handleWordClick);
    li.innerText = data.word;
    ulElement.appendChild(li);
  }
}

function fetchWordData(word: string): void {
  const definition = $('definition');

  fetchDefinition(word).then((defs: Definition[]) => {
    const olElement = definition.children[1] as HTMLOListElement;
    olElement.innerHTML = '';

    const defList = defs[0]['defs'];
    for (const def of defList) {
      const li = document.createElement('li');
      li.innerText = def;
      olElement.appendChild(li);
    }
  });

  fetchSynonymOrAntonym(word, 'rel_syn').then((syns: Word[]) =>
    getSynonymOrAntonym(syns, 'synonym')
  );
  fetchSynonymOrAntonym(word, 'rel_ant').then((ants: Word[]) =>
    getSynonymOrAntonym(ants, 'antonym')
  );
}

function handleWordClick(e: Event): void {
  const element = e.target as HTMLElement;
  const word = element.innerText;

  const definition = $('definition');
  const headingElement = definition.children[0] as HTMLHeadElement;
  headingElement.innerText = word;

  const textField = $('wordInput') as HTMLInputElement;
  textField.value = word;

  fetchWordData(word);
}

function handleWordSearch(e: Event): void {
  e.preventDefault();
  const element = e.target as HTMLFormElement;
  const word = (element[0] as HTMLInputElement).value;

  const definition = $('definition');
  const headingElement = definition.children[0] as HTMLElement;
  headingElement.innerText = word;

  fetchWordData(word);
}

const form = $('form') as HTMLFormElement;
form.addEventListener('submit', handleWordSearch);
