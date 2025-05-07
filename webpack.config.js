const path = require('path');
// const marked = require("marked");
// const renderer = new marked.Renderer();

// renderer.image = function image(href, title, text) {
//     console.log(href);
//     console.log(title);
//     console.log(text);
//     return "<img src=\"" + href +"\" alt=\"alt\"/>"
// };

module.exports = {
    entry: './src/index.js',
    // mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            // {
            //     test: /\.md$/,
            //     use: [
            //         {
            //             loader: "html-loader"
            //         },
            //         {
            //             loader: "markdown-loader",
            //             options: {
            //                 pedantic: true,
            //                 renderer
            //             }
            //         }
            //     ]
            // },
        ],
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname)
          },
        compress: true,
        port: 9000
    }
};