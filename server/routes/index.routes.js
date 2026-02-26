const express = require('express');
const router = express.Router();
const Student = require("../models/student.model"); 
const Cohort = require("../models/cohort.model");

// --- STUDENT ROUTES ---

// POST /api/students - Creates a new student
router.post("/students", (req, res) => {
  Student.create(req.body)
    .then((createdStudent) => res.status(201).json(createdStudent))
     .catch((error) => {
      console.error("Failed to create student ->", error);
      res.status(500).json({ error: "Failed to create student" });
    });
});

// GET /api/students - Retrieves all students with cohort 
router.get("/students", (req, res) => {
  Student.find()
    .populate("cohort") // Research Team Goal: verify document relationship
    .then((students) => res.status(200).json(students))
    .catch((err) => console.error("Failed to retrieve students ->", err));
});

// GET /api/students/:studentId - Retrieves a specific student by id
router.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      if (!student) return res.status(404).json({ message: "Student not found" });
      res.status(200).json(student);
    })
    .catch((err) => console.error("Failed to retrieve student ->", err));
});

// PUT /api/students/:studentId - Updates a specific student
router.put("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => res.status(200).json(updatedStudent))
    .catch((err) => console.error("Failed to update student ->", err));
});

// DELETE /api/students/:studentId 
router.delete("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Student.findByIdAndDelete(studentId)
    .then(() => res.status(204).send())
    .catch((err) => console.error("Failed to delete student ->", err));
});

// --- COHORT ROUTES ---

// GET /api/cohorts - Retrieves all cohorts
router.get("/cohorts", (req, res) => {
  Cohort.find()
    .then((cohorts) => res.status(200).json(cohorts))
    .catch((err) => console.error("Failed to retrieve cohorts ->", err));
});

// GET /api/cohorts/:cohortId
router.get("/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findById(cohortId)
    .then((cohort) => {
      if (!cohort) return res.status(404).json({ message: "Cohort not found" });
      res.status(200).json(cohort);
    })
    .catch((err) => console.error("Failed to retrieve the cohort ->", err));
});

// PUT /api/cohorts/:cohortId 
router.put("/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => res.status(200).json(updatedCohort))
    .catch((err) => console.error("Failed to update cohort ->", err));
});

// DELETE /api/cohorts/:cohortId 
router.delete("/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Cohort.findByIdAndDelete(cohortId)
    .then(() => res.status(204).send())
    .catch((err) => console.error("Failed to delete cohort ->", err));
});

module.exports = router;