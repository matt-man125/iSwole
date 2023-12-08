// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
import {ObjectId} from 'mongodb';
import moment from 'moment';


const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    if (arr.length === 0) throw `Please pass more than 0 elements into the ${varName} array`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
  },

  checkWebsite(strVal, varName){
    if (!strVal) throw `Error: you must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0) throw `Error: ${varName} must have a length greater than zero`;
    let webBegin = strVal.slice(0, 11);
    let webEnd = strVal.slice(-4);
    if (webBegin !== 'http://www.' || webEnd !== '.com'){
      throw 'Error: enter a valid website';
    }
    if (strVal.indexOf(webEnd) < 16){
      throw 'Error: enter a valid website';
    }
    return strVal;
  },

  checkYear(numVal, varName){
    if (!numVal || typeof numVal !== 'number') throw `Please pass a valid year in ${varName}`;
    if (numVal < 1900 || numVal > 2023) throw `Please pass a valid year in ${varName}`;
    return numVal;
  },

  checkReleaseDate(strVal, varName){
    if (!strVal) throw `Error: you must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0) throw `Error: ${varName} must have a length greater than zero`;
    let date = moment(strVal, "MM/DD/YYYY", true)
    if (!date.isValid()){
        throw 'Error: please provide a valid release date';
    }
    if (strVal.charAt(6) === '1'){
      if (strVal.charAt(7) !== '9') throw 'Error: please provide a valid release date';
    }else if(strVal.charAt(6) === '2'){
      if (strVal.charAt(7) !== '0') throw 'Error: please provide a valid release date';
      if (strVal.charAt(8) === '2'){
        if (strVal.charAt(9) !== '0' && strVal.charAt(9) !== '1' && strVal.charAt(9) !== '2' && strVal.charAt(9) !== '3' && strVal.charAt(9) !== '4') throw 'Error: please provide a valid release date';
      }else if(strVal.charAt(8) !== '0' && strVal.charAt(8) !== '1') throw 'Error: please provide a valid release date';
    }else{
      throw 'Error: please provide a valid release date';
    }
    return strVal;
  },

  checkTracksArray(arr, varName) {
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    if (arr.length < 3) throw `Please pass at least three elements into the ${varName} array`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }
    return arr;
  },

  checkRating(numVal, varName){
    if (!numVal || typeof numVal !== 'number') throw `Please pass a valid rating in ${varName}`;
    if (numVal < 1 || numVal > 5){
        throw 'Error: please provide a valid rating';
    }
    let stringRating = numVal.toString();
    if (stringRating.length !== 1){
        if (stringRating.charAt(1) !== '.') throw 'Error: please provide a valid rating';
        if (stringRating.length !== 3) throw 'Error: please provide a valid rating';
    }
    return numVal;
  },

  checkArrEqual(arr1, arr2){
    if(arr1.length !== arr2.length) return false;
    let sortedArr1 = arr1.sort();
    let sortedArr2 = arr2.sort();
    for (let i = 0; i < sortedArr1.length; i++){
      if (sortedArr1[i] !== sortedArr2[i]) return false;
    }
    return true;
  }
};

export default exportedMethods;