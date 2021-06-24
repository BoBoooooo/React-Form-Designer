/*
 * @file: async-validator
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-23 14:49:04
 */

export default [
  //   'string', // // Must be of type string. This is the default type.
  'number', // Must be of type number.
  //   'boolean', // Must be of type boolean.
  //   'method', // Must be of type function.
  'regexp', // Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.
  'integer', // Must be of type number and an integer.
  'float', // Must be of type number and a floating point number.
  //   'array', // Must be an array as determined by Array.isArray.
  //   'object', // Must be of type object and not Array.isArray.
  //   'enum', // Value must exist in the enum.
  'date', // Value // Must be valid as determined by Date
  'url', // Must be of type url.
  //   'hex', // Must be of type hex.
  'email', // Must be of type email.
  //   'any', // Can be any type.
];
