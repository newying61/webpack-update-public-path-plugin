# webpack-update-public-path-plugin

A Webpack plugin that is used to update Webpack modules public path.


Webpack now provide config to change public path.
[See webpack guide page](https://webpack.js.org/guides/public-path/).


For Apps using Create-React-App, add the following line in package.json to change public path.
```
"homepage": "/new-public-path",
```

## Configuration

```
const RuntimePublicPathPlugin = require("webpack-runtime-public-path-plugin")
```

```json
    plugins: [
        ...
        new UpdatePublicPathPlugin({
            publicPath: "'/foo/bar/'"
        })
        ...
    ]
```

## Result

```js
/******/        // __webpack_public_path__
/******/        __webpack_require__.p = "/";
```

Will be replaced to:

```js
/******/        // __webpack_public_path__
/******/        __webpack_require__.p = '/foo/bar/';
```