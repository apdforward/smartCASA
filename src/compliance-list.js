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
    this.setState = this.setState.bind(this);
  }

  setState(props) {
    const compliances = {
      'In Compliance': 'in-compliance',
      'Not In Compliance': 'not-in-compliance'
    };
    this.title.innerHTML = `IMR - ${props.report_id}`;
    this.primaryCompliance.innerHTML = `Primary Compiance: ${
      props.primary_compliance
    }`;
    const primaryClass = compliances[data.data.primary_compliance];
    this.primaryCompliance.classList.add(primaryClass);
    this.primaryCompliance.innerHTML = `Secondary Compiance: ${
      props.secondary_compliance
    }`;
    const secondaryClass = compliances[data.data.primary_compliance];
    this.primaryCompliance.classList.add(secondaryClass);
    this.primaryCompliance.innerHTML = `Operational Compiance: ${
      props.operational_compliance
    }`;
    const operationalClass = compliances[props.operational_compliance];
    this.primaryCompliance.classList.add(operationalClass);
  }
}

export default ComplianceList;
