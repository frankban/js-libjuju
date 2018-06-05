# Copyright 2018 Canonical Ltd.
# Licensed under the LGPLv3, see LICENCE.txt file for details.

"""Templates for generating the JavaScript API client."""


from jinja2 import Template


facade_template = Template("""
'use strict';

var module = module;

(function(exports) {

  const jujulib = exports.jujulib;

  class {{ name }}V{{ version }} {

    constructor(transport, info) {
      this.version = {{ version }};
      this._transport = transport;
      this._info = info;
    }
    {% for method in methods %}
    /**
      {%- if method.params %}
      {{ method.params.docstring() }}
      {%- endif %}
      {%- if method.result %}
      {{ method.result.docstring() }}
      {%- endif %}
    */
    {{ method.name }}({% if method.params %}params, {% endif %}callback) {

    }
    {% endfor %}
  }

  const versions = jujulib._facades['{{ name }}'] || {};
  versions[{{ version }}] = {{ name }}V{{ version }};

}((module && module.exports) ? module.exports : this));
"""[1:])
