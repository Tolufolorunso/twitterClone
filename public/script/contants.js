const $ = (el, all) => {
  if (all === true) {
    return document.querySelectorAll(el);
  }

  return document.querySelector(el);
};
