var webpack = require('webpack');

module.exports = {
    
    entry:  __dirname + "/frontend/app.js",
    output: {
        path: __dirname + "/public/javascripts",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
}