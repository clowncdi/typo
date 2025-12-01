const fonts: string[] = [
  "Alfa Slab One",
  "Arima",
  "Arizonia",
  "Black Han Sans",
  "Black Ops One",
  "Blaka Hollow",
  "Bodoni Moda",
  "Bungee",
  "Bungee Shade",
  "Carter One",
  "Cinzel Decorative",
  "Creepster",
  "DM Serif Display",
  "DM Serif Text",
  "EB Garamond",
  "Fredericka the Great",
  "Graduate",
  "Gruppo",
  "Hammersmith One",
  "Italianno",
  "Kelly Slab",
  "Kodchasan",
  "Libre Baskerville",
  "Limelight",
  "Lobster Two",
  "Monoton",
  "Montserrat",
  "Montserrat Alternates",
  "Montserrat Subrayada",
  "Nixie One",
  "Oleo Script",
  "Oranienbaum",
  "Oswald",
  "Pacifico",
  "Padyakke Expanded One",
  "Pirata One",
  "Poiret One",
  "Press Start 2P",
  "Quicksand",
  "Rampart One",
  "Roboto",
  "Rubik Gemstones",
  "Rubik Vinyl",
  "Sen",
  "Stalemate",
  "Tenor Sans",
  "Tilt Prism",
  "Waterfall",
  "Yesteryear",
];
const plus = document.getElementById("logoPlus") as HTMLElement;
const typo = document.getElementById("logoTypo") as HTMLElement;
const plusFont = document.getElementById("plus-font") as HTMLElement;
const typoFont = document.getElementById("typo-font") as HTMLElement;
const logo = document.querySelector(".gnb-logo") as HTMLElement;
const LOGO_TEXT: string = "plusTYPO";
const CHANGE_LOGO_TIME: number = 10000;
let currentIndex: number = 0;
let opacity: number = 0;

const randomFont = () => {
  const randomIndex = Math.floor(Math.random() * fonts.length);
  return fonts[randomIndex];
};

// const randomColor = () => {
//   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
//   return `#${randomColor}`;
// }

const randomLetterStyle = () => {
  addLogoText();
  plus.style.fontFamily = randomFont();
  typo.style.fontFamily = randomFont();
  setTimeout(deleteLogoText, CHANGE_LOGO_TIME - 2000);
};

const addLogoText = () => {
  const plusLoop = setInterval(() => {
    if (plus.innerText.length < 4) {
      plus.innerHTML += getLogoText(LOGO_TEXT[currentIndex]);
      currentIndex++;
    }
    if (currentIndex === 4) {
      clearInterval(plusLoop);

      const typoLoop = setInterval(() => {
        if (typo.innerText.length < 4) {
          typo.innerHTML += getLogoText(LOGO_TEXT[currentIndex]);
          currentIndex++;
        }
        if (currentIndex === 8) {
          currentIndex = 0;
          fadeInLogoFont();
          plusFont.innerHTML = plus.style.fontFamily.replace(/\"/gi, "");
          typoFont.innerHTML = typo.style.fontFamily.replace(/\"/gi, "");
          setTimeout(fadeOutLogoFont, CHANGE_LOGO_TIME - 2000);
          clearInterval(typoLoop);
        }
      }, 80);
    }
  }, 50);
};

const getLogoText = (text: string) => {
  return text !== undefined ? text : "";
};

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
};

// blinking type cursor
const fontCursor = document.createElement("span");
fontCursor.innerHTML = "|";
fontCursor.style.fontFamily = "Pretendard Variable";
fontCursor.style.fontWeight = '100';
fontCursor.style.opacity = "0";
fontCursor.style.color = "black";
fontCursor.style.fontSize = "3rem";
fontCursor.style.marginTop = "0.3rem";
logo.appendChild(fontCursor);

const cursorBlinkTime = 500;
const cursorBlink = () => {
  fontCursor.style.opacity = fontCursor.style.opacity === "0" ? "1" : "0";
};
setInterval(cursorBlink, cursorBlinkTime);

const fadeInLogoFont = () => {
  opacity += 0.1;
  plusFont.style.opacity = String(opacity);
  typoFont.style.opacity = String(opacity);
  if (opacity < 1) {
    setTimeout(fadeInLogoFont, 50);
  }
};

const fadeOutLogoFont = () => {
  opacity -= 0.1;
  plusFont.style.opacity = String(opacity);
  typoFont.style.opacity = String(opacity);
  if (opacity > 0) {
    setTimeout(fadeOutLogoFont, 50);
  }
};

class LogoState {
  isVisible: boolean;
  intervalId: number;

  constructor() {
    this.isVisible = this.scrollVisible();
    this.intervalId = this.initIntervalId();
  }

  scrollVisible() {
    return logo.getBoundingClientRect().top > -100;
  }

  initIntervalId() {
    return this.scrollVisible() ? setInterval(randomLetterStyle, CHANGE_LOGO_TIME) : 0;
  }

  getIntervalId() {
    return this.intervalId;
  }

  setLogoState(visible: Visible) {
    this.isVisible = visible === "visible";
  }

  handleLogoEvent() {
    if (this.isVisible && this.intervalId > 0) {
      return;
    } else if (this.isVisible && this.intervalId === 0) {
      this.intervalId = setInterval(randomLetterStyle, CHANGE_LOGO_TIME);
    } else if (!this.isVisible) {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    }
    
  }

  handleLogoChange(visible: Visible) {
    this.setLogoState(visible);
    this.handleLogoEvent();
  }
}

type Visible = "visible" | "hidden";
let logoState = new LogoState();

// intervalIdchange event
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    logoState = logoState === undefined ? new LogoState() : logoState;
    let result = logoState.scrollVisible() ? "visible" : "hidden";
    logoState.handleLogoChange(result as Visible);
  } else {
    logoState.getIntervalId() !== 0 && clearInterval(logoState.getIntervalId());
    logoState.intervalId = 0;
  }
});

randomLetterStyle();
logoState.handleLogoChange('visible');

// scroll event
document.addEventListener("scroll", () => {
  let result = logoState.scrollVisible() ? "visible" : "hidden";
  logoState.handleLogoChange(result as Visible);
});
