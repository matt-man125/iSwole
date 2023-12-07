// This data file should export all functions using the ES6 standard as shown in the lecture code

import { logs } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../helpers.js";

const exportedMethods = {
  async create(
    bodyWeight,
    startTime,
    endTime,
    exerciseName0,
    sets0,
    reps0,
    weight0,
    exerciseName1,
    sets1,
    reps1,
    weight1,
    exerciseName2,
    sets2,
    reps2,
    weight2,
    exerciseName3,
    sets3,
    reps3,
    weight3,
    exerciseName4,
    sets4,
    reps4,
    weight4
  ) {
    let info = {
      bodyWeight: bodyWeight,
      startTime: startTime,
      endTime: endTime,
    };
    let first = {
      exerciseName: exerciseName0,
      sets: sets0,
      reps: reps0,
      weight: weight0,
    };
    let second = {
      exerciseName: exerciseName1,
      sets: sets1,
      reps: reps1,
      weight: weight1,
    };

    let third = {
      exerciseName: exerciseName2,
      sets: sets2,
      reps: reps2,
      weight: weight2,
    };

    let fourth = {
      exerciseName: exerciseName3,
      sets: sets3,
      reps: reps3,
      weight: weight3,
    };

    let fifth = {
      exerciseName: exerciseName4,
      sets: sets4,
      reps: reps4,
      weight: weight4,
    };

    let exercises = [first, second, third, fourth, fifth];

    let newLog = {
      info: info,
      exercises: exercises,
    };

    const logCollection = await logs();
    const insertInfo = await logCollection.insertOne(newLog);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw "Could not add log";
    }
    return newLog;
  },

  async getAll() {
    const logCollection = await logs();
    let logList = await logCollection.find({}).toArray();
    if (!logList) throw "Could not get all logs";
    return logList;
  },

  async get(logId) {
    const logCollection = await logs();
    const myLog = await logCollection.findOne({ _id: new ObjectId(logId) });
    if (myLog === null) {
      throw "No log with that ID";
    }
    return myLog;
  },
  async getExcerciseData() {
    const logCollection = await logs();
    let logArr = await logCollection.find({}).toArray();

    /*
    const aggregationPipeline = [
      {
          $unwind: '$exercises' // Split the array into separate documents
      },
      {
          $group: {
              _id: '$exercises.name', // Group by the name attribute
              averageWeight: { $avg: '$exercises.weight' }, // Calculate average weight
              maxWeight: { $max: '$exercises.weight' }, // Calculate max weight
              minWeight: { $min: '$exercises.weight' }, // Calculate min weight
              totalEntries: { $sum: 1 }, // Count total entries
              totalWeight: { $sum: '$exercises.weight' } // Calculate total weight
          }
      }
  ];

  const result = await logsCollection.aggregate(aggregationPipeline).toArray();
  */
    for (let i = 0; i < logArr.length; i++) {}
    return logArr;
  },

  async remove(logId) {
    const logCollection = await logs();
    const deletionInfo = await logCollection.findOneAndDelete({
      _id: new ObjectId(logId),
    });
    if (deletionInfo.lastErrorObject.n === 0) {
      throw `Could not delete log wtih id of ${logId}`;
    }
    return `${deletionInfo.value.name} has been successfully deleted!`;
  },
};

export default exportedMethods;
