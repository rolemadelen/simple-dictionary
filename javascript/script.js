const BASE_URL = 'https://api.datamuse.com';

async function fetchDefinition(word) {
  const url = `${BASE_URL}/words?sp=${word}&md=d`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0]['defs'].slice(0, 5);
}

async function fetchSynonymOrAntonym(word, type) {
  const url = `${BASE_URL}/words?${type}=${word}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function getSynonymOrAntonym(arr, id) {
  const div = document.getElementById(id);
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

function fetchWordData(word) {
  const definition = document.getElementById('definition');

  fetchDefinition(word).then((defs) => {
    const olElement = definition.children[1];
    olElement.innerHTML = '';

    for (const def of defs) {
      const li = document.createElement('li');
      li.innerText = def;
      olElement.appendChild(li);
    }
  });

  fetchSynonymOrAntonym(word, 'rel_syn').then((syns) =>
    getSynonymOrAntonym(syns, 'synonym')
  );
  fetchSynonymOrAntonym(word, 'rel_ant').then((ants) =>
    getSynonymOrAntonym(ants, 'antonym')
  );
}

function handleWordClick(e) {
  const word = e.target.innerText;
  const definition = document.getElementById('definition');
  const headingElement = definition.children[0];
  const textField = document.getElementById('wordInput');

  textField.value = word;
  headingElement.innerText = word;

  fetchWordData(word);
}

function handleWordSearch(e) {
  e.preventDefault();
  const word = e.target[0].value;

  const definition = document.getElementById('definition');
  const headingElement = definition.children[0];
  headingElement.innerText = word;

  fetchWordData(word);
}
document.getElementById('form').addEventListener('submit', handleWordSearch);
