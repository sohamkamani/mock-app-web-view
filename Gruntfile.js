module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     src: ['app/js/**/*.js'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   },
    //   generated: {
    //     files: [{
    //       dest: '.tmp/concat/js/app.js',
    //       src: [
    //         'app/js/render_image.js',
    //         'bower_components/lodash/lodash.js'
    //       ]
    //     }]
    //   }
    // },
    useminPrepare: {
      html: 'app/index.html'
    },
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //   },
    //   dist: {
    //     files: {
    //       'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    //     }
    //   },
    //   generated: {
    //     files: [{
    //       dest: 'dist/app.js',
    //       src: ['.tmp/concat/js/app.js']
    //     }]
    //   }

    // },
    // cssmin: {
      // build: {
      //   files: {
      //     'dist/application.css': ['app/style/*.css']
      //   }
      // }
      // generated: {
      //   files: [{
      //     dest: 'dist/index_style.css',
      //     src: [
      //      'app/style/index_style.css',
      //       'app/style/index_style.css'
      //     ]
      //   }]
      // }
    // },
    // htmlmin: {
    //   dist: {
    //     options: {
    //       removeComments: true,
    //       collapseWhitespace: true
    //     },
    //     files: {
    //       'dist/index.html': 'app/index.html'
    //     }
    //   }
    // },
    jshint: {
      files: ['Gruntfile.js', 'app/js/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    htmlhint: {
      src: ['app/index.html']
    },
    csslint: {
      src: ['app/style/*.css']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },

  });

  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'htmlhint', 'csslint']);

  grunt.registerTask('default', ['jshint', 'useminPrepare', 'usemin', 'htmlmin', 'htmlhint', 'csslint']);

  grunt.registerMultiTask('log', 'Log stuff.', function() {
    grunt.log.writeln(this.target + ': ' + this.data);
  });

};
