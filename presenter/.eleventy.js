const nunjucks = require('nunjucks')
const postcss = require('postcss')
const path = require('path')

module.exports = config => {
  console.log('config ran, at least')
  config.addNunjucksAsyncShortcode('postcss', async code => {
    console.log('ADDEDDDDD!!!')
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
}
