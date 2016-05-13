module.exports = function (grunt){

	var srcPath = './',
		srcAllJS = srcPath + '/js/*.js',
		srcAllLESS = srcPath + 'css/less/';

	grunt.initConfig({
		less: {
			options: {
				banner: '/*! 利用grunt实现批量自动编译less */\n'
			},
			main: {
				expand: true,
				cwd: srcAllLESS,
				src: ['**/*.less'],
				dest: srcAllLESS + '../',
				ext: '.css',
			}
		},
		watch: {
			css: {
				options: {
					livereload: true,
					spawn: false
				},
				files: [srcAllLESS + '**/*.less'],
				tasks: ['less']
				// scripts: {
					
				// 	options: {
				// 		spawn: false
				// 	}
				// }
			}
		},
		jshint: {
			options: {
				"curly": true,
				"eqnull": true,
				"eqeqeq": true,
				"undef": true,
				"globals": {
					// "jQuery": true
				},
				// reporterOutput: 'jshint.txt'
			},
			src: [srcAllJS]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// 将指定目录文件中的字符进行替换  http://www.infoq.com/cn/news/2014/03/env-spec-build-tool-compare/
	grunt.registerTask('dealSpace', 'two into four', function(){
		console.log(options);
	});

	grunt.registerTask('default', ['less', 'dealSpace' /*'watch'*/ /* 'jshint'*/]);
}