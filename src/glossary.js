const words = [
  {
    term: 'The Department',
    definition:
      'shall refer to the Albuquerque Police Department its agents, officers, supervisors, and employees (both sworn and unsworn)'
  },
  {
    term: 'APD',
    definition:
      'shall refer to the Albuquerque Police Department its agents, officers, supervisors, and employees (both sworn and unsworn)'
  },
  {
    term: 'Best practices',
    definition:
      'means guidelines or standards that represent the most efficient and current means for achieving constitutional and effective policing accepted by nationally recognied police professionals or organizations in the relevant subject areas, as determined by the Parties'
  }
];

class Term {
  constructor(props) {
    this.elem = document.createElement('span');
    this.elem.setAttribute(
      'definition',
      props.definition ||
        words
          .filter(obj => obj.term.toLowerCase() === props.text.toLowerCase())
          .reduce((acc, obj) => `${obj.term} ${obj.definition}`, '')
    );
    this.elem.innerText = props.text;
    this.elem.classList.add('term');
  }
}

function termIndices(str, find) {
  const regex = new RegExp(find, 'gi');
  let result;
  const indices = [];
  while ((result = regex.exec(str))) {
    indices.push(result.index);
  }
  return indices;
}

function replaceTerms(text) {
  const terms = words.map(word => {
    return word.term;
  });
  for (const term of terms) {
    const indices = termIndices(text, term);
    const termLength = term.length;
    let offset = 0;
    for (let i = 0; i < indices.length; i++) {
      const startIdx = indices[i] + offset;
      const endIdx = indices[i] + termLength + offset;
      const word = text.slice(startIdx, endIdx);
      const term = new Term({ text: word });
      text =
        text.slice(0, startIdx) +
        term.elem.outerHTML +
        text.slice(startIdx + termLength);

      offset += term.elem.outerHTML.length - termLength;
    }
  }
  const tmp = document.createElement('span');
  tmp.innerHTML = text;
  const termElems = tmp.querySelectorAll('.term');
  let timeout;
  for (const elem of termElems) {
    elem.addEventListener('click', e => {
      clearTimeout(timeout);
      const termHint = document.querySelector('.js-paragraph__term');
      termHint.classList.remove('paragraph__term--hidden');
      termHint.classList.add('paragraph__term--show');
      termHint.style.left = `${e.pageX + 10}px`;
      termHint.style.top = `${e.pageY - 45}px`;
      termHint.innerHTML = e.target.getAttribute('definition');
      timeout = setTimeout(() => {
        termHint.classList.remove('paragraph__term--show');
        termHint.classList.add('paragraph__term--hidden');
      }, 2000);
    });
  }
  return tmp;
}

export { replaceTerms, Term };
