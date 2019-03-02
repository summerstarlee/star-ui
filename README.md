# sst-vue-lib

A commom library for sst project using VUE

## precondition

 When first link lib to your project, To ensure that the project has been installed in a gulp.

```bash
npm install gulp --save-dev
```
In the root directory, create a new `gulpfile.js` file. 
```js
const gulp = require('gulp')

gulp.task('link',() => {
  gulp.src('../sst-vue-lib/**')
    .pipe(gulp.dest('./src/components/sst-vue-lib'))
})

```

add property to `script` in `webpack.json`

```json
"scripts": {
    ...
    "link": "gulp link",
    ...
  }
```

add lib to your project 
```bash 
npm run link
```

**if had lined, your need to run `npm run gulp` again to ensure that lib always is latest version**

## usage

```js
// main.js

import SstLib form '@/components/sst-vue-lib'

Vue.use(SstLib)
```

```vue
<!--templete.vue-->

<sst-button />

```


## Single files use (unfinished)

Run the command under the `sst-vue-lib` root directory

```bash 
# install packages
npm install 

# generate Single files
npm run build
```

