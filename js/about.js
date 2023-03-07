const ABOUT_TEXT = `You can easily combine photos and text to create images for Instagram. Not only that, but you can also create cover images for your blog or create your own thumbnail images. Play around with it, it's that easy!`;
const textFront = document.getElementById('textFront');
textFront.value = ABOUT_TEXT;

document.addEventListener('DOMContentLoaded', () => {
  textFront.parentElement.classList.add('loaded');
})