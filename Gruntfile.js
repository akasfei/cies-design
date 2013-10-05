/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    target: 'dist',
    production: false,
    banner: '/**\n' +
              '* <%= pkg.name %> v<%= pkg.version %>\n' +
              '* Web-Essentials development package by <%= pkg.author %>\n' +
              '*/\n',
    jqueryCheck: 'if (!jQuery) { throw new Error(\"jQuery is required\") }\n\n',

    assemble: {
      // Task-level options
      options: {
        prettify: {indent: 2},
        marked: {sanitize: false},
        production: false,
        data: 'src/data/*.{json,yml}',
        helpers: 'src/helpers/helper-*.js',
        layout: 'src/layouts/h5.hbs',
        partials: ['src/includes/**/*.hbs'],
      },
      site: {
        // Target-level options
        files: [
          { expand: true, cwd: 'src/pages', src: ['*.hbs'], dest: '<%= target %>/' }
        ]
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      dist: ['dist']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/application.js', 'js/app-*.js']
      },
      lib: {
        src: ['lib/js/*.js']
      }
    },

    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'lib/js/transition.js',
          'lib/js/alert.js',
          'lib/js/button.js',
          'lib/js/carousel.js',
          'lib/js/collapse.js',
          'lib/js/dropdown.js',
          'lib/js/modal.js',
          'lib/js/tooltip.js',
          'lib/js/popover.js',
          'lib/js/scrollspy.js',
          'lib/js/tab.js',
          'lib/js/affix.js'
        ],
        dest: 'dist/js/bootstrap.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'dist/js/bootstrap.min.js'
      }
    },

    recess: {
      options: {
        compile: true
      },
      bootstrap: {
        src: ['lib/less/bootstrap.less'],
        dest: 'dist/css/bootstrap.css'
      },
      min: {
        options: {
          compress: true
        },
        src: ['lib/less/bootstrap.less'],
        dest: 'dist/css/bootstrap.min.css'
      },
      style: {
        src: ['less/style.less'],
        dest: 'dist/css/style.css'
      }
    },

    copy: {
      bs_fonts: {
        expand: true,
        cwd: 'lib/fonts',
        src: '**',
        dest: 'dist/fonts'
      },
      assets: {
        expand: true,
        cwd: 'assets',
        src: '**',
        dest: 'dist/assets'
      },
      js: {
        expand: true,
        cwd: 'js',
        src: '**',
        dest: 'dist/js'
      },
    },

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'copy:js']
      },
      recess: {
        files: 'less/*.less',
        tasks: ['recess:style']
      },
      assemble: {
        files: 'src/**/*.hbs',
        tasks: ['assemble']
      },
      assets: {
        files: 'assets/**',
        tasks: ['copy:assets']
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['recess', 'concat', 'uglify', 'copy']);

  grunt.registerTask('default', ['clean', 'jshint', 'build', 'assemble']);

  grunt.registerTask('dev', ['default', 'watch']);

  grunt.registerTask('test', ['default']); // Add other framework tasks when they are available
};