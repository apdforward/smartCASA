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

function calculateScore(imr) {
  let score = 0;
  if (imr.primaryCompliance == 'Not In Compliance') {
    score = -3;
  } else if (imr.primaryCompliance == 'In Compliance') {
    if (imr.secondaryCompliance == 'Not In Compliance') {
      score = -2;
    } else if (imr.secondaryCompliance == 'In Compliance') {
      if (imr.operationalCompliance == 'In Compliance') {
        score = 3;
      } else if (imr.operationalCompliance == 'Not In Compliance') {
        score = -1;
      } else {
        score = 2;
      }
    } else {
      score = 1;
    }
  }
  return score;
}

function calculateComplianceSummary(imr) {
  let complianceSummary = 'Not measured/Not yet due';
  if (imr.primaryCompliance == 'Not In Compliance') {
    complianceSummary = 'Primary Non-compliance';
  } else if (imr.primaryCompliance == 'In Compliance') {
    if (imr.secondaryCompliance == 'Not In Compliance') {
      complianceSummary = 'Secondary Non-compliance';
    } else if (imr.secondaryCompliance == 'In Compliance') {
      if (imr.operationalCompliance == 'In Compliance') {
        complianceSummary = 'Opertational Compliance';
      } else if (imr.operationalCompliance == 'Not In Compliance') {
        complianceSummary = 'Opertational Non-compliance';
      } else {
        complianceSummary = 'Secondary Compliance';
      }
    } else {
      complianceSummary = 'Primary Compliance';
    }
  }
  return complianceSummary;
}

export { parseDate, calculateComplianceSummary, calculateScore };
