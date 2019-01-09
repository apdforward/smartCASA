class ComplianceList {
  constructor() {
    this.title = document.querySelector('.compliance-title');
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

export default ComplianceList;
