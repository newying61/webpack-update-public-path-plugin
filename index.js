function WebpackUpdatePublicPathPlugin(options) {
    this.options = options;
    this._name = 'WebpackUpdatePublicPathPlugin';
}

function updatePublicPath(path, source) {
    // Ensure empty assets do not become non-empty because of this plugin.
    if(!source) { return source; }
    var newSource = [];
    newSource.push(source);
    newSource.push('if( typeof __webpack_require__ !== "undefined" ) {');
    newSource.push('    __webpack_require__.p = ' + path + ';');
    newSource.push('}');

    return newSource.join('\n');
}

WebpackUpdatePublicPathPlugin.prototype.apply = function (compiler) {
    const self = this;
    var publicPath = this.options && this.options.publicPath;

    if (!publicPath) {
        console.warn('WebpackUpdatePublicPathPlugin: No publicPath provided, do nothing.');
        return;
    }

    // For webpack 4.0 and above
    if (compiler.hooks && compiler.hooks.thisCompilation) {
        compiler.hooks.thisCompilation.tap(self._name, function (compilation) {
            compilation.mainTemplate.hooks.requireExtensions.tap(self._name, function (source, chunk, hash) {
                return updatePublicPath(publicPath, source);
            });
        });
    } else {
        compiler.plugin('this-compilation', function (compilation) {
            compilation.mainTemplate.plugin('require-extensions', function (source, chunk, hash) {
                return updatePublicPath(publicPath, source);
            });
        });
    }
};

module.exports = WebpackUpdatePublicPathPlugin;
