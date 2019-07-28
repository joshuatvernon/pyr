#!/usr/bin/env node

const { PROGRAM_NAME, NPM_LINK, GITHUB_LINK } = require('./constants');

const messages = {
  noSavedScripts: {
    message:
      'You have no saved scripts.\n\nYou can save a script by using <primary>{programName} -s [path to yaml file]<primary>',
    defaultOptions: {
      programName: PROGRAM_NAME,
    },
  },
  listScripts: {
    message: 'Scripts:\n\n- [scripts]',
    defaultOptions: {
      scripts: [],
      separator: '\n- ',
    },
  },
  scriptDoesNotExist: {
    message:
      'There is currently no saved scripts with the name <primary>{scriptName}<primary>\n\nTry saving it again by using <primary>{programName} -s [path to yaml file]<primary>',
    defaultOptions: {
      programName: PROGRAM_NAME,
    },
  },
  unknownError: {
    message:
      'There was an unknown error; feel free to report this at <primary>{npmLink}<primary> or <primary>{githubLink}<primary>',
    defaultOptions: {
      npmLink: NPM_LINK,
      githubLink: GITHUB_LINK,
    },
  },
  emptyString: {
    message: '',
  },
  loadedScript: {
    message: `Running <primary>{scriptName}<primary> script from <secondary>{yamlFileName}<secondary> file\n`,
  },
  invalidYamlFile: {
    message: '<error>{yamlFileName}<error> is an invalid yaml filename',
  },
};

module.exports = messages;