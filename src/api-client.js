class API {
  constructor(config) {
    this.baseURL = config.URL;
    this.lang = config.lang || 'en';
    this.getAllParagraphs = this.getAllParagraphs.bind(this);
    this.getParagraph = this.getParagraph.bind(this);
    const headers = {
      'Content-Type': 'application/json',
      'Accept-Language': this.lang
    };
    this.init = { method: 'GET', mode: 'cors', headers: headers };
  }

  getAllParagraphs() {
    return fetch(`${this.baseURL}/paragraphs`, this.init)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data.data;
      });
  }

  getParagraph(paragraphId) {
    return fetch(`${this.baseURL}/paragraphs/${paragraphId}`, this.init)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data.data;
      });
  }

  getComplianceByParagraph(paragraphId) {
    return fetch(
      `${this.baseURL}/paragraphs/${paragraphId}/compliances`,
      this.init
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data.data;
      });
  }

  getAllCompliances() {
    return fetch(`${this.baseURL}/compliances`, this.init)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data.data;
      });
  }

  getAllReports() {
    return fetch(`${this.baseURL}/reports`, this.init)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data.data;
      });
  }
}

export default API;
