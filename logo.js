const fonts = [
  'Alfa Slab One',
  'Arima',
  'Arizonia',
  'Black Han Sans',
  'Black Ops One',
  'Blaka Hollow',
  'Bodoni Moda',
  'Bungee',
  'Bungee Shade',
  'Carter One',
  'Cinzel Decorative',
  'Creepster',
  'DM Serif Display',
  'DM Serif Text',
  'EB Garamond',
  'Fredericka the Great',
  'Graduate',
  'Gruppo',
  'Hammersmith One',
  'Italianno',
  'Kelly Slab',
  'Kodchasan',
  'Libre Baskerville',
  'Limelight',
  'Lobster Two',
  'Monoton',
  'Montserrat',
  'Montserrat Alternates',
  'Nixie One',
  'Oleo Script',
  'Oranienbaum',
  'Oswald',
  'Padyakke Expanded One',
  'Pirata One',
  'Poiret One',
  'Press Start 2P',
  'Quicksand',
  'Rampart One',
  'Roboto',
  'Rubik Gemstones',
  'Rubik Vinyl',
  'Sen',
  'Tenor Sans',
  'Tilt Prism',
  'Yesteryear',
]
const plus = document.getElementById("logoPlus");
const typo = document.getElementById("logoTypo");
const plusFont = document.getElementById("plus-font");
const typoFont = document.getElementById("typo-font");
const logo = document.querySelector(".gnb-logo");
const changeLogoTime = 10000;
const logoText = 'plusTYPO';
let currentIndex = 0;
let opacity = 0;

const randomFont = () => {
  const randomIndex = Math.floor(Math.random() * fonts.length);
  return fonts[randomIndex];
}

// const randomColor = () => {
//   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
//   return `#${randomColor}`;
// }

const randomLetterStyle = () => {
  addLogoText();
  plus.style.fontFamily = randomFont();
  typo.style.fontFamily = randomFont();
  setTimeout(deleteLogoText, changeLogoTime - 2000);
}

const addLogoText = () => {
  const plusLoop = setInterval(() => {
    plus.innerHTML += logoText[currentIndex];
    currentIndex++;
    if (currentIndex === 4) {
      clearInterval(plusLoop);
      
      const typoLoop = setInterval(() => {
        typo.innerHTML += logoText[currentIndex];
        currentIndex++;
        if (currentIndex === 8) {
          currentIndex = 0;
          fadeInLogoFont();
          plusFont.innerHTML = plus.style.fontFamily.replace(/\"/gi, '');
          typoFont.innerHTML = typo.style.fontFamily.replace(/\"/gi, '');
          setTimeout(fadeOutLogoFont, changeLogoTime - 2000);
          clearInterval(typoLoop);
        }
      }, 80);
    }
  }, 50);
}

const deleteLogoText = () => {
  const typoLoop = setInterval(() => {
    typo.innerHTML = typo.innerHTML.slice(0, -1);
    if (typo.innerHTML.length === 0) {
      clearInterval(typoLoop);
      
      const plusLoop = setInterval(() => {
        plus.innerHTML = plus.innerHTML.slice(0, -1);
        if (plus.innerHTML.length === 0) {
          clearInterval(plusLoop);
        }
      }, 80);
    }
  }, 50);
}

// blinking type cursor
const fontCursor = document.createElement("span");
fontCursor.innerHTML = "|";
fontCursor.style.fontFamily = "Pretendard Variable";
fontCursor.style.fontWeight = 100;
fontCursor.style.opacity = "0";
fontCursor.style.color = "black";
fontCursor.style.fontSize = "3rem";
fontCursor.style.marginTop = "0.3rem";
logo.appendChild(fontCursor);

const cursorBlinkTime = 500;
const cursorBlink = () => {
  fontCursor.style.opacity = fontCursor.style.opacity === "0" ? "1" : "0";
}
setInterval(cursorBlink, cursorBlinkTime);


const fadeInLogoFont = () => {
  opacity += 0.1;  
  plusFont.style.opacity = opacity;
  typoFont.style.opacity = opacity;
  if (opacity < 1) {
    setTimeout(fadeInLogoFont, 50);
  }
}

const fadeOutLogoFont = () => {
  opacity -= 0.1;  
  plusFont.style.opacity = opacity;
  typoFont.style.opacity = opacity;
  if (opacity > 0) {
    setTimeout(fadeOutLogoFont, 50);
  }
}

randomLetterStyle();
setInterval(randomLetterStyle, changeLogoTime);