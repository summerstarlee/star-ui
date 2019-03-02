/**
 * Created By shli on 2018/10/22
 */
const fs = require('fs')
const path = require('path')
let Components = require('../../components.json')

const themes = ['theme-chalk']

Components = Object.keys(Components)

const basePath = path.resolve(__dirname, '../../packages/')

function fileExists(filePath) {
  try{
    return fs.statSync(filePath).isFile()
  }catch(err){
    return false
  }
}

themes.forEach(theme => {
  let isSCSS = theme !== 'theme-default'
  let indexContent = isSCSS ? '@import "./base.scss"; \n' : '@import "./base.css \n";'

  Components.forEach(key => {
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return
    let fileName = key + (isSCSS ? '.scss' : '.css')
    indexContent += '@import "./' + fileName + '"; \n'

    let filePath = path.resolve(basePath, theme, 'src', fileName)

    if(!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf-8')
    }
  })
  fs.writeFileSync(path.resolve(basePath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent)
})
