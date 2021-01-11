# webpack-update-public-path-plugin

A Webpack plugin that is used to update Webpack modules public path.

## install
```
npm i webpack-update-public-path-plugin
```
or
```
yarn add webpack-update-public-path-plugin
```

## Ways to update web pack public path
1. For Apps using create-react-app, add the homepage in package.json to change public path.
    ```
    "homepage": "/new-public-path",
    ```
    Also, this support relative path.
    ```
    "homepage": ".",
    ```
    Another way is define PUBLIC_URL environment variable somewhere in your build pipeline.

1. Webpack now provide config to change public path. [See webpack guide page](https://webpack.js.org/guides/public-path/).
    In webpack config file set output:
    ```
    output: {
      publicPath: '/some-path'
    },
    ```
1. Change webpack public path on the fly.

    Webpack prefined a variable __webpack_public_path__.
    ```
    __webpack_public_path__ = window.location.pathname;
    ```

    This variable will be replaced by __webpack_require__.p in build time, that's how webpack changes the public path.

## Configuration

```
const UpdatePublicPathPlugin = require("webpack-update-public-path-plugin")
```

```js
    plugins: [
        ...
        new UpdatePublicPathPlugin({
            publicPath: JSON.stringify('/foo/bar/')
        })
        ...
    ]
```

## After build
The following line will be added
```js
/******/        __webpack_require__.p = '/foo/bar';
```
after
```js
/******/        // __webpack_public_path__
/******/        __webpack_require__.p = "/";
```

Public path is changed to '/foo/bar'.

# Reason for this plugin
In fact, I don't see so many usecases for this plugin.

Just other similar plugins are out of date, So providing one in case anyone needs it.
