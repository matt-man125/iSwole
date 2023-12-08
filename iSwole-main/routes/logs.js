// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";
const router = Router();
import { logData } from "../data/index.js";
import validation from "../helpers.js";
import db from "../data/logs.js";
import { logs } from "../config/mongoCollections.js";

router.route("/").get(async (req, res) => {
  try {
    res.redirect("/progress");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router
  .route("/log")
  .get(async (req, res) => {
    try {
      res.render("log");
    } catch (e) {
      console.log("e");
    }
  })
  .post(async (req, res) => {
    const myLogData = req.body;
    try {
      const {
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
        weight4,
      } = myLogData;
      if (startTime > endTime) {
        throw "error: startTime must be before endTime";
      }

      const newLog = await logData.create(
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
      );
      let curBodyWeight = await db.getCurrentBodyWeight();
      let averageWorkoutTime = await db.getAverageWorkoutTime();
      let averageWorkoutsPerWeek = await db.getAverageWorkoutsPerWeek();
      res.redirect("progress");
    } catch (e) {
      res.status(400).redirect("/error?error=" + e);
    }
  });

router.route("/progress").get(async (req, res) => {
  let curBodyWeight = await db.getCurrentBodyWeight();
  let averageWorkoutTime = await db.getAverageWorkoutTime();
  let averageWorkoutsPerWeek = await db.getAverageWorkoutsPerWeek();

  res.render("progress", {
    bodyWeight: curBodyWeight,
    averageWorkoutTime: averageWorkoutTime,
    averageWorkoutsPerWeek: averageWorkoutsPerWeek,
  });
});

router.route("/progress/:exercise").get(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const selectedValue = req.params.exercise;
  let data = await db.getExcerciseData(selectedValue);
  res.json({ max: data.max, avgSet: data.avgSet, avgRep: data.avgRep });
});

router.route("/error").get(async (req, res) => {
  const error = req.query.error;
  res.render("error", { error: error });
});

router
  .route("/:logId")
  .get(async (req, res) => {
    try {
      const log = await logData.get(req.params.logId);
      res.status(200).json(log);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    try {
      let deletedLog = await logData.remove(req.params.logId);
      res.status(200).json({ logId: req.params.logId, deleted: true });
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  });

export default router;
