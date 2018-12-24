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

function findTerms(text) {
  const paragraphWords = text.split(' ');
  const terms = words.map(obj => obj.term.toLowerCase());
  for (let i = 0; i < paragraphWords.length; i++) {
    const paragraphWord = paragraphWords[i].replace(/,|\.|'|!|\?/g, '');
    const j = terms.indexOf(paragraphWord.toLowerCase());
    console.log(terms[j]);
    if (j !== -1 && terms[j] === paragraphWord.toLowerCase()) {
      const term = new Term({ text: paragraphWord });
      paragraphWords.splice(i, 1, term.elem.outerHTML);
    }
  }
  return paragraphWords.join(' ');
}

function replaceTerms(text) {
  text = text.replace(/^(\s+)/g, '');
  const tmp = document.createElement('span');
  tmp.innerHTML = findTerms(text);
  const terms = tmp.querySelectorAll('.term');
  let timeout;
  for (const term of terms) {
    term.addEventListener('click', e => {
      clearTimeout(timeout);
      const termHint = document.querySelector('.js-paragraph__term');
      termHint.classList.remove('paragraph__term--hidden');
      termHint.classList.add('paragraph__term--show');
      termHint.style.left = `${e.pageX - 10}px`;
      termHint.style.top = `${e.pageY - 35}px`;
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
