import '@babel/polyfill';
import './copy-button';
import { CategoryTopic, SpecificTopic } from './topic';
import Help from './help';
import API from './api-client';
import { Term } from './glossary';
import FilterPanel from './filter-panel';
import ParagraphSelect from './paragraph-select';
import Paragraph from './paragraph';
import ComplianceList from './compliance-list';
import ComplianceChart from './compliance-chart';

{
  const api = new API({ URL: 'https://api.smartcasa.org', lang: 'en-US' });
  const paragraph = new Paragraph();
  const complianceList = new ComplianceList();
  const complianceChart = new ComplianceChart(complianceList);

  const paragraphSelect = new ParagraphSelect(
    api,
    paragraph,
    complianceList,
    complianceChart
  );

  api.getAllCategoryTags().then(topics => {
    const categoryFrag = document.createDocumentFragment();
    for (const topic of topics) {
      const categoryTopic = new CategoryTopic(topic, api, paragraphSelect);
      categoryFrag.appendChild(categoryTopic.elem);
    }
    document
      .querySelector('.category-topics__container')
      .appendChild(categoryFrag);
  });

  api.getAllSpecificTags().then(topics => {
    const specificFrag = document.createDocumentFragment();
    for (const topic of topics) {
      const specificTopic = new SpecificTopic(topic, api, paragraphSelect);
      specificFrag.appendChild(specificTopic.elem);
    }
    document
      .querySelector('.specific-topics__container')
      .appendChild(specificFrag);
  });
  new FilterPanel(paragraphSelect);
  const helpTerm = new Term({
    text: 'term',
    definition: 'an example definition'
  });
  helpTerm.elem.style.zIndex = 99999;
  const helpFrag = document.createDocumentFragment();
  const t = document.createTextNode('Click any ');
  const s = document.createTextNode(' underlined to show its CASA definition');
  helpFrag.appendChild(t);
  helpFrag.appendChild(helpTerm.elem);
  helpFrag.appendChild(s);
  new Help('.js-paragraph-help', helpFrag);
  api.getAllParagraphs().then(data => {
    paragraphSelect.createList(data);
  });
}
