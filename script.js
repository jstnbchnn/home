let removeTextInterval;
let typeTextInterval;

const GMAIL = '@gmail.com'
const TWITTER = '@'
const GITHUB = 'github.com/'

const hoverFunctionMap = {
  twitter: () => typeLeft(TWITTER),
  github: () => typeLeft(GITHUB),
  email: () => typeRight(GMAIL)
}

function hoverSocial(type) {
  clearIntervals()
  hoverFunctionMap[type]()
}

async function typeLeft(value) {
  const postText = document.getElementById('postText')
  await removeText(postText)

  const preText = document.getElementById('preText')
  if(preText.innerText === value) {
    return;
  }
  await removeText(preText)
  typeText(preText, value)
}

async function typeRight(value) {
  const preText = document.getElementById('preText')
  await removeText(preText)

  const postText = document.getElementById('postText')
  typeText(postText, GMAIL)
}

function removeText(element) {
  return new Promise((resolve, reject) => {
    removeTextInterval = setInterval(clear, 100);

    function clear() {
      const initialText = element.innerText

      if (!initialText.length) {
        clearInterval(removeTextInterval)
        resolve()
        return
      }

      if (initialText.length > 1) {
        element.innerText  = initialText.substring(0, initialText.length - 2) + '|'
        return
      }
      console.log(['third', ]);
      element.innerText = ''
      clearInterval(removeTextInterval)
      resolve();
    }
  })
}

function typeText(element, text) {
  return new Promise((resolve, reject) => {
    typeTextInterval = setInterval(type, 100);
    let initialText = text;
    let currentText = '';

    function type() {
      if(currentText.length !== text.length) {
        const newChar = initialText.slice(0, 1)
        const newText = `${currentText}${newChar}`
        element.innerText = newText;

        initialText = initialText.slice(1);
        currentText = newText;
        return;
      }

      clearInterval(typeTextInterval)
      resolve()
    }
  })
}

function clearIntervals() {
  clearInterval(typeTextInterval)
  clearInterval(removeTextInterval)
}



