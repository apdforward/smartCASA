class ComplianceList {
  constructor() {
    this.title = document.querySelector('.report-title');
    this.pages = document.querySelector('.report-pages');
    this.reportData = document.querySelector('.report-data');
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
    while (this.pages.firstChild) {
      this.pages.removeChild(this.pages.firstChild);
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
      'Not In Compliance': 'compliance-list__item--not-in-compliance'
    };
    this.title.innerHTML = `IMR - ${data.reportId}`;
    let pagesText = '';
    for (const page of data.pages) {
      pagesText += page;
      pagesText += ', ';
    }
    pagesText = pagesText.slice(0, -2);
    const pages = document.createTextNode(`Pages ${pagesText}`);
    this.pages.appendChild(pages);
    this.primaryCompliance.innerHTML = `Primary Compliance: ${
      data.primaryCompliance
    }`;
    const primaryClass = compliances[data.primaryCompliance];
    this.primaryCompliance.classList.add(primaryClass);
    const secondaryClass = compliances[data.secondaryCompliance];
    this.secondaryCompliance.innerHTML = `Secondary Compliance: ${
      data.secondaryCompliance
    }`;
    this.secondaryCompliance.classList.add(secondaryClass);
    this.operationalCompliance.innerHTML = `Operational Compliance: ${
      data.operationalCompliance
    }`;
    const operationalClass = compliances[data.operationalCompliance];
    this.operationalCompliance.classList.add(operationalClass);
  }
}

function parseDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${monthNames[monthIndex]}  ${day} ${year}`;
}

export default ComplianceList;
