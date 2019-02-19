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
  const api = new API({ URL: 'http://localhost:3000', lang: 'en-US' });
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
  /*
  const complianceHelpFrag = document.createDocumentFragment();
  complianceHelpFrag.appendChild(
    document.createTextNode(
      'Compliance is normally evaluated twice yearly by the independent monitoring team'
    )
  );

  complianceHelpFrag.appendChild(document.createElement('br'));
  complianceHelpFrag.appendChild(
    document.createTextNode(
      'The values in the graph are indexed to provide a high level overview of performance.'
    )
  );

  complianceHelpFrag.appendChild(document.createElement('br'));
  complianceHelpFrag.appendChild(
    document.createTextNode('The index is calculated by the following scoring:')
  );

  complianceHelpFrag.appendChild(document.createElement('br'));
  complianceHelpFrag.appendChild(
    document.createTextNode(
      'Primary Compliance: In Compliance +3, Not In Compliance -3'
    )
  );

  complianceHelpFrag.appendChild(document.createElement('br'));
  complianceHelpFrag.appendChild(
    document.createTextNode(
      'Secondary Compliance: In Compliance +2, Not In Compliance -2'
    )
  );

  complianceHelpFrag.appendChild(document.createElement('br'));
  complianceHelpFrag.appendChild(
    document.createTextNode(
      'Operational Compliance: In Compliance +1, Not In Compliance -1'
    )
  );

  complianceHelpFrag.appendChild(document.createElement('br'));
  complianceHelpFrag.appendChild(
    document.createTextNode(
      'The sum of the scores for the report is then divided by 6 to create an index in the'
    )
  );
  complianceHelpFrag.appendChild(document.createElement('br'));
  complianceHelpFrag.appendChild(document.createTextNode('range of -1 to 1'));
  new Help('.js-compliance-help', complianceHelpFrag);
  */
  api.getAllParagraphs().then(data => {
    paragraphSelect.createList(data);
  });
}
