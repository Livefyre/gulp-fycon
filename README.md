# Fycon Font Generator

We want consolidated codepoint support as well as a build system for Livefyre's Fycons library straight from Sketch.app to web-ready iconfonts  

## Requirements
* Sketchtool (CLI for Sketch) http://bohemiancoding.com/sketch/tool/

## Usage
```
$ npm install  
$ gulp fycons
```

This will export all files into a ``dist/`` folder.

## Todo/Known Bugs
* Separate fycons into different files to pipe into gulp-iconfont (better height export support)
* Replace fontawesome template with Livefyre's current webfont implementation
