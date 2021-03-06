// module.exports = grunt => {
//     grunt.registerTask('foo', () => {
//         console.log('hello grunt')
//     })
// }

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
        clean: ['dist','.tmp','build'],
        copy: {
            main: {
                files: [
                    {expand: true, src:['public/*'],dest: 'build'},
                    {expand:true, src: ['assets/fonts/*','assets/images/*'],dest:'build',cwd:'src'}
                ]
            },
            build: {
                files: [
                    {expand:true, src: ['*.html'],dest:'build',cwd:'dist'}
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
               assetsDirs: ['build/assets'],
           } 
        },
        browserSync: {
            bsFiles: {
                src : ['dist/**','public/**','src/**']
            },
            options: {
                server: {
                    baseDir: "./"
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-sass')
    grunt.loadNpmTasks('grunt-swig-precompile');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    loadGruntTasks(grunt)
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('build', [
        'clean','sass','babel','swig_precompile',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        // 'filerev',
        'usemin',
        'copy'
      ]);

    grunt.registerTask('clear', 'clean')
    grunt.registerTask('compile', ['clean','sass','babel','swig_precompile']) //,'watch'
    grunt.registerTask('extra', 'copy')
    grunt.registerTask('serve','browserSync')

}