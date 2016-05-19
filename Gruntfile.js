module.exports = function (grunt){

	var srcPath = './',
		srcAllJS = srcPath + '/js/*.js',
		srcAllLESS = srcPath + 'css/less/',
		srcAllCss = srcPath + 'css/style/',
		srcTepPath = srcPath + 'js/app/';

	grunt.initConfig({
		'jst': {
			options:{
				amd: true,// 输出AMD模块文件，即用define函数包起来
				// prettify: true,// 编译成一行
				namespace: false,
				// processName: function(filename){
				// 	return filename + '-html';
				// },
				templateSettings: {// 对相关引擎模板进行设置
					interpolate: /\{\{(.+?)\}\}/g
				},
			},
			files: {
				expand: true,
                cwd: srcTepPath,
                src: ['**/*.html'],
                dest: srcTepPath,
                ext: '-html.js' //编译后文件扩展名，a.html-->a-html.js
			}
		},
		'less': {
			// options: {
			// // 	banner: '/*! 利用grunt实现批量自动编译less */\n',
			// 	// compress: true// 压缩css
			// },
			main: {
				expand: true,
				cwd: srcAllLESS,
				src: ['**/*.less'],
				dest: srcAllLESS + '../',
				ext: '.css',
			}
		},
		// 'string-replace':{// 使得css文件空格为4个
		// 	dealCss: {
		// 		options: {
		// 			replacements: [{
		// 				pattern: /([^\S\n]{2})/g,
		// 				replacement: '$1$1'
		// 			}]
		// 		},
		// 		files: [{
		// 			expand: true,
		// 			cwd: srcAllCss,
		// 			src: '**/*.css',
		// 			dest: srcAllCss
		// 		}]
		// 	}
		// },
		'watch': {
			css: {
				options: {
					livereload: true,
					spawn: false
				},
				files: [srcAllLESS + '**/*.less', srcTepPath + '**/*.html'],
				tasks: ['less', 'jst']
			}
		},
		'jshint': {
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
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jst');

	grunt.registerTask('default', ['less', 'watch' /* 'jshint'*/]);
}