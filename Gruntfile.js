/*jshint node: true */

'use strict';

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
				'Gruntfile.js',
				'jquery.ventanita.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */\n'
			},
			build: {
				files: {
					'build/jquery.ventanita-<%= pkg.version %>.min.js': 'jquery.ventanita.js'
				}
			}
		},
		watch: {
			files: [
				'jquery.ventanita.js'
			],
			tasks: 'default'
		},
		compare_size: {
			files: [
				'build/jquery.ventanita-<%= pkg.version %>.min.js',
				'jquery.ventanita.js'
			],
			options: {
				compress: {
					gz: function (fileContents) {
						return require('gzip-js').zip(fileContents, {}).length;
					}
				}
			}
		}
	});

	// Loading dependencies
	for (var key in grunt.file.readJSON('package.json').devDependencies) {
		if (key !== 'grunt' && key.indexOf('grunt') === 0) {
			grunt.loadNpmTasks(key);
		}
	}

	grunt.registerTask('default', ['jshint', 'uglify', 'compare_size']);
	grunt.registerTask('saucelabs', ['connect']);
	grunt.registerTask('ci', ['jshint', 'saucelabs']);
};
