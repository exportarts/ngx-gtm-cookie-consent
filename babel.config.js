module.exports = function (api) {
    api.cache(true);

    const presets = [
        "@babel/env",
        "minify"
    ];

    return {
        presets,
        comments: false
    };
}
