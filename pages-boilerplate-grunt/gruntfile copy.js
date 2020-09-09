// module.exports = grunt => {
//     grunt.registerTask('foo', () => {
//         console.log('hello grunt')
//     })
// }

// const mozjpeg = require('imagemin-mozjpeg');
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
const data={
    pkg: require('./package.json'),
    date: new Date()
}
module.exports = grunt => {
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'dist/assets/styles/main.css': 'src/assets/styles/main.scss'
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
                    'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
                }
            }
        },
        swig_precompile: {
            options: {
              active: '',
              locals:  data,
              beautify: {
                indent_size: 2
              }
            },
            dev: {
              expand: true,
              cwd: "src",
              src: "*.html",
              dest: "dist"
            }
          },
        // swig: {
        //     options: {
        //         data
        //     },
        //     expand:true,
        //     cwd:'src',
        //     dest: 'dist/',
        //     src: ['*.html'],
        //     ext: '.html'
        // },
        watch: {
            js: {
                files: ['src/assets/scripts/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/assets/styles/*.scss'],
                tasks: ['sass']
            }
        },
        clean: ['dist','.tmp'],
        copy: {
            main: {
                files: [
                    {expand: true, src:['public/*'],dest: 'dist'}
                ]
            }
        },
        useminPrepare: {
            html: 'dist/index.html',
            options: {
                dest: 'build',
                root: ['dist','.']
            }
        },
        usemin: {
           html: 'dist/index.html',
           options: {
               assetsDirs: ['build/assets']
           } 
        }
        // imagemin: {
        //     dynamic: {
        //         files: [{
        //             expand: true,
        //             cwd: 'src/assets/images',
        //             src: ['*.{png,svg}'],
        //             dest: 'dist/'
        //         }]
        //     }
        // },
        // useref: {
        //     html: 'dist/*.html',
        //     temp: ['dist','.'],
        //     css: 'dist/assets/styles'
        // }
    })

    // grunt.loadNpmTasks('grunt-sass')
    // grunt.loadNpmTasks('grunt-swig-templates');
    grunt.loadNpmTasks('grunt-swig-precompile');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // grunt.loadNpmTasks('grunt-useref');
    loadGruntTasks(grunt)
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.registerTask('build', [
        'useminPrepare',
        'concat',
        'cssmin',
        // 'uglify',
        // 'filerev',
        'usemin'
      ]);
    // grunt.registerTask('default', ['useref','concat', 'uglify', 'cssmin']);
    // grunt.registerTask('default', ['imagemin']);
    grunt.registerTask('clear', 'clean')
    grunt.registerTask('compile', ['sass','babel','swig_precompile']) //,'watch'
    grunt.registerTask('extra', 'copy')
    // grunt.registerTask('page', 'swig_precompile')

}