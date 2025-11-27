'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function addExtraDataToState(obj, extraKeys) {
  Object.assign(obj, extraKeys);
}

function removeKeys(obj, keysToRemove) {
  for (const keysToRemoveInArray of keysToRemove) {
    delete obj[keysToRemoveInArray];
  }
}

function clearState(obj) {
  for (const keys in obj) {
    delete obj[keys];
  }
}

function transformStateWithClones(state, actions) {
  const copyObject = { ...state };
  const result = [];

  for (const element of actions) {
    switch (element.type) {
      case 'addProperties':
        addExtraDataToState(copyObject, element.extraData);
        result.push({ ...copyObject });
        continue;
      case 'removeProperties':
        removeKeys(copyObject, element.keysToRemove);
        result.push({ ...copyObject });
        continue;
      case 'clear':
        clearState(copyObject);
        result.push({ ...copyObject });
        continue;
      default:
        return null;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
