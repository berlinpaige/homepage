module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'source/styles/styles.css' : 'source/styles/styles.scss'
        }
      }
    },
    watch: {
      css: {
        files: 'source/styles/*.scss',
        tasks: ['sass']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['watch']);
  // grunt.registerTask('default',['sass']);
}