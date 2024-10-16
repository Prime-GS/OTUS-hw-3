const getPath = require("../src/script");

describe("getPath", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="test">
        <ul class="container">
          <li id="not"></li>
          <li id="element" class="test2">
            <span class="result"></span>
            <span id="not4"></span>
          </li>
          <li id="not2"></li>
          <li id="element" class="test2">
            <span id="not4"></span>
            <span class="result"></span>
          </li>
          <li id="not3"></li>
        </ul>
      </div>
    `;
  });

  it("should return a unique selector for a single element", () => {
    const element = document.querySelector(".result");
    const selector = getPath(element);
    const selectedElement = document.querySelector(selector);

    expect(selectedElement).toBe(element);
  });

  it("should return a unique selector with nth-child for sibling elements", () => {
    const elements = document.querySelectorAll(".result");
    const selector1 = getPath(elements[0]);
    const selector2 = getPath(elements[1]);

    const selectedElement1 = document.querySelector(selector1);
    const selectedElement2 = document.querySelector(selector2);

    expect(selector1).toContain(":nth-child");
    expect(selector2).toContain(":nth-child");
    expect(selector1).not.toBe(selector2);
    expect(selectedElement1).toBe(elements[0]);
    expect(selectedElement2).toBe(elements[1]);
  });

  it("should return an array of selectors for a NodeList", () => {
    const elements = document.querySelectorAll(".result");
    const selectors = getPath(elements);

    expect(selectors).toHaveLength(elements.length);
    selectors.forEach((selector, index) => {
      const selectedElement = document.querySelector(selector.join(" "));
      expect(selectedElement).toBe(elements[index]);
    });
  });

  it("should return undefined for non-HTMLElement input", () => {
    const nonHTMLElement = "not an element";
    const selector = getPath(nonHTMLElement);

    expect(selector).toBeUndefined();
  });

  it("should handle elements with ID correctly", () => {
    const element = document.getElementById("element");
    const selector = getPath(element);
    const selectedElement = document.querySelector(selector);
    const check = selector.includes("#element");

    expect(true).toBe(check);
    expect(selectedElement).toBe(element);
  });
});
