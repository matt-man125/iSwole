// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from "express";
const router = Router();
import { logData } from "../data/index.js";
import validation from '../helpers.js';
import { logs } from "../config/mongoCollections.js";

router
  .route('/')
  .get(async (req, res) => {
    try{
      const logCollection = await logs();
      const logList = await logCollection.find({}).toArray();
      res.json(logList);
    }catch(e){
      res.status(500).json({error: e});
    }
  });

router
  .route('/submit')
  .post(async (req, res) => {
    const myLogData = req.body;
    try{
      const {bodyWeight, startTime, endTime, exerciseName0, sets0, reps0, weight0, exerciseName1, sets1, reps1, weight1, exerciseName2, sets2, reps2, weight2, exerciseName3, sets3, reps3, weight3, exerciseName4, sets4, reps4, weight4} = myLogData;
      const newLog = await logData.create(bodyWeight, startTime, endTime, exerciseName0, sets0, reps0, weight0, exerciseName1, sets1, reps1, weight1, exerciseName2, sets2, reps2, weight2, exerciseName3, sets3, reps3, weight3, exerciseName4, sets4, reps4, weight4);
      res.status(200).json(newLog);
    }catch(e){
      res.status(400).json({error: e});
    }
  });

router
  .route('/:logId')
  .get(async (req, res) => {
    try{
      const log = await logData.get(req.params.logId);
      res.status(200).json(log);
    }catch(e){
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    try{
      let deletedLog = await logData.remove(req.params.logId);
      res.status(200).json({logId: req.params.logId, deleted: true});
    }catch(e){
      return res.status(404).json({error: e});
    }
  });

export default router;
