export {};

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

window.dataLayer = window.dataLayer || [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtag(...args: any[]) {
  window.dataLayer.push(args);
}

gtag('js', new Date());
gtag('config', 'G-0T4BVMKTXC');