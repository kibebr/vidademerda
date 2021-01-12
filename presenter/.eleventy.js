const nunjucks = require('nunjucks')
const postcss = require('postcss')
const path = require('path')
const svgContents = require('eleventy-plugin-svg-contents')

module.exports = config => {
  config.addNunjucksAsyncShortcode('postcss', async code => {
    const filepath = path.join(__dirname, '_includes/index.css')
    return await postcss([require('cssnano')])
      .process(code, { from: filepath })
      .then(res => res.css)
  })

  const nunjucksEnvironment = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(['_includes/'],
      {
        watch: true,
        lstripBlocks: true,
        trimBlocks: true,
      })
  );
  config.setLibrary('njk', nunjucksEnvironment);

  config.addPlugin(svgContents)
}
