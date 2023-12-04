// This data file should export all functions using the ES6 standard as shown in the lecture code
import { exercises } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../helpers.js";

const exportedMethods = {
  async create(
    name,
    muscleGroup,
    musclePicUrl,
    gifUrl,
    description
  ) {
    let newExercise = {
      _id: new ObjectId(),
      name: name,
      muscleGroup: muscleGroup,
      musclePicUrl: musclePicUrl,
      gifUrl: gifUrl,
      description: description
    };
    const exerciseCollection = await exercises();
    const insertInfo = await exerciseCollection.insertOne(newExercise);
    if (!insertInfo.acknowledged || !insertInfo.insertedId){
      throw 'Could not add exercise';
    }
    return newExercise;
  },

  async getAll() {
    const exerciseCollection = await exercises();
    const myExercises = await exerciseCollection.find({}).toArray();
    if (!myExercises) throw 'Error: Could not retrieve all exercises';
    return myExercises;
  },

  async get(exerciseId) {
    const exerciseCollection = await exercises();
    const myExercise = await exerciseCollection.findOne({_id: new ObjectId(exerciseId)});
    if (myExercise === null) throw 'Error: No exercise with that ID';
    return myExercise;
  }
};

export default exportedMethods;
