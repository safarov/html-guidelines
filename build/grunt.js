/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      scripts: {
        files: '<config:lint.files>',
        tasks: 'concat'
      },
      css: {
        files: ['../blocks/**/*.css','../blocks/**/*.styl','../blocks/**/*.less'],
        tasks: 'styletto:dev styletto:dev_ie'
      }
    },
    styletto: {
      dev: {
        src: "../blocks/style.css",
        dest: "../publish/_style.css",
        compress: false,
        base64: false,
        resolveFrom: ""
      },
      dev_ie: {
        src: "../blocks/style.ie.css",
        dest: "../publish/_style.ie.css",
        compress: false,
        base64: false,
        resolveFrom: ""
      },
      publish: {
        src: "../blocks/style.css",
        dest: "../publish/_style.min.css",
        compress: true,
        base64: true,
        resolveFrom: ""
      },
      publish_ie: {
        src: "../blocks/style.ie.css",
        dest: "../publish/_style.ie.min.css",
        compress: true,
        base64: true,
        resolveFrom: ""
      }
    },
    meta: {
      version: '0.1.0',
      banner: '/*! JAM-BOILERPLATE - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'YOUR_NAME; Licensed MIT */'
    },
    lint: {
      files: ['grunt.js', '../lib/**/*.js', '../blocks/**/*.js']
    },
    concat: {
      dist: {
        src: ['../lib/**/*.js', '../blocks/**/*.js'],
        dest: '../publish/_script.js'
      }
    },
    min: {
      dist: {
        src: '<config:concat.dist.dest>',
        dest: '../publish/_script.min.js'
      }
    },
    exec: {
        remove_old_files: {
            command: 'rm -rf ../publish/*'
        },
        optimize_images: {
            command: 'imgo -b -m ../blocks/*',
            stdout: true,
            stderr: true
        }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  grunt.loadNpmTasks('grunt-styletto');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-css');

  grunt.registerTask('default', 'concat styletto:dev styletto:dev_ie');
  grunt.registerTask('watcher', 'concat styletto:dev styletto:dev_ie watch');
  grunt.registerTask('publish', 'exec styletto concat lint min');

};
