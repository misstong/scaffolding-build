// 实现这个项目的构建任务

const { src, dest, series, parallel, watch} = require('gulp')
const del = require('del')
const browserSync = require('browser-sync')
const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()
const bs = browserSync.create()
const data={
    pkg: require('./package.json'),
    date: new Date()
}

const clean = () => {
    return del(['dist','tmp'])
}

const style = () => {
    return src('src/assets/styles/*.scss',{base:'src'})
        .pipe(plugins.sass({outputStyle: 'expanded'}))
        .pipe(dest('tmp'))
}

const script = () => {
    return src('src/assets/scripts/*.js',{base: 'src'})
        .pipe(plugins.babel({presets:['@babel/preset-env']}))
        .pipe(dest('tmp'))
}

const page = () => {
    return src('src/*.html', {base:'src'})
        .pipe(plugins.swig(data))
        .pipe(dest('tmp'))
}

const image = () => {
    return src('src/assets/images/**',{base: 'src'})
        // .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const font = () => {
    return src('src/assets/fonts/**',{base: 'src'})
        // .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const extra = () => {
    return src('public/**',{base: 'public'})
        .pipe(dest('dist'))
}

const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/assets/fonts/**', font)
    // watch('src/assets/images/**', image)
    // watch('src/*.html', page)
    // watch('public/**', extra)

    watch([
        'src/assets/images/**',
        'src/*.html',
        'public/**'
    ], bs.reload)
    bs.init({
        notify: false,
        server: {
            baseDir: ['tmp', 'src', 'public'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

const useref = () => {
    return src('tmp/*.html', { base: 'tmp' })
      .pipe(plugins.useref({ searchPath: ['tmp', '.'] }))
      // html js css
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      .pipe(plugins.if(/\.html$/, plugins.htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      })))
      .pipe(dest('dist'))
  }
const compile = parallel(style,script,page)
const build = series(clean, parallel(series(compile, useref),image,font, extra))
const develop = series(compile, serve)
module.exports = {
    clean,
    build,
    develop,
    compile,
    useref
}