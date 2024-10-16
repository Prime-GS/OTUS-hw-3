const getUniqueSelector = el => {
  let selector = el.tagName.toLowerCase();

  if (el.id) {
    selector += `#${el.id}`;
  }

  if (el.className) {
    selector += "." + Array.from(el.classList).join(".");
  }

  const siblings = Array.from(el.parentNode.children).filter(e => e.tagName === el.tagName);
  if (siblings.length > 1) {
    const index = siblings.indexOf(el) + 1;
    if (index === 1) {
      selector += `:first-child`;
    } else if (index === siblings.length) {
      selector += `:last-child`;
    } else {
      selector += `:nth-child(${index})`;
    }
  }

  return selector;
};

function getPath(element) {
  if (typeof element === "object" && !!element.length) {
    const paths = [];

    element.forEach(el => {
      if (!(el instanceof HTMLElement)) {
        return undefined;
      }

      const path = [];
      let currentElement = el;

      while (currentElement !== document.documentElement) {
        path.unshift(getUniqueSelector(currentElement));
        currentElement = currentElement.parentNode;
      }

      paths.push(path);
    });

    return paths.includes(undefined) ? undefined : paths;
  } else if (!(element instanceof HTMLElement)) {
    return undefined;
  } else {
    const path = [];
    let currentElement = element;

    while (currentElement !== document.documentElement) {
      path.unshift(getUniqueSelector(currentElement));
      currentElement = currentElement.parentNode;
    }

    return path.join(" ");
  }
}

getPath(document.querySelectorAll(".result"));

module.exports = getPath;
