# Fycon Font Generator

We want consolidated codepoint support as well as a build system for Livefyre's Fycons library straight from Sketch.app to web-ready iconfonts  

## Requirements
* Sketchtool (CLI for Sketch) http://bohemiancoding.com/sketch/tool/

## Usage
```
$ npm install  
$ gulp fycons
```

## Gulp Tasks
``$ gulp fycons``: builds webfonts, exports to ``dist/``, builds sample html & css  
``$ gulp start``: starts a server w/ livereload that roots in ``dist/``  
``$ gulp clean``: removes ``dist/``

## Todo/Known Bugs
* Separate fycons into different files to pipe into gulp-iconfont (better height export support)
* Replace fontawesome template with Livefyre's current webfont implementation
