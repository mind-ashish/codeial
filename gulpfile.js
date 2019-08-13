const gulp=require('gulp');

//gulp libraries for minifying css
const sass=require('gulp-sass');  //to convert sass to css

const cssnano=require('gulp-cssnano'); //to compress css

const rev=require('gulp-rev');  //to add manifest to files


//gulp library for minfying js

const uglify=require('gulp-uglify-es').default;

//gulp library for minifying images

const imagemin= require('gulp-imagemin');

//gulp library for deletion before build again.
const del = require('del');











gulp.task('css',function(done){     
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss') 

    .pipe(sass())  
    .pipe(cssnano())  
    .pipe(gulp.dest('./assets/css'));  

    return gulp.src('./assets/**/*.css')  
    .pipe(rev())  
    .pipe(gulp.dest('./public/assets')) 
    
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


//similarly js task to minify js files 
gulp.task('js',function(done){
    console.log('minifying js....');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

//similarly images task to minify images files 
gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')  //to take all types of images
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});



gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

//to run all of above 4 tasks.
gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets'); 
    done();
});
