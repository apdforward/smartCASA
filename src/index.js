import '@babel/polyfill';
import './copy-button';
import { CategoryTopic, SpecificTopic } from './topic';
import Help from './help';
import API from './api-client';
import { Term } from './glossary';
import FilterPanel from './filter-panel';
import ParagraphSelect from './paragraph-select';

const topics = [
  { value: 'Use of Force', id: 1 },
  { value: 'Specialized Units', id: 2 }
];
const specificTopics = [
  { category_id: 1, value: 'Use of Force Principles', id: 1 },
  { category_id: 1, value: 'Use of Firearms', id: 2 },
  { category_id: 1, value: 'Electronic Control Weapons', id: 3 },
  { category_id: 1, value: 'Crowd Control and Incident Management', id: 4 },
  { category_id: 1, value: 'Use of Force Reporting', id: 5 },
  { category_id: 1, value: 'Force Investigations', id: 6 },
  { category_id: 2, value: 'Specialized Tactical Units', id: 7 },
  { category_id: 2, value: 'Specialized Investigative Units', id: 8 }
];
(function() {
  const api = new API({ URL: 'http://localhost:3004', lang: 'en-US' });

  const paragraphSelect = new ParagraphSelect(api);
  new FilterPanel(paragraphSelect);

  const categoryFrag = document.createDocumentFragment();
  for (const topic of topics) {
    const categoryTopic = new CategoryTopic(topic, api);
    categoryFrag.appendChild(categoryTopic.elem);
  }
  document.querySelector('.category-topics').appendChild(categoryFrag);
  const specificFrag = document.createDocumentFragment();
  for (const topic of specificTopics) {
    const specificTopic = new SpecificTopic(topic, api);
    specificFrag.appendChild(specificTopic.elem);
  }
  document.querySelector('.specific-topics').appendChild(specificFrag);
  const helpTerm = new Term({
    text: 'term',
    definition: 'an example definition'
  });
  helpTerm.elem.style.zIndex = 99999;
  new Help(
    '.js-paragraph-help',
    `This is a span test to make sure the ${helpTerm.elem.outerHTML} tag works`
  );
})();
