const database = require ('../model/database.json')
const fs = require('fs')

const studentRecords = require("../model/studentRecords.json");

// 1. GET METHOD: View all students
getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getAllStudents };


const updateStudents = async (req, res) => {
  const id = Number(req.params.id)
    const student = database.find((el) => el.id === id);

    const name = req.body.name
    const gender = req.body.gender
    const age = req.body.age
    const address = req.body.address

    student.name = name || student.name
    student.gender = gender || student.gender
    student.age = age || student.age
    student.address = address || student.address

    await studentRecord(JSON.stringify(database, null, 2));


    res.status(200).json({
        message: 'Student updated successfully',
        data: Student
    })
}

module.exports = {
    updateStudents
}

