const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    for (let item of items.querySelectorAll('.item')) {
      const checkbox = item.querySelector('.item__checkbox');
      checkbox.addEventListener('click', finish);

      const text = item.querySelector('.item__text');
      text.addEventListener('click', edit);

      const button = item.querySelector('.item__button');
      button.addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();

    const input = e.target.querySelector('.form__input');

    if (input.value.trim().length > 0) {
      add(input.value.trim());
    }

    input.value = '';
  }

  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  function edit(e) {
    const { target } = e;
    const { textContent, parentNode } = target;

    parentNode.removeChild(target);

    const input = el('input', 'item__edit');
    input.setAttribute('type', 'text');
    input.value = textContent;
    input.addEventListener('keyup', commit);

    const button = parentNode.querySelector('.item__button');

    parentNode.insertBefore(input, button);
    input.focus();
  }

  function commit(e) {
    const { keyCode, target } = e;

    if (keyCode !== ENTER_KEYCODE) {
      return;
    }

    const { value, parentNode } = target;

    target.removeEventListener('keyup', commit);
    parentNode.removeChild(target);

    const text = el('span', 'item__text', edit);
    text.appendChild(document.createTextNode(value));

    const button = parentNode.querySelector('.item__button');

    parentNode.insertBefore(text, button);
  }

  function add(value) {
    const item = el('li', 'item');

    const checkbox = el('input', 'item__checkbox', finish);
    checkbox.setAttribute('type', 'checkbox');

    const text = el('span', 'item__text', edit);
    text.appendChild(document.createTextNode(value));

    const button = el('button', 'item__button', deleteItem);
    button.appendChild(document.createTextNode('Eyða'));

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(button);

    items.appendChild(item);
  }

  function deleteItem(e) {
    const parent = e.target.parentNode;

    const checkbox = parent.querySelector('.item__checkbox');
    const text = parent.querySelector('.item__text');
    const button = parent.querySelector('.item__button');

    checkbox.removeEventListener('click', finish);
    text.removeEventListener('click', edit);
    button.removeEventListener('click', deleteItem);

    parent.parentNode.removeChild(parent);
  }

  function el(type, className, clickHandler) {
    const element = document.createElement(type);

    if (className) {
      element.classList.add(className);
    }

    if (clickHandler) {
      element.addEventListener('click', clickHandler)
    }

    return element;
  }

  return {
    init: init
  }
})();
