(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = Quad

function Quad(opt) {
  if (!(this instanceof Quad)) return new Quad(opt)

  var _w = 100
  Object.defineProperty(this, 'w', {
    get: function() { return _w },
    set: function(val) {
      if (typeof val != 'number') return
      _w = val >= 0 ? val : 0
    }
  })
  var _h = 100
  Object.defineProperty(this, 'h', {
    get: function() { return _h },
    set: function(val) {
      if (typeof val != 'number') return
      _h = val >= 0 ? val : 0
    }
  })
  var _d = 'bottom'
  Object.defineProperty(this, 'd', {
    get: function() { return _d },
    set: function(val) {
      if (val != 'bottom' && val != 'left' && val != 'top' && val != 'right') return
      _d = val
    }
  })

  opt      = opt || {}
  this.w   = opt.w
  this.h   = opt.h
  this.d   = opt.d
  this.p1  = opt.p1  != undefined ? opt.p1  : 0
  this.p2  = opt.p2  != undefined ? opt.p2  : 0
}

Quad.prototype.path = function() {
  var w   = this.w
  var h   = this.h
  var p1  = this.p1
  var p2  = this.p2

  if (this.d == 'bottom') return 'M0 0 V' + p1 +
    ' Q' + (w/2) + ' ' + p2 + ' ' + w + ' ' + p1 +
    ' V0 z'

  if (this.d == 'left') return 'M' + w + ' 0 H' + (w-p1) +
    ' Q' + (w-p2) + ' ' + (h/2) + ' ' + (w-p1) + ' ' + h +
    ' H' + w + ' z'

  if (this.d == 'top') return 'M0 ' + h + ' V' + (h-p1) +
    ' Q' + (w/2) + ' ' + (h-p2) + ' ' + w + ' ' + (h-p1) +
    ' V' + h + ' z'

  if (this.d == 'right') return 'M0 0 H' + p1 +
    ' Q' + p2 + ' ' + (h/2) + ' ' + p1 + ' ' + h +
    ' H0 z'
}

Quad.prototype.svg = function() {
  var el = document.createElement('div')
  el.innerHTML = '<svg viewBox="0 0 ' + this.w + ' ' + this.h + '" preserveAspectRatio="none">' +
  '<path d="' + this.path() + '"></path></svg>'
  return el.removeChild(el.firstChild)
}


},{}],2:[function(require,module,exports){

const domready = require('domready')
require('gsap')

const Quad = require('..')

function illustration(el) {

  function render() {
    path.setAttribute('d', quad.path())
  }

  var out  = {p1:220, p2:260, w:250, h:437, ease:Back.easeOut, onUpdate:render}
  var over = {p1:60,  p2:45,                ease:Expo.easeOut, onUpdate:render}

  var quad = Quad(out)
  var path = el.querySelector('path')

  // test svg node creation on first item, insert svg after img node
  if (!path) {
    var img = el.querySelector('img')
    img.parentNode.insertBefore(quad.svg(), img.nextSibling)
    path = el.querySelector('path')
  }

  render()

  el.addEventListener('mouseover', function() {
    TweenMax.to(quad, .25, over)
  })

  el.addEventListener('mouseout', function() {
    TweenMax.to(quad, .25, out)
  })
}

function all(selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector))
}

domready(function() {
  all('.Illustration').forEach(function(e) {
    illustration(e)
  })
})

},{"..":1,"domready":"domready","gsap":"gsap"}]},{},[2]);
