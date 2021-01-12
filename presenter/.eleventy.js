const nunjucks = require('nunjucks')
const postcss = require('postcss')
const path = require('path')
<<<<<<< HEAD
const svgContents = require('eleventy-plugin-svg-contents')

module.exports = config => {
  config.addNunjucksAsyncShortcode('postcss', async code => {
=======

module.exports = config => {
  console.log('config ran, at least')
  config.addNunjucksAsyncShortcode('postcss', async code => {
    console.log('ADDEDDDDD!!!')
>>>>>>> 7595816276ad89a13a59c8b88d9f97be1606bc61
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
<<<<<<< HEAD

  config.addPlugin(svgContents)
=======
>>>>>>> 7595816276ad89a13a59c8b88d9f97be1606bc61
}
