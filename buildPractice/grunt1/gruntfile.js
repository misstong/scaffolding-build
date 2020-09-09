// module.exports = grunt => {
//     grunt.registerTask('foo', () => {
//         console.log('hello grunt')
//     })
// }


const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            }
        }
    })

    // grunt.loadNpmTasks('grunt-sass')

    loadGruntTasks(grunt)
    grunt.registerTask('default', ['sass','babel','watch'])

}