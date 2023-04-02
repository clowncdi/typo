import {isEmpty} from "./common";

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
const plus: HTMLElement = isEmpty(document.getElementById("logoPlus"));
const typo: HTMLElement = isEmpty(document.getElementById("logoTypo"));
const plusFont: HTMLElement = isEmpty(document.getElementById("plus-font"));
const typoFont: HTMLElement = isEmpty(document.getElementById("typo-font"));
const logo: HTMLElement = isEmpty(document.querySelector(".gnb-logo") as HTMLElement);
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
  isLogoVisible: boolean | null | undefined;
  visibility: number | undefined;

  constructor() {
    this.isLogoVisible = this.getLogoVisibility();
    this.visibility = setInterval(randomLetterStyle, CHANGE_LOGO_TIME);
  }

  getLogoVisibility(visible?: string): boolean | null | undefined {
    let boundary = logo.getBoundingClientRect().top > -100;
    if (visible === "visible" && boundary === true) {
      // visiblityState event
      return true;
    }
    if (isEmpty(this.visibility) > 0 && boundary === true) {
      // 이미 진행중인 경우
      return null;
    } else if (
      boundary === true &&
      (this.visibility === undefined || this.isLogoVisible === null)
    ) {
      return boundary;
    } else if (isEmpty(this.visibility) > 0 && boundary === false) {
      // 로고가 지정영역을 벗어난 경우
      return boundary;
    }
  }

  getLogoState() {
    return this.isLogoVisible;
  }

  setLogoState(visible?: string) {
    this.isLogoVisible = this.getLogoVisibility(visible);
  }

  getVisibility() {
    return this.visibility;
  }

  handleLogoEvent() {
    if (this.isLogoVisible === null || this.isLogoVisible === undefined) {
      return;
    }
    if (this.isLogoVisible) {
      this.visibility = setInterval(randomLetterStyle, CHANGE_LOGO_TIME);
    } else if (!this.isLogoVisible) {
      clearInterval(this.visibility);
      this.visibility = undefined;
    }
  }

  handleLogoChange(visible?: string) {
    this.setLogoState(visible);
    this.handleLogoEvent();
  }
}

const logoState = new LogoState();

// visibilitychange event
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    logoState.handleLogoChange("visible");
  } else {
    clearInterval(logoState.getVisibility());
  }
});

randomLetterStyle();
logoState.handleLogoChange();

// scroll event
document.addEventListener("scroll", () => {
  logoState.handleLogoChange();
});
