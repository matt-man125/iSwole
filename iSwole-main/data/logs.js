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

  async getExcerciseData(arg) {
    if (!arg) {
      console.log("Here");
      return "NA";
    }
    let logData = await this.getAll();
    let max = 0;
    let avgRep = 0;
    let avgSet = 0;
    let count = 0;
    let exercise = [];
    for (let i = 0; i < logData.length; i++) {
      let list = logData[i].exercises;
      for (let j = 0; j < list.length; j++) {
        exercise = list[j];
        if (exercise.exerciseName === arg) {
          count++;
          if (exercise.weight > max) {
            max = exercise.weight;
          }
          avgRep += exercise.sets;
          avgSet += exercise.reps;
        }
      }
    }
    if (count == 0) {
      avgSet = 0;
      avgRep = 0;
      max = 0;
    } else {
      avgSet = avgSet / count;
      avgRep = avgRep / count;
    }
    return { max: max, avgSet: avgSet, avgRep: avgRep };
  },

  async getCurrentBodyWeight() {
    const logCollection = await logs();
    let logList = await logCollection.find({}).toArray();
    let numLogs = logList.length;
    let curWeight = logList[numLogs - 1].info.bodyWeight;
    return curWeight;
  },

  async getAverageWorkoutTime() {
    const logCollection = await logs();
    let logList = await logCollection.find({}).toArray();
    let numLogs = logList.length;
    let totalWorkoutTime = 0;
    for (let i = 0; i < numLogs; i++) {
      let curLog = logList[i];
      let curLogStartTime = curLog.info.startTime.slice(11);
      let curLogEndTime = curLog.info.endTime.slice(11);
      let minuteDifference =
        parseInt(curLogEndTime.slice(3)) - parseInt(curLogStartTime.slice(3));
      let hourDifference = parseInt(
        curLogEndTime.slice(0, 2) - parseInt(curLogStartTime.slice(0, 2))
      );
      let hoursToMinutes = hourDifference * 60;
      totalWorkoutTime = totalWorkoutTime + minuteDifference + hoursToMinutes;
    }
    let averageWorkoutTime = totalWorkoutTime / numLogs;
    averageWorkoutTime = averageWorkoutTime.toFixed(1);
    return averageWorkoutTime;
  },

  async getAverageWorkoutsPerWeek() {
    const logCollection = await logs();
    let logList = await logCollection.find({}).toArray();
    let numLogs = logList.length;
    let earliestYear = 3000;
    let earliestMonth = 12;
    let earliestDay = 31;
    let latestYear = 0;
    let latestMonth = 0;
    let latestDay = 0;
    for (let i = 0; i < numLogs; i++) {
      let curLog = logList[i];
      let curLogYear = parseInt(curLog.info.startTime.slice(0, 4));
      let curLogMonth = parseInt(curLog.info.startTime.slice(5, 7));
      let curLogDay = parseInt(curLog.info.startTime.slice(8, 10));

      if (curLogYear < earliestYear) {
        earliestYear = curLogYear;
        earliestMonth = curLogMonth;
        earliestDay = curLogDay;
      } else if (curLogYear == earliestYear) {
        if (curLogMonth < earliestMonth) {
          earliestMonth = curLogMonth;
          earliestDay = curLogDay;
        } else if (curLogMonth == earliestMonth) {
          if (curLogDay < earliestDay) {
            earliestDay = curLogDay;
          }
        }
      }

      if (curLogYear > latestYear) {
        latestYear = curLogYear;
        latestMonth = curLogMonth;
        latestDay = curLogDay;
      } else if (curLogYear == latestYear) {
        if (curLogMonth > latestMonth) {
          latestMonth = curLogMonth;
          latestDay = curLogDay;
        } else if (curLogMonth == latestMonth) {
          if (curLogDay > latestDay) {
            latestDay = curLogDay;
          }
        }
      }
    }
    let differenceInYears = latestYear - earliestYear;
    let differenceInMonths = latestMonth - earliestMonth;
    let differenceInDays = latestDay - earliestDay;
    let yearsToWeeks = differenceInYears * 52;
    let monthsToWeeks = differenceInMonths * 4.33;
    let daysToWeeks = differenceInDays / 7;
    let totalWeeks = yearsToWeeks + monthsToWeeks + daysToWeeks;
    let averageWorkoutsPerWeek = numLogs / totalWeeks;
    averageWorkoutsPerWeek = averageWorkoutsPerWeek.toFixed(1);
    return averageWorkoutsPerWeek;
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
