class ComplianceChart {
  constructor(complianceList) {
    this.complianceList = complianceList;
    this.svg = document.querySelector('.compliance__chart > svg ');
    this.g = document.querySelector('.compliance__chart > svg > g');
    this.data = [];
    this.width = 600;
    this.height = 300;
    this.drawChart = this.drawChart.bind(this);
    this.update = this.update.bind(this);
  }

  drawChart() {
    const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axis.classList.add('axis');
    axis.setAttribute('x1', '0');
    axis.setAttribute('y1', '100');
    axis.setAttribute('x2', this.width);
    axis.setAttribute('y2', '100');
    this.g.appendChild(axis);
  }

  drawBars() {
    const barWidth = this.width / this.data.length - 10;
    const imrs = calculateScores(this.data);
    const frag = document.createDocumentFragment();
    let x = 0;
    for (const imr of imrs) {
      const bar = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      );
      let y;
      let colorClass;
      if (imr.score == 0) {
        y = 95;
        colorClass = 'bar--zero';
      } else if (imr.score > 0) {
        y = 100 - Math.abs(imr.score) * 100;
        colorClass = 'bar--positive';
      } else {
        y = Math.abs(imr.score) * 100;
        colorClass = 'bar--negative';
      }
      bar.setAttribute('width', barWidth - 10);
      bar.setAttribute('x', x);
      bar.setAttribute('y', y);
      bar.setAttribute('height', Math.abs(imr.score) * 100 || 10);
      bar.addEventListener('click', () => {
        this.complianceList.update(imr.imr);
      });
      bar.classList.add('bar');
      bar.classList.add(colorClass);
      x += barWidth + 10;
      frag.appendChild(bar);
    }
    this.g.appendChild(frag);
  }

  drawLabels() {
    const barWidth = this.width / this.data.length - 10;
    const frag = document.createDocumentFragment();
    let x = barWidth / 2;
    for (const imr of this.data) {
      const label = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      label.innerHTML = `IMR-${imr.reportId}`;
      label.setAttribute('x', x);
      label.classList.add('label');
      x += barWidth + 10;
      label.setAttribute('y', this.height - 70);
      frag.appendChild(label);
    }
    this.g.appendChild(frag);
    const labels = document.querySelectorAll('.label');
    for (const label of labels) {
      const width = label.getComputedTextLength();
      let x = label.getAttribute('x');
      x -= width / 2;
      label.setAttribute('x', x);
    }
  }

  onResize() {}

  update(data) {
    while (this.g.lastChild) {
      this.g.removeChild(this.g.lastChild);
    }
    this.drawChart();
    this.data = data;
    this.drawBars();
    this.drawLabels();
    this.complianceList.update(this.data.slice(-1)[0]);
  }
}

function calculateScores(data) {
  const scores = data.map(imr => {
    let totalScore = 0;
    switch (imr.primaryCompliance) {
      case 'In Compliance':
        totalScore += 3;
        break;
      case 'Not In Compliance':
        totalScore += -3;
        break;
      default:
        totalScore += 0;
    }
    switch (imr.secondaryCompliance) {
      case 'In Compliance':
        totalScore += 2;
        break;
      case 'Not In Compliance':
        totalScore += -2;
        break;
      default:
        totalScore += 0;
    }
    switch (imr.operationalCompliance) {
      case 'In Compliance':
        totalScore += 1;
        break;
      case 'Not In Compliance':
        totalScore += -1;
        break;
      default:
        totalScore += 0;
    }
    return {
      imr: imr,
      score: totalScore / 6
    };
  });

  return scores;
}

export default ComplianceChart;
