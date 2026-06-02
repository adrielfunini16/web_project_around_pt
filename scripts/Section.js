export default class Section {
  #items;
  #renderer;
  #content;

  constructor({ items, renderer }, contentSelector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#content = document.querySelector(contentSelector);
  }

  renderer() {
    this.#items.forEach((item) => {
      const element = this.#renderer(item);
      this.addItem(element);
    });
  }

  addItem(element) {
    this.#content.append(element);
  }
}
