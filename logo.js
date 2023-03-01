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
const changeLogoTime = 5000;

const randomFont = () => {
  const randomIndex = Math.floor(Math.random() * fonts.length);
  return fonts[randomIndex];
}

// const randomColor = () => {
//   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
//   return `#${randomColor}`;
// }

const randomLetterStyle = () => {
  fadeInLogo();
  plus.style.fontFamily = randomFont();
  typo.style.fontFamily = randomFont();
  plusFont.innerHTML = plus.style.fontFamily.replace(/\"/gi, '');
  typoFont.innerHTML = typo.style.fontFamily.replace(/\"/gi, '');
  setTimeout(fadeOutLogo, changeLogoTime - 1000);
}

let opacity = 0;

const fadeInLogo = () => {
  opacity += 0.1;  
  plus.style.opacity = opacity;
  typo.style.opacity = opacity;
  if (opacity < 1) {
    setTimeout(fadeInLogo, 50);
  }
}

const fadeOutLogo = () => {
  opacity -= 0.1;  
  plus.style.opacity = opacity;
  typo.style.opacity = opacity;
  if (opacity > 0) {
    setTimeout(fadeOutLogo, 50);
  }

}
randomLetterStyle();
setInterval(randomLetterStyle, changeLogoTime);