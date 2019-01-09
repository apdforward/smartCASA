class API {
  constructor(config) {
    this.baseURL = config.URL;
    this.lang = config.lang || 'en';
    this.getAllParagraphs = this.getAllParagraphs.bind(this);
    this.getParagraph = this.getParagraph.bind(this);
    const headers = new Headers();
    headers.append('Content-Type', 'text/json');
    headers.append('Accept-Language', this.lang);

    this.init = { method: 'GET', mode: 'cors', headers: headers };
  }

  async getAllParagraphs() {
    const response = await fetch(`${this.baseURL}/paragraphs`, this.init);
    return await response.json();
  }
  async getParagraph(paragraphId) {
    const response = await fetch(
      `${this.baseURL}/paragraphs/${paragraphId}`,
      this.init
    );
    return await response.json();
  }
  async getComplianceByParagraph(paragraphId) {
    const response = await fetch(
      `${this.baseURL}/paragraphs/${paragraphId}/compliances`,
      this.init
    );
    return await response.json();
  }

  async getAllCompliances() {
    const response = await fetch(`${this.baseURL}/compliances`, this.init);
    return await response.json();
  }
  /*
  async getCompliance(params) {
    const response = await fetch(
      `${this.URL}/compliances/${params.key}`,
      this.init
    );
    return await response.json();
  }
  */
}

export default API;
