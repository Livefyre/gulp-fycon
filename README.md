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
* Rename fycons with specific nomenclature to pipe into gulp-iconfont for better height export support ($index-$size-fycon-name; 03-32-format-link)
* Use gulp-tap to edit the gulp stream to convert filename strings into objects:
```
{
  index: int,
  fontHeight: int,
  name: str
}
```
* Replace fontawesome template with Livefyre's current webfont implementation
