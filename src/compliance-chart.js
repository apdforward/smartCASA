import { parseDate } from './utils';

class ComplianceChart {
  constructor(complianceList) {
    this.complianceList = complianceList;
    const parent = document.querySelector('.compliance__chart');
    const { width } = parent.getBoundingClientRect();
    this.svg = document.querySelector('.compliance__chart > svg ');
    this.g = document.querySelector('.compliance__chart > svg > g');
    this.data = [];
    this.width = width;
    this.height = 250;
    this.tooltipTimeout;
    this.tooltip = document.querySelector('.chart-tooltip');
    this.drawChart = this.drawChart.bind(this);
    this.update = this.update.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  drawChart() {
    this.svg.setAttribute('width', this.width);
    this.svg.setAttribute('height', this.height);
    const background = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    );
    background.classList.add('background');
    background.setAttribute('width', this.width);
    background.setAttribute('height', 200);
    this.g.appendChild(background);
    const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axis.classList.add('axis');
    axis.setAttribute('x1', '0');
    axis.setAttribute('y1', '100');
    axis.setAttribute('x2', this.width);
    axis.setAttribute('y2', '100');
    this.g.appendChild(axis);
    const minAxis = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    minAxis.classList.add('axis');
    minAxis.setAttribute('x1', '0');
    minAxis.setAttribute('y1', '200');
    minAxis.setAttribute('x2', this.width);
    minAxis.setAttribute('y2', '200');
    const maxAxis = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    this.g.appendChild(minAxis);
    maxAxis.classList.add('axis');
    maxAxis.setAttribute('x1', '0');
    maxAxis.setAttribute('y1', '1');
    maxAxis.setAttribute('x2', this.width);
    maxAxis.setAttribute('y2', '1');
    this.g.appendChild(maxAxis);
  }

  drawBars() {
    const barWidth = this.width / this.data.length - 10;
    const imrs = calculateScores(this.data);
    const frag = document.createDocumentFragment();
    let x = 10;
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
        y = 100;
        colorClass = 'bar--negative';
      }
      bar.setAttribute('width', barWidth - 10);
      bar.setAttribute('x', x);
      bar.setAttribute('y', y);
      bar.setAttribute('height', Math.abs(imr.score) * 100 || 10);
      bar.addEventListener('click', () => {
        this.complianceList.update(imr.imr);
        const active = document.querySelector('.underline--active');
        active.classList.remove('underline--active');
        const underline = document.querySelector(
          `.underline-${imr.imr.reportId}`
        );
        underline.classList.add('underline--active');
      });
      bar.addEventListener('mouseover', e => {
        clearTimeout(this.tooltipTimeout);
        this.tooltipTimeout = setTimeout(() => {
          this.tooltip.classList.add('chart-tooltip--visible');
          this.tooltip.innerHTML = `${imr.apdfScore}`;
          this.tooltip.style.left = `${e.pageX}px`;
          this.tooltip.style.top = `${e.pageY - 100}px`;
        }, 800);
      });
      bar.addEventListener('mouseout', () => {
        this.tooltip.classList.remove('chart-tooltip--visible');
        clearTimeout(this.tooltipTimeout);
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
    let underlineX = 0;
    for (const imr of this.data) {
      const label = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      label.textContent = `IMR-${imr.reportId}`;
      label.setAttribute('x', x);
      label.classList.add('label');
      label.classList.add(`label-${imr.reportId}`);
      x += barWidth + 10;
      label.setAttribute('y', this.height - 20);
      label.addEventListener('click', () => {
        this.complianceList.update(imr);
        const active = document.querySelector('.underline--active');
        active.classList.remove('underline--active');
        const underline = document.querySelector(`.underline-${imr.reportId}`);
        underline.classList.add('underline--active');
      });

      const underline = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      );
      underline.classList.add('underline');
      underline.classList.add(`underline-${imr.reportId}`);
      underline.setAttribute('height', 5);
      underline.setAttribute('width', barWidth);
      underline.setAttribute('x', underlineX);
      underline.setAttribute('y', this.height - 20);
      frag.appendChild(label);
      frag.appendChild(underline);
      underlineX += barWidth + 10;
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

  setTitle() {
    const dateRange = document.querySelector('.compliance-dates');
    dateRange.innerHTML = '';
    dateRange.innerHTML = `${parseDate(
      this.data[0].report.periodBegin
    )} - ${parseDate(this.data.slice(-1)[0].report.periodEnd)}`;
  }

  update(data) {
    while (this.g.lastChild) {
      this.g.removeChild(this.g.lastChild);
    }
    const noComplianceElem = document.querySelector('.no-compliance');
    const complianceElem = document.querySelector('.compliance');
    if (data.length > 0) {
      noComplianceElem.classList.add('no-compliance--hidden');
      complianceElem.classList.remove('compliance--hidden');
      this.drawChart();
      this.data = data;
      this.setTitle();
      this.drawLabels();
      const active = document.querySelector(
        `.underline-${this.data.slice(-1)[0].reportId}`
      );
      active.classList.add('underline--active');
      this.drawBars();
      this.complianceList.update(this.data.slice(-1)[0]);
    } else {
      complianceElem.classList.add('compliance--hidden');
      noComplianceElem.classList.remove('no-compliance--hidden');
    }
  }
}

function calculateScores(data) {
  const scores = data.map(imr => {
    let score = 0;
    let apdfScore = 'Not measured/Not yet due';
    if (imr.primaryCompliance == 'Not In Compliance') {
      score = -3;
      apdfScore = 'Primary Non-compliance';
    } else if (imr.primaryCompliance == 'In Compliance') {
      if (imr.secondaryCompliance == 'Not In Compliance') {
        score = -2;
        apdfScore = 'Secondary Non-compliance';
      } else if (imr.secondaryCompliance == 'In Compliance') {
        if (imr.operationalCompliance == 'In Compliance') {
          score = 3;
          apdfScore = 'Opertational Compliance';
        } else if (imr.operationalCompliance == 'Not In Compliance') {
          score = -1;
          apdfScore = 'Opertational Non-compliance';
        } else {
          score = 2;
          apdfScore = 'Secondary Compliance';
        }
      } else {
        score = 1;
        apdfScore = 'Primary Compliance';
      }
    }
    return {
      imr: imr,
      apdfScore: apdfScore,
      score: score / 3
    };
  });

  return scores;
}

export default ComplianceChart;
