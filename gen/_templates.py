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
  /**
    {%- if method.params %}
    Parameters are passed as an object like the following:
      {{ method.params.docstring()|indent(6) }}
    {%- else %}
    This method takes no parameters other than the callback.
    {%- endif %}
    {%- if method.result %}
    The provided callback is passed a result like the following:
      {{ method.result.docstring()|indent(6) }}
    {%- else %}
    This method provides no results to the callback.
    {%- endif %}
  */
  {{ method.name() }}({% if method.params %}args, {% endif %}callback) {
    {%- if method.params %}
    // Prepare request parameters.
    let params;
    {{ method.params.marshal('params', 'args')|indent() }}
    {%- else %}
    const params = {};
    {%- endif %}
    // Prepare the request to the Juju API.
    const req = {
      type: '{{ name }}',
      request: '{{ method.request }}',
      version: {{ version }},
      params: params
    };
    // Send the request to the server.
    this._transport.write(req, (err, resp) => {
      if (err) {
        callback(err, {});
        return;
      }
      {%- if method.result %}
      // Handle the response.
      let result;
      {{ method.result.unmarshal('result', 'resp')|indent(6) }}
      callback(null, result);
      {%- else %}
      callback(null, {});
      {%- endif %}
    });
  }
  {% endfor %}
}


const wrappers = require('../api/wrappers.js');
if (wrappers.wrap{{ name }}) {
  {{ name }}V{{ version }} = wrappers.wrap{{ name }}({{ name }}V{{ version }});
}

module.exports = {{ name }}V{{ version }};
"""[1:])
