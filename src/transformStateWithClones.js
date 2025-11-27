'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyObject = { ...state };
  const result = [];

  for (const element of actions) {
    if (element.type === 'addProperties') {
      Object.assign(copyObject, element.extraData);
    }

    if (element.type === 'removeProperties') {
      for (const keysToRemoveInArray of element.keysToRemove) {
        delete copyObject[keysToRemoveInArray];
      }
    }

    if (element.type === 'clear') {
      for (const keys in copyObject) {
        delete copyObject[keys];
      }
    }
    result.push({ ...copyObject });
  }

  return result;
}

module.exports = transformStateWithClones;
