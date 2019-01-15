
module.exports = function(defaultPackage) {
  return [
    {
      type: 'input',
      name: 'className',
      message: 'Class name'
    }, {
      type: 'input',
      name: 'classPackage',
      message: 'Class package',
      default: defaultPackage
    }, {
      type: 'input',
      name: 'classDescription',
      message: 'Class description'
    }
  ]
}
