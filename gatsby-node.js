const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        plugins: [
            new MonacoWebpackPlugin({
                // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
                languages: ['markdown', 'javascript']
            })
        ]
    })
} 