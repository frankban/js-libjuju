# Copyright 2018 Canonical Ltd.
# Licensed under the LGPLv3, see LICENCE.txt file for details.

"""Facade property definitions."""

from collections import namedtuple


class Method(namedtuple('Method', 'request params result')):
    """A single API method as exposed by a facade."""

    __slots__ = ()

    def name(self):
        """Return the method name."""
        return uncapitalize(self.request)



class Prop(namedtuple('Prop', 'name kind required')):
    """A JavaScript property."""

    __slots__ = ()

    def __str__(self):
        name = self.name + ': ' if self.name else ''
        text = name + str(self.kind)
        if self.required:
            text += ' (required)'
        return text

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

    def marshal(self):
        """Return this property as a marshaled string."""
        fallback = ''
        value = _camelcase(self.name)
        marshal_kind = getattr(self.kind, 'marshal', None)
        if marshal_kind:
            value = marshal_kind(value, self.required)
        return self.name + ': ' + value


class Dict:
    """A property type for maps.

    Key/value pairs are represented by the given props.
    """

    def __init__(self, props):
        self.props = props

    def __str__(self):
        return '{' + ','.join(str(prop) for prop in self.props) + '}'

    def marshal(self, key, required):
        props = ','.join(key + '.' + prop.marshal() for prop in self.props)
        return '{' + props + '}'


class List:
    """A property type for lists.

    The type is a list of objects represented by the provided prop.
    """

    def __init__(self, prop):
        self.prop = prop

    def __str__(self):
        return '[]' + str(self.prop)


def from_bare_properties(name, info, required=False):
    """Return a property object from the provided bare information."""
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
    """Convert the given text from this-format to thisFormat."""
    words = text.split('-')
    first = words.pop(0)
    return ''.join([first.lower()] + [word.capitalize() for word in words])


def uncapitalize(text):
    """Return the given text with the first letter lowercased."""
    if not text:
        return ''
    if text[0].islower():
        return text
    uppers = []
    for char in text:
        if char.islower():
            break
        uppers.append(char)
    if len(uppers) > 1:
        uppers.pop()
    prefix = ''.join(uppers)
    return prefix.lower() + text[len(prefix):]
 