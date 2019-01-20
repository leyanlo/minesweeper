// Global CSS
import './src/global.css';
import 'typeface-source-sans-pro';
import 'typeface-source-serif-pro';
import FontFaceObserver from 'fontfaceobserver';

const typefaces = {
  'Source Sans Pro': [
    { weight: 400, style: 'normal' },
    { weight: 600, style: 'normal' }
  ],
  'Source Serif Pro': [{ weight: 600, style: 'normal' }]
};

Object.keys(typefaces).forEach(name => {
  const variants = typefaces[name].map(variant => {
    const loader = new FontFaceObserver(name, variant);
    return loader.load();
  });
  Promise.all(variants).then(() => {
    document.body.classList.add(name.replace(/ /g, ''));
  });
});
