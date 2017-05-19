module.exports = function(grunt) {


  grunt.initConfig({


    pkg: grunt.file.readJSON('package.json'),


    watch: {
    	stylesheets: {
  files: ['src//*.css'], 
  tasks: ['cssmin'] },

   scripts: { 
    files: 'src/**/*.js', tasks: ['jshint', 'uglify'] 
  } 
},
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/dashboard-controller.min.js': 'app/dashboard/dashboard-controller.js',
          'dist/js/table-view-controller.min.js': 'app/table/table-view-controller.js',
          'dist/js/http-service.min.js': 'app/services/http-service.js',
          'dist/js/metric-service.min.js': 'app/services/metric-service.js',
          'dist/js/modal-controller.min.js': 'app/modal/modal-controller.js',
          'dist/js/routes.min.js': 'app/routes.js'
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        trailing: false,
      },

      build: ['Gruntfile.js', 'app/**/*.js']//this is where tasks are located
    },
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'src/css/style.css'
        }
      }
    }
});

	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

};