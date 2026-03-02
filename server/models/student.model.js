const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  projects: Array,
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort" }
});

const Student = mongoose.model("Student", studentSchema, "students");

module.exports = Student
