module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// put assets in here?
		watch: {
			js: {
				files: ['gruntfile.js', 'app.js', 'app/**/*.js', 'public/js/**'],
				//tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['public/views/**', 'app/views/**'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['public/js/**'],
				//tasks: ['csslint'],
				options: {
					livereload: true
				}
			}
		}, 
		uglify: {
			production: {
				files: '<%= assets.js %>'
			}
		},
		cssmin: {
			combine: {
				files: '<%= assets.js %>'
			}
		},
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					args: [],
					ignore: ['public/**'],
					ext: 'js.html',
					nodeArgs: ['--debug'],
					delayTime: 1, 
					env: {
						PORT: 3000,
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},
		env: {
			test: {
				NODE_ENV: 'test'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    
    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['cssmin', 'uglify', 'concurrent']);
    } else {
        grunt.registerTask('default', ['concurrent']);
    }
};