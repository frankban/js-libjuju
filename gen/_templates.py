# Copyright 2018 Canonical Ltd.
# Licensed under the LGPLv3, see LICENCE.txt file for details.

"""Templates for generating the JavaScript API client."""


from jinja2 import Template


facade_template = Template("""
'use strict';

class {{ name }}V{{ version }} {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = {{ version }};
  }
  {% for method in methods %}
  {%- if method.params or method.result %}
  /**
    {%- if method.params %}
    {{ method.params.docstring() }}
    {%- endif %}
    {%- if method.result %}
    {{ method.result.docstring() }}
    {%- endif %}
  */
  {%- endif %}
  {{ method.name() }}({% if method.params %}params, {% endif %}callback) {
    const req = {
      type: '{{ name }}',
      request: '{{ method.request }}',
      version: {{ version }},
      {%- if method.params %}
      // {{ method.params.marshal() }}
      {%- else %}
      params: {}
      {%- endif %}
    };
    this._transport.write(req, (err, resp) => {
      if (err) {
        callback(err, {});
        return;
      }
      {%- if method.result %}
      // callback(null, {{ method.result.marshal() }});
      {%- else %}
      callback(null, {});
      {%- endif %}
    });
  }
  {% endfor %}
}

module.exports = {{ name }}V{{ version }};
"""[1:])
