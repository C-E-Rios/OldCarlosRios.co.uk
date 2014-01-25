'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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

    clean: {
      dist: {
        src: ['dist/*']
      },
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd:'',
          src: ['css/**', 'js/**', 'images/**', 'fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
          dest: 'dist/'
        }, {
          expand: true,
          flatten: true,
          src: ['bower_components/jquery/jquery.min.js', 'bower_components/modernizr/modernizr.js'],
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

    useminPrepare: {
      html: '*.html',
      options: {
        dest: 'dist'
      }
    },

    usemin: {
      html: ['dist/*.html'],
      css: ['dist/css/*.css'],
      options: {
        dirs: ['dist']
      }
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



  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-usemin');


  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build', 'connect:app', 'watch']);
  grunt.registerTask('server-dist', ['connect:dist']);
  grunt.registerTask('publish', ['clean:dist', 'useminPrepare', 'copy:dist', 'usemin']);
}