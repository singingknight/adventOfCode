module.exports = function (w) {

  return {
    files: [
      'src/*.ts'
    ],

    tests: [
      'test/**/*.ts'
    ],

    env: {
      type: 'node'
    },
    testFramework: 'jasmine',

    compilers: {
      '**/*.ts?(x)': w.compilers.typeScript({
          typescript: require('typescript'),
      })
    }
  }
}
