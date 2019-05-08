import { Term } from './glossary';
import { parseDate } from './utils';
class ComplianceList {
  constructor() {
    this.title = document.querySelector('.report-title');
    this.pages = document.querySelector('.report-pages');
    this.reportData = document.querySelector('.report-data');
    this.apdfCompliance = document.querySelector('.apdf-compliance');
    this.primaryCompliance = document.querySelector(
      '.compliance-list li:nth-child(1)'
    );
    this.secondaryCompliance = document.querySelector(
      '.compliance-list li:nth-child(2)'
    );
    this.operationalCompliance = document.querySelector(
      '.compliance-list li:nth-child(3)'
    );
    this.update = this.update.bind(this);
  }

  update(data) {
    this.apdfCompliance.innerHTML = '';
    while (this.pages.firstChild) {
      this.pages.removeChild(this.pages.firstChild);
    }
    while (this.primaryCompliance.firstChild) {
      this.primaryCompliance.removeChild(this.primaryCompliance.firstChild);
    }
    while (this.secondaryCompliance.firstChild) {
      this.secondaryCompliance.removeChild(this.secondaryCompliance.firstChild);
    }
    while (this.operationalCompliance.firstChild) {
      this.operationalCompliance.removeChild(
        this.operationalCompliance.firstChild
      );
    }
    this.reportData.innerHTML = '';
    this.reportData.innerHTML = `<b>Publication Date:</b> ${parseDate(
      data.report.publishDate
    )}  <br/><b>Monitoring Period:</b> ${parseDate(
      data.report.periodBegin
    )} - ${parseDate(data.report.periodEnd)}`;
    this.primaryCompliance.classList.remove(
      'compliance-list__item--not-in-compliance'
    );
    this.primaryCompliance.classList.remove(
      'compliance-list__item--in-compliance'
    );
    this.secondaryCompliance.classList.remove(
      'compliance-list__item--not-in-compliance'
    );
    this.secondaryCompliance.classList.remove(
      'compliance-list__item--in-compliance'
    );
    this.operationalCompliance.classList.remove(
      'compliance-list__item--not-in-compliance'
    );
    this.operationalCompliance.classList.remove(
      'compliance-list__item--in-compliance'
    );
    const compliances = {
      'In Compliance': 'compliance-list__item--in-compliance',
      'Not In Compliance': 'compliance-list__item--not-in-compliance',
      'Not Yet Due': 'compliance-list__item--other',
      'Not Reported': 'compliance-list__item--other',
      Pending: 'compliance-list__item--other',
      'Unable to Monitor': 'compliance-list__item--other'
    };
    this.title.innerHTML = `Independent Monitoring Report (IMR) - ${
      data.reportId
    }:`;
    let pagesText = '';
    for (const page of data.pages) {
      pagesText += page;
      pagesText += ', ';
    }
    pagesText = pagesText.slice(0, -2);
    const imrPageOffset = {
      1: 2,
      2: 13,
      3: 15,
      4: 14,
      5: 2,
      6: 2,
      8: 2,
      9: 2
    };
    const pagesAnchor = document.createElement('a');
    pagesAnchor.setAttribute('target', '_blank');
    pagesAnchor.setAttribute('rel', 'noopener');
    const correctedPage = data.pages[0] + imrPageOffset[data.reportId];
    pagesAnchor.setAttribute(
      'href',
      `https://s3-us-west-2.amazonaws.com/smartcasa-docs/IMR-${
        data.reportId
      }.pdf#page=${correctedPage}`
    );
    const pages = document.createTextNode(`Pages ${pagesText}`);
    pagesAnchor.appendChild(pages);
    this.pages.appendChild(pagesAnchor);
    const primaryComplianceTerm = new Term({
      text: 'Primary Compliance',
      term: 'Primary Compliance',
      definition: `Primary compliance is the “policy” part of
      compliance. To attain primary compliance, APD must have in
      place operational policies and procedures designed to guide
      officers, supervisors and managers in the performance of the tasks
      outlined in the CASA. As a matter of course, the policies must be
      reflective of the requirements of the CASA; must comply with
      national standards for effective policing policy; and must
      demonstrate trainable and evaluable policy components.`
    });
    const primaryComplianceStatus = document.createTextNode(
      `${data.primaryCompliance}`
    );
    const primaryComplianceContainer = document.createElement('div');
    const primaryClass = compliances[data.primaryCompliance];
    primaryComplianceContainer.appendChild(primaryComplianceStatus);
    primaryComplianceContainer.classList.add(primaryClass);
    this.primaryCompliance.appendChild(primaryComplianceTerm.elem);
    this.primaryCompliance.appendChild(document.createTextNode(': '));
    this.primaryCompliance.appendChild(primaryComplianceContainer);

    const secondaryComplianceTerm = new Term({
      text: 'Secondary Compliance',
      term: 'Secondary Compliance',
      definition: `Secondary compliance is attained by
      implementing supervisory, managerial and executive practices
      designed to (and effective in) implementing the policy as written,
      e.g., sergeants routinely enforce the policies among field
      personnel and are held accountable by managerial and executive
      levels of the department for doing so. By definition, there should
      be operational artifacts (reports, disciplinary records, remands to
      retraining, follow-up, and even revisions to policies if necessary,
      indicating that the policies developed in the first stage of
      compliance are known to, followed by, and important to
      supervisory and managerial levels of the agency.`
    });
    const secondaryComplianceStatus = document.createTextNode(
      `${data.secondaryCompliance}`
    );
    const secondaryComplianceContainer = document.createElement('div');
    const secondaryClass = compliances[data.secondaryCompliance];
    secondaryComplianceContainer.appendChild(secondaryComplianceStatus);
    secondaryComplianceContainer.classList.add(secondaryClass);
    this.secondaryCompliance.appendChild(secondaryComplianceTerm.elem);
    this.secondaryCompliance.appendChild(document.createTextNode(': '));
    this.secondaryCompliance.appendChild(secondaryComplianceContainer);
    const operationalComplianceTerm = new Term({
      text: 'Operational Compliance',
      term: 'Operational Compliance',
      definition: `Operational compliance is attained at
      the point that the adherence to policies is apparent in the day-today 
      operation of the agency e.g., line personnel are routinely held
      accountable for compliance, not by the monitoring staff, but by
      their sergeants, and sergeants are routinely held accountable for
      compliance by their lieutenants and command staff. In other
      words, the APD “owns” and enforces its policies.`
    });
    const operationalComplianceStatus = document.createTextNode(
      `${data.operationalCompliance}`
    );
    const operationalComplianceContainer = document.createElement('div');
    const operationalClass = compliances[data.operationalCompliance];
    operationalComplianceContainer.appendChild(operationalComplianceStatus);
    operationalComplianceContainer.classList.add(operationalClass);
    this.operationalCompliance.appendChild(operationalComplianceTerm.elem);
    this.operationalCompliance.appendChild(document.createTextNode(': '));
    this.operationalCompliance.appendChild(operationalComplianceContainer);
  }
}

export default ComplianceList;
