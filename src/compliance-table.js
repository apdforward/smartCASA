class ComplianceTable {
  constructor() {
    this.data = [];
    this.table = document.querySelector('.compliance-table');
    this.tableBody = this.table.querySelector('tbody');
    this.update = this.update.bind(this);
  }

  update(data) {
    while (this.tableBody.lastChild) {
      this.tableBody.removeChild(this.tableBody.lastChild);
    }
    this.data = data;
    const frag = document.createDocumentFragment();
    for (const item of this.data) {
      const {
        reportId,
        pages,
        primaryCompliance,
        secondaryCompliance,
        operationalCompliance
      } = item;
      const tr = document.createElement('tr');
      const tdReportId = document.createElement('td');
      tdReportId.appendChild(document.createTextNode(`${reportId}`));
      const tdPages = document.createElement('td');
      tdPages.appendChild(document.createTextNode(`${pages.join(',')}`));
      const tdPrimaryCompliance = document.createElement('td');
      const primaryComplianceDiv = document.createElement('div');
      primaryComplianceDiv.classList.add(
        calcComplianceClass(primaryCompliance)
      );
      primaryComplianceDiv.appendChild(
        document.createTextNode(`${primaryCompliance}`)
      );
      tdPrimaryCompliance.appendChild(primaryComplianceDiv);
      const tdSecondaryCompliance = document.createElement('td');
      const secondaryComplianceDiv = document.createElement('div');
      secondaryComplianceDiv.classList.add(
        calcComplianceClass(secondaryCompliance)
      );
      secondaryComplianceDiv.appendChild(
        document.createTextNode(`${secondaryCompliance}`)
      );
      tdSecondaryCompliance.appendChild(secondaryComplianceDiv);
      const tdOperationalCompliance = document.createElement('td');
      const operationalComplianceDiv = document.createElement('div');
      operationalComplianceDiv.classList.add(
        calcComplianceClass(operationalCompliance)
      );
      operationalComplianceDiv.appendChild(
        document.createTextNode(`${operationalCompliance}`)
      );

      tdOperationalCompliance.appendChild(operationalComplianceDiv);
      tr.appendChild(tdReportId);
      tr.appendChild(tdPages);
      tr.appendChild(tdPrimaryCompliance);
      tr.appendChild(tdSecondaryCompliance);
      tr.appendChild(tdOperationalCompliance);
      frag.appendChild(tr);
    }
    this.tableBody.appendChild(frag);
  }
}

function calcComplianceClass(compliance) {
  let complianceClass;
  if (compliance == 'In Compliance') {
    complianceClass = 'compliance-list__item--in-compliance';
  } else if (compliance == 'Not In Compliance') {
    complianceClass = 'compliance-list__item--not-in-compliance';
  } else {
    complianceClass = 'compliance-list__item--other';
  }
  return complianceClass;
}

export default ComplianceTable;
