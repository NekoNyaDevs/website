<img src="https://nekonya.classy.works/static/assets/banner.png">

# 🌿・NekoNya, the world of nekos

Welcome to the official repository of NekoNya.

## ❓・NekoNya, what is it?

NekoNya is an anime and neko themed utility website that contains a lot of features, such as:
- An API
- A random neko image picker
- A random anime image picker
- - Hugs, pats, and more!
- Some new features will come up soon!

## 📝・How to use the API?

The API is very simple to use, you just have to make a GET request to the API endpoint, and you will get a JSON response.
Example:
```js
import fetch from 'node-fetch';

(async () => {
    const url = await fetch('https://nekonya.classy.works/api/v1/random/neko')
        .then(res => res.json())
        .then(json => json.url);
    console.log(url);
})()
```
If you prefer to use one of our wrappers:
- [JavaScript/TypeScript](https://www.npmjs.com/package/nekonya.js)
- Java - Still in development!

## 📜・License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧・Contact

You can contact me on [WorldWild Studios](https://worldwild.studio) official [Discord](https://discord.gg/Vh4bnWP5tc), or you can use my [contact email](mailto:contact@classy.works).