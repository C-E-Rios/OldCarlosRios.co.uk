'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    clean: {
      dist: {
        src: ['dist/*']
      },
    },

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    uncss: {
      dist: {
        files: {
          'dist/css/app.css': ['index.html']
        }
      },
      options: {
        ignore: ['.removeDivs', '.nav', '#navigation', '.active']
      }
    },


    jshint: {
      all: 'js/*.js'
    },
  
    useminPrepare: {
      html: '*.html',
      options: {
        dest: 'dist'
      }
    },

    uglify: {
      my_target: {
        files: {
          'dist/js/app.js': ['js/*.js'],
          'dist/js/vendor/modernizr.js': ['bower_components/js/foundation/modernizr.js'],
          'dist/js/plugins/scripts.js': ['js/plugins/*.js']
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          cache: false
        },
        files: [{
          expand: true,
          cwd: 'images',
          src: ['*.{png,jpg,gif}'],
          dest: 'dist/images/'
        }]
      }
    },

    includes: {
      files: {
        src: ['*.html'],
        dest: 'dist',
        flatten: true,
        cwd: '.',
        options: {
          silent: true,
        }
      }
    },

    usemin: {
      html: ['dist/*.html'],
      css: ['dist/css/*.css'],
      options: {
        dest: 'dist'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd:'',
          src: ['css/**', 'images/**', 'fonts/**', '!**/*.scss', '!bower_components/**'],
          dest: 'dist/'
        }, {
          expand: true,
          flatten: true,
          src: ['bower_components/jquery/jquery.min.js'],
          dest: 'dist/js/vendor/',
          filter: 'isFile'
        }, {
          expand: true,
          flatten: true,
          src: ['bower_components/foundation/js/foundation.min.js'],
          dest: 'dist/js/foundation/',
          filter: 'isFile'
        }]
      },
    },
    
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      livereload: {
        files: ['*.html', 'js/{,*/}*.js', 'css/{,*/}*.css', 'images/{,*/}*.{jpg,gif,svg,jpeg,png}'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      app: {
        options: {
          port: 9000,
          base: '',
          livereload: true
        }
      },
      dist: {
        options: {
          port: 9001,
          base: 'dist/',
          keepalive: true,
          livereload: false
        }
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');



  grunt.registerTask('build', ['sass', 'jshint', 'uglify']);
  grunt.registerTask('default', ['build', 'connect:app', 'watch']);
  grunt.registerTask('server-dist', ['connect:dist']);
  grunt.registerTask('publish', ['clean:dist', 'useminPrepare', 'build', 'imagemin', 'includes', 'usemin', 'copy:dist']);
}