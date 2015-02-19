module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html']
        },
        copy: {
            task0: {
                src: 'app/index.html',
                dest: 'dist/index.html'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/js/**/*.js', 'test/**/*.js'],


            options: {
                jshintrc: '.jshintrc'
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint', 'htmlhint', 'csslint']);
    grunt.registerTask('build', ['copy:task0', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'usemin']);
    grunt.registerTask('default', ['test', 'build']);


    grunt.registerMultiTask('log', 'Log stuff.', function() {
        grunt.log.writeln(this.target + ': ' + this.data);
    }); >>> >>> > cfc6fdc182eb5098ca74e72f1476c05b5e5c143a

};
