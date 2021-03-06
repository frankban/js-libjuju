# Copyright 2018 Canonical Ltd.
# Licensed under the LGPLv3, see LICENCE.txt file for details.

"""Set up the application package."""

from setuptools import (
    find_packages,
    setup,
)


setup(
    name='js-libjuju',
    version='1.0.0',
    description='Generate the JavaScript Juju API client',
    long_description='This project is not intended to be pushed to PyPI',
    url='https://github.com/juju/js-libjuju',
    author='Canonical JAAS Team',
    author_email='jaas@canonical.com',
    classifiers=[  # Optional
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'Topic :: Database',
        'Topic :: Software Development :: Build Tools',
        'License :: OSI Approved :: '
        'GNU Lesser General Public License v3 (LGPLv3)',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
    keywords='juju api client javascript',
    packages=find_packages(exclude=['docs', 'tests']),
    install_requires=[
        'Jinja2',
    ],
    entry_points={
        'console_scripts': [
            'generate=generator:generate',
        ],
    },
)
