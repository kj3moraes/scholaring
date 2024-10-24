![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/JusGu/uwatering.svg)
[![W3C Validation - https://validator.nu/](https://img.shields.io/w3c-validation/default?targetUrl=https%3A%2F%2Fcs.uwatering.com%2F&label=w3c%20check
)](https://validator.nu/?doc=https%3A%2F%2Fcs.uwatering.com%2F)
![GitHub stars](https://img.shields.io/github/stars/JusGu/uwatering.svg?style=social)
<h1 style="display: flex; align-items: center; gap: 10px;">
<img src="./icon.red.svg" alt="CS Logo" height="32px">
CS Webring
</h1>

A webring for Computer Science students and alumni at the University of Waterloo.

[Live Site](https://cs.uwatering.com/)

## Join the Webring

Add the webring widget to your website:
#### HTML:
```html
<div style="display: flex; align-items: center; gap: 8px;">
    <a href="https://cs.uwatering.com/#your-site-here?nav=prev">←</a>
    <a href="https://cs.uwatering.com/#your-site-here" target="_blank">
        <img src="https://cs.uwatering.com/icon.black.svg" alt="CS Webring" style="width: 24px; height: auto; opacity: 0.8;"/>
    </a>
    <a href="https://cs.uwatering.com/#your-site-here?nav=next">→</a>
</div>
<!-- Replace 'your-site-here' with your actual site URL -->
```

#### JSX:
```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <a href='https://cs.uwatering.com/#your-site-here?nav=prev'>←</a>
    <a href='https://cs.uwatering.com/#your-site-here' target='_blank'>
        <img
            src='https://cs.uwatering.com/icon.black.svg'
            alt='CS Webring'
            style={{ width: '24px', height: 'auto', opacity: 0.8 }}
        />
    </a>
    <a href='https://cs.uwatering.com/#your-site-here?nav=next'>→</a>
</div>
// Replace 'your-site-here' with your actual site URL
```

### Steps to Join

1) Add the webring widget to your website HTML (shown above). Generally, you should add it to the footer.
2) Add your information to the `webring.json` file in this format:
   ```json
   {
     "name": "Your Name",
     "website": "https://your-website.com",
     "year": "2028"
   }
   ```
3) Submit a Pull Request with:
   - The location of the webring icon on your site
   - Your website URL
   - Your graduation year

For dark-themed websites, use `icon.white.svg`. Feel free to host the icon locally if you encounter HTTPS issues / styling issues.

## Navigation



## Alternative Icons Sources
- Black: `https://cs.uwatering.com/icon.black.svg`
- White: `https://cs.uwatering.com/icon.white.svg`
- Red: `https://cs.uwatering.com/icon.red.svg`

## Credits & Inspiration

This project draws inspiration from:
- [XXIIVV Webring](https://webring.xxiivv.com/)
- [SE Webring](https://se-webring.xyz/)
- [ECE Engineering](https://ece.engineering/)

## Made in Waterloo 🍁
