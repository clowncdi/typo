export {};

declare global {
  interface Window {
    // gtag: (param1: string, param2: string, param3?: object) => void;
    dataLayer: Gtag.Gtag[];
  }
}



window.dataLayer = window.dataLayer || [];
function gtag(...args) {
  window.dataLayer.push(...args);
}

gtag('js', new Date());
gtag("config", 'G-0T4BVMKTXC');