# Copyright 2018 Canonical Ltd.
# Licensed under the LGPLv3, see LICENCE.txt file for details.

"""Facade property definitions."""

from collections import namedtuple


class Method(namedtuple('Method', 'name params result')):
    __slots__ = ()



class Prop(namedtuple('Prop', 'name kind required')):
    __slots__ = ()

    def __str__(self):
        name = self.name + ': ' if self.name else ''
        text = name + str(self.kind)
        if self.required:
            text += ' (required)'
        return text

    def camelCase(self):
        """Return the name in camelCase, suitable for JavaScript."""
        return _camelcase(self.name)

    def docstring(self):
        """Return a docstring for this property."""
        indent, level = '  ', 3
        parts = []
        for char in str(self):
            if char == '{':
                level += 1
                parts.extend(['{\n', indent * level])
                continue
            if char == '}':
                level -= 1
                parts.extend(['\n', indent * level, '}'])
                continue
            if char == ',':
                parts.extend([',\n', indent * level])
                continue
            parts.append(char)
        return _camelcase(''.join(parts))


class Dict:

    def __init__(self, props):
        self.props = props

    def __str__(self):
        return '{' + ','.join(str(prop) for prop in self.props) + '}'


class List:

    def __init__(self, prop):
        self.prop = prop

    def __str__(self):
        return '[]' + str(self.prop)


def from_bare_properties(name, info, required=False):
    if not info:
        return None
    kind = info['type']
    if kind == 'object':
        properties = info.get('properties', {})
        required_props = info.get('required', ())
        props = [
            from_bare_properties(k, v, k in required_props)
            for k, v in properties.items()
        ]
        kind = Dict(props)
    if kind == 'array':
        prop = from_bare_properties('', info['items'])
        kind = List(prop)
    return Prop(name, kind, required)


def _camelcase(text):
    words = text.split('-')
    first = words.pop(0)
    return ''.join([first.lower()] + [word.capitalize() for word in words])
