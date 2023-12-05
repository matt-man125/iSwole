// This data file should export all functions using the ES6 standard as shown in the lecture code

import { logs } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from '../helpers.js';

const exportedMethods = {
  async create(
    bodyWeight,
    startTime,
    endTime,
    exerciseId,
    sets,
    reps
  ) {
    let newLog = {
      bodyWeight: bodyWeight,
      startTime: startTime,
      endTime: endTime,
      exerciseId: exerciseId,
      sets: sets,
      resp: reps
    };
    const logCollection = await logs();
    const insertInfo = await logCollection.insertOne(newLog);
    if (!insertInfo.acknowledged || !insertInfo.insertedId){
      throw 'Could not add log';
    }
    return newLog;
  },
  
  async getAll() {
    const logCollection = await logs();
    let logList = await logCollection.find({}).toArray();
    if (!logList) throw 'Could not get all logs';
    return logList;
  },
  
  async get(logId) {
    const logCollection = await logs();
    const myLog = await logCollection.findOne({_id: new ObjectId(logId)});
    if (myLog === null){
      throw 'No log with that ID';
    }
    return myLog;
  },
  
  async remove(logId) {
    const logCollection = await logs();
    const deletionInfo = await logCollection.findOneAndDelete({
      _id: new ObjectId(logId)
    });
    if (deletionInfo.lastErrorObject.n === 0){
      throw `Could not delete log wtih id of ${logId}`;
    }
    return `${deletionInfo.value.name} has been successfully deleted!`;
  }
};

export default exportedMethods;
