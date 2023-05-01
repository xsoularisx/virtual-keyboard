const enKey = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp'],
  ['Control', 'Meta', 'Alt', 'Space', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
];

const ruKey = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', "э", 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp'],
  ['Control', 'Meta', 'Alt', 'Space', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
];

let capsLock = false;
let ru = false;

const textArea = document.createElement("textarea");
textArea.classList.add("text__area");
textArea.placeholder = 'смена языка "shift"+"alt"'
document.body.appendChild(textArea);

const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
document.body.appendChild(keyboard);

function renderKeyboard(key) {
  if (keyboard.children.length) {
    clear();
  }
  for (value of key) {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row')
    for (key of value) {
      const keyboardKey = document.createElement('div');
      keyboardKey.classList.add('keyboard__key');
      keyboardKey.setAttribute('data-key', key);
      keyboardKey.textContent = key;
      keyboardRow.appendChild(keyboardKey);

      if (keyboardKey.textContent === 'Backspace') {
        keyboardKey.classList.add('keyboard__key-backspace')
      }

      if (keyboardKey.textContent === 'Tab') {
        keyboardKey.classList.add('keyboard__key-tab')
      }

      if (keyboardKey.textContent === 'CapsLock') {
        keyboardKey.classList.add('keyboard__key-capslock')
      }

      if (keyboardKey.textContent === 'Enter') {
        keyboardKey.classList.add('keyboard__key-enter')
      }

      if (keyboardKey.textContent === 'Shift') {
        keyboardKey.classList.add('keyboard__key-shift')
      }

      if (keyboardKey.textContent === 'Space') {
        keyboardKey.classList.add('keyboard__key-space')
      }
    }
    keyboard.appendChild(keyboardRow);
  }
}
renderKeyboard(enKey)

function clear() {
  while (keyboard.firstChild) {
    keyboard.firstChild.remove();
  }
}

document.addEventListener('keydown', (event) => {
  if (event.altKey && event.shiftKey) {
    ru = !ru
  }
  ru ? renderKeyboard(ruKey) : renderKeyboard(enKey);
})


textArea.addEventListener('click', () => {
  keyboard.classList.add('keyboard-block');
  textArea.autofocus = true
})

keyboard.addEventListener('click', (event) => {
  if (event.target.dataset.key) {
    addKey(event.target.dataset)
  }

  if (event.target.dataset.key === 'CapsLock') {
    event.target.classList.toggle('active')
  }

  textArea.focus()
})

keyboard.addEventListener('mousedown', (event) => {
  if (event.target.dataset.key) {
    event.target.classList.add('active')
  }
})

keyboard.addEventListener('mouseup', (event) => {
  if (event.target.dataset.key) {
    event.target.classList.remove('active')
  }
})


document.addEventListener('keydown', (event) => {
  let keys = document.querySelectorAll('.keyboard__key')
  console.log(event.key)
  keys.forEach(e => {
    if (e.textContent === event.key) {
      e.classList.add('active')
      return
    }
  })
})

document.addEventListener('keyup', (event) => {
  let keys = document.querySelectorAll('.keyboard__key')
  keys.forEach(e => {
    if (e.textContent === event.key) {
      e.classList.remove('active')
      return
    }
  })
})


function addKey(event) {

  if (event.key.toLowerCase() == 'enter') {
    textArea.value += '\n';
    return
  }

  if (event.key.toLowerCase() == 'space') {
    textArea.value += ' ';
    return
  }

  if (event.key.toLowerCase() == 'tab') {
    textArea.value += '\t';
    return
  }

  if (event.key.toLowerCase() == 'backspace') {
    textArea.value = textArea.value.slice(0, -1);
    return
  }

  if (event.key.toLowerCase() == 'capslock') {
    capsLock = !capsLock;
    return
  }

  if (capsLock) {
    return textArea.value += event.key.toLocaleUpperCase();
  }
  textArea.value += event.key;
}