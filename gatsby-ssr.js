const React = require('react')

exports.onPreRenderHTML = ({
    getPostBodyComponents,
    replacePostBodyComponents,
}) => {
    const comps = getPostBodyComponents()
    comps.push(
        <script
            src="https://cdn.jsdelivr.net/npm/mathjax@3.0.5/es5/tex-mml-chtml.js"
            id="MathJax-script"
        />,
    )
    replacePostBodyComponents(comps)
}