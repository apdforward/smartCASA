import Paragraph from './paragraph';

const words = [{ term: 'force', definition: 'the definition of force' }];

class Term {
  constructor(text) {
    this.elem = document.createElement('span');
    this.elem.setAttribute(
      'definition',
      words
        .filter(obj => obj.term === text.toLowerCase())
        .reduce((acc, obj) => `${obj.term}: ${obj.definition}`, '')
    );
    this.elem.innerText = text;
    this.elem.classList.add('term');
  }
}

function findTerms(text) {
  const paragraphWords = text.split(' ');
  const terms = words.map(obj => obj.term);
  for (let i = 0; i < paragraphWords.length; i++) {
    const paragraphWord = paragraphWords[i].replace(/,|\.|'|!|\?/g, '');
    const j = terms.indexOf(paragraphWord.toLowerCase());
    if (j !== -1 && terms[j] === paragraphWord.toLowerCase()) {
      const term = new Term(paragraphWord);
      paragraphWords.splice(i, 1, term.elem.outerHTML);
    }
  }
  return paragraphWords.join(' ');
}

function replaceTerms() {
  const paragraph = new Paragraph();
  const paragraphBody = paragraph.body;
  let text = paragraphBody.innerHTML;
  text = text.replace(/^(\s+)/g, '');
  const tmp = document.createElement('span');
  tmp.innerHTML = findTerms(text);
  paragraphBody.innerHTML = '';
  paragraphBody.appendChild(tmp);
  const terms = document.querySelectorAll('.term');
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
}

export default replaceTerms;
