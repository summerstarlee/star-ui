/**
 * Created By shli on 2018/10/17
 */

const postcss = require('postcss')
const fs = require('fs')
const path = require('path')
const fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf-8')
const nodes = postcss.parse(fontFile).nodes
let classList = []

nodes.forEach((node) => {
  let selector = node.selector || ''
  let reg = new RegExp(/\.sst-icon-([^:]+):before/)
  let arr = selector.match(reg)

  if(arr && arr[1]) {
    classList.push(arr[1])
  }
})

fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {})
