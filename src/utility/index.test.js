#!/usr/bin/env node

const chalk = require('chalk');
const { expect } = require('chai');
const { describe, it } = require('mocha');

const { KEY_SEPARATOR } = require('../constants');

const {
  isEmptyString,
  isValidParametersLength,
  getUndocumentedChoice,
  endsWithWhitespace,
  replaceWhitespace,
  isValidYamlFileName,
  isValidJsonFileName,
  getFirstKey,
  getNameFromKey,
  getParentKey,
  throwError,
  isValidVariablesShape,
  getOptionsKeysFromKey,
} = require('./index');

describe('utility', () => {
  describe('isEmptyString', () => {
    it('should return true if variable is an empty string', () => {
      const variable = '';

      const result = isEmptyString(variable);

      expect(result).to.equal(true);
    });

    it('should return false if variable is a non empty string', () => {
      const variable = 'a';

      const result = isEmptyString(variable);

      expect(result).to.equal(false);
    });

    it('should return false if variable is an array', () => {
      const variable = [];

      const result = isEmptyString(variable);

      expect(result).to.equal(false);
    });

    it('should return false if variable is a function', () => {
      const variable = {
        'empty-string': '',
      };

      const result = isEmptyString(variable);

      expect(result).to.equal(false);
    });

    it('should return false if variable is a non empty string', () => {
      const variable = 0;

      const result = isEmptyString(variable);

      expect(result).to.equal(false);
    });
  });

  describe('isValidParametersLength()', () => {
    it('should return true if params length is valid', () => {
      const result = isValidParametersLength({
        actual: 1,
        min: 1,
        max: 1,
        exact: 1,
      });
      expect(result).to.equal(true);
    });

    it('should return false if params length is more than max', () => {
      const result = isValidParametersLength({
        actual: 2,
        max: 1,
      });
      expect(result).to.equal(false);
    });

    it('should return false if params length is less than min', () => {
      const result = isValidParametersLength({
        actual: 1,
        min: 2,
      });
      expect(result).to.equal(false);
    });

    it('should return false if params length is not exact', () => {
      const result = isValidParametersLength({
        actual: 2,
        exact: 3,
      });
      expect(result).to.equal(false);
    });
  });

  describe('getUndocumentedChoice()', () => {
    it('returns the choice without the documentation', () => {
      const documentedChoice = `commit ${chalk.blue.bold('→')} git commit -m 'new commit'`;
      const undocumentedChoice = getUndocumentedChoice(documentedChoice);
      expect(undocumentedChoice).to.equal('commit');
    });
  });

  describe('endsWithWhitespace()', () => {
    it('should return true if string contains whitespace', () => {
      const string = 'this string ends with whitespace    ';
      expect(endsWithWhitespace(string)).to.equal(true);
    });

    it('should return false if string does not contain whitespace', () => {
      const string = 'this string does not end with whitespace';
      expect(endsWithWhitespace(string)).to.equal(false);
    });
  });

  describe('replaceWhitespace()', () => {
    it('should return a string with whitespace replaced by the delimiter', () => {
      const stringWithWhitespace = 'one two three';
      expect(replaceWhitespace(stringWithWhitespace, KEY_SEPARATOR)).to.equal('one.two.three');
    });

    it('should return a string with whitespace replaced by the delimiter', () => {
      const stringWithWhitespace = 'one       two three';
      expect(replaceWhitespace(stringWithWhitespace, KEY_SEPARATOR)).to.equal('one.two.three');
    });
  });

  describe('isValidYamlFileName()', () => {
    it('should return true if the string is a valid yaml file name', () => {
      const fileName = 'cbf.yml';
      expect(isValidYamlFileName(fileName)).to.equal(true);
    });

    it('should return false if the string is not a valid yaml file name', () => {
      const fileNameWithDifferentFileSuffix = 'cbf.json';
      expect(isValidYamlFileName(fileNameWithDifferentFileSuffix)).to.equal(false);
      const fileNameWithNoFileSuffix = 'cbf';
      expect(isValidYamlFileName(fileNameWithNoFileSuffix)).to.equal(false);
    });
  });

  describe('isValidJsonFileName()', () => {
    it('should return true if the string is a valid json file name', () => {
      const fileName = 'cbf.json';
      expect(isValidJsonFileName(fileName)).to.equal(true);
    });

    it('should return false if the string is not a valid json file name', () => {
      const fileNameWithDifferentFileSuffix = 'cbf.yml';
      expect(isValidJsonFileName(fileNameWithDifferentFileSuffix)).to.equal(false);
      const fileNameWithNoFileSuffix = 'cbf';
      expect(isValidJsonFileName(fileNameWithNoFileSuffix)).to.equal(false);
    });
  });

  describe('getFirstKey()', () => {
    it('should return the first key in an object', () => {
      const object = {
        first: 1,
        second: 2,
        third: 3,
      };
      const firstKey = 'first';
      expect(getFirstKey(object)).to.equal(firstKey);
    });
  });

  describe('getNameFromKey()', () => {
    it('should return the name', () => {
      const key = 'one.two.three.four.five';
      const name = 'five';
      expect(getNameFromKey(key)).to.equal(name);
    });
  });

  describe('getParentKey()', () => {
    it('should return the parent key', () => {
      const key = 'one.two.three.four.five';
      const parentKey = 'one.two.three.four';
      expect(getParentKey(key)).to.equal(parentKey);
    });
  });

  describe('throwError()', () => {
    it('should throw an unknown error', () => {
      expect(() => {
        throwError();
      }).to.throw('Unknown error');
    });

    it('should throw an error with the correct error message', () => {
      const errorMessage = 'An error';
      expect(() => {
        throwError(errorMessage);
      }).to.throw(errorMessage);
    });
  });

  describe('isValidVariablesShape()', () => {
    it('should return true if variables is an object and all entries have string values', () => {
      const variables = {
        name: 'What is your name?',
        food: 'What is your favourite food?',
      };
      expect(isValidVariablesShape(variables)).to.equal(true);
    });

    it('should return false if variables is a string', () => {
      const variables = 'some string';
      expect(isValidVariablesShape(variables)).to.equal(false);
    });

    it('should return false if variables is a number', () => {
      const variables = 4;
      expect(isValidVariablesShape(variables)).to.equal(false);
    });

    it('should return false if variables is an array', () => {
      const variables = ['one', 'two', 'three'];
      expect(isValidVariablesShape(variables)).to.equal(false);
    });

    it('should return false if variables is a function', () => {
      const variables = () => {
        return 'a';
      };
      expect(isValidVariablesShape(variables)).to.equal(false);
    });

    it('should return false if an object but entries have NON string values', () => {
      const variables = {
        name: 'What is your name?',
        foods: {
          first: 'What is your favourite food?',
          second: 'What is your second favourite food?',
        },
      };
      expect(isValidVariablesShape(variables)).to.equal(false);
    });
  });

  describe('getOptionsKeysFromKey()', () => {
    it('should return the correct list of option keys from key', () => {
      const key = 'one:two:three';

      const expected = ['one', 'one.two'];

      expect(getOptionsKeysFromKey(key)).to.have.deep.members(expected);
    });

    it('should return en empty list of option keys when only a single command is passed', () => {
      const key = 'one';

      const expected = [];

      expect(getOptionsKeysFromKey(key)).to.eql(expected);
    });

    it('should return an empty list when key is an empty string', () => {
      const key = '';

      const expected = [];

      expect(getOptionsKeysFromKey(key)).to.eql(expected);
    });
  });
});
