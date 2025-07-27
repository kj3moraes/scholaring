![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/JusGu/uwatering.svg)
[![W3C Validation - https://validator.nu/](https://img.shields.io/w3c-validation/default?targetUrl=https%3A%2F%2Fcs.uwatering.com%2F&label=w3c%20check)](https://validator.nu/?doc=https%3A%2F%2Fcs.uwatering.com%2F)
![GitHub stars](https://img.shields.io/github/stars/JusGu/uwatering.svg?style=social)

<figure>
  <img src="./webAssets/Banner.png" alt="Thumbnail logo">
  <figcaption style="text-align: center; font-style: italic;">
    A webring for the Cansbridge scholars. If you're a Scholar, feel free to join in by making a PR.</a>.
  </figcaption>
</figure>

## Joining the Webring

1. Add the webring widget to your website HTML ([template below](#widget-template)). Generally, you should add it to the footer.
2. Fork this repo and add your information to the **BOTTOM** of `webringData[]` in `index.html` following this format:
   ```json
   {
     "name": "Your Name",
     "cohort": "Cohort Name"
     "website": "https://your-website.com",
   }
   ```
3. Submit a Pull Request! We'll try to review as fast as we can.

## Widget template

<img width="150" alt="image" src="https://github.com/user-attachments/assets/66c9e57a-c5ba-4426-b651-b9a37d74e198">

Since every website is unique, we suggest you add your own flair to the lion. We also know that design is hard, so here are some examples to get you started:

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

For dark-themed websites, use `icon.white.svg`. Feel free to host the icon locally if you encounter HTTPS issues / styling issues.

## Alternative Icons Sources

- Black: `https://cs.uwatering.com/icon.black.svg`
- White: `https://cs.uwatering.com/icon.white.svg`
- Red: `https://cs.uwatering.com/icon.red.svg`

If none of these quite work for you, feel free to make your own. If you're using React, start with [icon.custom.tsx](./icon.custom.tsx).

## Credits & Inspiration

This project is inspired by and forked from [UWCS Webring](https://cs.uwatering.com/). Their Github is over [here](https://github.com/JusGu/uwatering?tab=readme-ov-file). I've based this implementation of theirs, but with a slight twist for the Cansbridge Scholars. 

Keane currently maintains this site, so if you see any bugs please let me know by making an issue on here.
