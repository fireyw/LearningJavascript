const gulp=require('gulp');
//걸프 의존성을 여기에 씀
const babel=require('gulp-babel');
const eslint=require('gulp-eslint');

gulp.task('default', (done) =>{
//걸프 작업을 여기에 씀	
	console.log('default start');
	//노드 소스
	// gulp.src("es6/**/*.js")
	// .pipe(babel())
	// .pipe(gulp.dest("dist"));
	// //브라우저 소스
	// gulp.src("public/es6/**/*.js")
	// .pipe(babel())
	// .pipe(gulp.dest("public/dist"));

	//ESLINT 실행
	gulp.src(["es6/**/*.js"], ["public/es6/**/*.js"])
        .pipe(eslint({baseConfig: {extends: 'eslint:recommended'}}))
		.pipe(eslint.format());

    //노드 소스
    gulp.src("es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
    // //브라우저 소스
    gulp.src("public/es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/dist"));

	done();
});



