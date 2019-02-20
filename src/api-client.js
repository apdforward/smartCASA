class API {
  constructor(config) {
    this.baseURL = config.URL;
    this.lang = config.lang || 'en';
    this.getAllParagraphs = this.getAllParagraphs.bind(this);
    this.getParagraph = this.getParagraph.bind(this);
    const headers = new Headers();
    headers.append('Content-Type', 'applications/json');
    headers.append('Accept-Language', this.lang);
    this.init = { method: 'GET', mode: 'cors', headers: headers };
  }

  async getAllParagraphs() {
    const response = await fetch(`${this.baseURL}/paragraphs`, this.init);
    const jsonData = await response.json();
    return await jsonData.data;
  }

  async getParagraph(paragraphId) {
    const response = await fetch(
      `${this.baseURL}/paragraphs/${paragraphId}`,
      this.init
    );
    const jsonData = await response.json();
    return await jsonData.data;
  }

  async getComplianceByParagraph(paragraphId) {
    const response = await fetch(
      `${this.baseURL}/paragraphs/${paragraphId}/compliances`,
      this.init
    );
    const jsonData = await response.json();
    return await jsonData.data;
  }

  async getAllCompliances() {
    const response = await fetch(`${this.baseURL}/compliances`, this.init);
    const jsonData = await response.json();
    return await jsonData.data;
  }

  async getAllReports() {
    const response = await fetch(`${this.baseURL}/reports`, this.init);
    const jsonData = await response.json();
    return await jsonData.data;
  }

  async getAllCategoryTags() {
    const response = await fetch(`${this.baseURL}/category-tags`, this.init);
    const jsonData = await response.json();
    return await jsonData.data;
  }

  async getAllSpecificTags() {
    const response = await fetch(`${this.baseURL}/specific-tags`, this.init);
    const jsonData = await response.json();
    return await jsonData.data;
  }

  async getParagraphsByCategoryTag(categoryTagId) {
    const response = await fetch(
      `${this.baseURL}/category-tags/${categoryTagId}/paragraphs`,
      this.init
    );
    const jsonData = await response.json();
    return await jsonData.data;
  }

  async getParagraphsBySpecificTag(specificTagId) {
    const response = await fetch(
      `${this.baseURL}/specific-tags/${specificTagId}/paragraphs`,
      this.init
    );
    const jsonData = await response.json();
    return await jsonData.data;
  }
}

export default API;
