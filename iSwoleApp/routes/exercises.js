// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from "express";
const router = Router();
import { exerciseData } from "../data/index.js";
import validation from '../helpers.js';

router
  .route('/')
  .get(async (req, res) => {
    try{
      const myExercises = await exerciseData.getAll();
      res.status(200).json(myExercises)
    }catch(e){
      return res.status(404).json({error: e});
    }
  });

router
  .route('/:exerciseId')
  .get(async (req, res) => {
    try{
      const exercise = await exerciseData.get(req.params.exerciseId);
      res.status(200).json(exercise);
    }catch(e){
      return res.status(404).json({error: e});
    }
  });

export default router;