import CopyButton from './copy-button';
import Help from './help';
import API from './api-client';
import { Term, TermHint } from './glossary';
import Modal from './modal';
import ParagraphSelect from './paragraph-select';
import Paragraph from './paragraph';
import ComplianceList from './compliance-list';
import ComplianceChart from './compliance-chart';
import Search from './search';
import ComplianceTable from './compliance-table';
import PubSub from './pub-sub';
import { IncrementButton, DecrementButton } from './paragraph-button';

{
  const api = new API({ URL: 'https://api.smartcasa.org', lang: 'en-US' });
  const subscriber = new PubSub();
  const paragraph = new Paragraph(subscriber);
  const complianceList = new ComplianceList(subscriber);
  const complianceChart = new ComplianceChart(subscriber);
  const complianceTable = new ComplianceTable();
  const incrementBtn = new IncrementButton(api, subscriber);
  const decrementBtn = new DecrementButton(api, subscriber);
  const modal = new Modal();
  const termHint = new TermHint();

  const paragraphSelect = new ParagraphSelect(api, subscriber);

  new Search(subscriber);
  subscriber.subscribe('paragraph-filter', paragraphSelect.filterList);
  new CopyButton();
  const helpTerm = new Term(
    {
      text: 'term',
      definition: 'an example definition'
    },
    subscriber
  );
  helpTerm.elem.style.zIndex = 99999;
  const helpFrag = document.createDocumentFragment();
  const t = document.createTextNode('Click any ');
  const s = document.createTextNode(' underlined to show its CASA definition');
  helpFrag.appendChild(t);
  helpFrag.appendChild(helpTerm.elem);
  helpFrag.appendChild(s);
  new Help('.js-paragraph-help', helpFrag);

  api.getAllParagraphs().then(data => {
    incrementBtn.paragraphs = data;
    decrementBtn.paragraphs = data;
    paragraphSelect.createList(data);
  });
  subscriber.subscribe('compliance-change', complianceList.update);
  subscriber.subscribe('paragraph-change', incrementBtn.update);
  subscriber.subscribe('paragraph-change', decrementBtn.update);
  subscriber.subscribe('paragraph-change', paragraph.update);
  subscriber.subscribe('paragraph-inc', paragraph.update);
  subscriber.subscribe('paragraph-dec', paragraph.update);
  subscriber.subscribe('paragraph-inc', paragraphSelect.setSelected);
  subscriber.subscribe('paragraph-dec', paragraphSelect.setSelected);
  subscriber.subscribe('paragraph-inc', decrementBtn.update);
  subscriber.subscribe('paragraph-dec', incrementBtn.update);
  subscriber.subscribe('report-list-change', complianceChart.update);
  subscriber.subscribe('report-list-change', complianceTable.update);
  subscriber.subscribe('remove-filter', paragraphSelect.removeFilter);
  subscriber.subscribe('show-def', termHint.show);

  let cookie = false;
  const cookies = document.cookie.split('; ');
  for (const c of cookies) {
    if (c == 'visited=True') {
      cookie = true;
    }
  }

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!cookie && width > 800) {
    modal.open();
    document.cookie = `visited=True; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  }
}
