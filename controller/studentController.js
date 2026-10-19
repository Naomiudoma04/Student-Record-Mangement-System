const database = require('../model/database.json');
const fs = require('fs');

const studentDB = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./model/database.json', data, 'utf8', (error) => {
            if (error) {
                console.error('Error writing to file:', error);
                reject(error);
            } else {
                resolve('File written successfully');
            }
        });
    });
};

const newStudent = async (req, res) => {
    try {
        const { fullName, age, gender, DOB, address, subject, attendance } = req.body;
        const studentId = database.length + 1
        const student = {
            studentId,
            fullName,
            age,
            gender,
            DOB,
            address,
            subject,
            attendance
        };

        database.push(student);
        await studentDB(JSON.stringify(database, null, 2));
        return res.status(201).json({
            message: 'Student created successfully',
            data: student
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating student',
            error: error.message
        });
    }
};

const oneStudent = async (req, res) => {
    try {
        const studentId = Number(req.params.id);
        const student = database.find((e) => Number(e.studentId) === studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json({
            message: 'Student found successfully',
            data: student
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching student',
            error: error.message
        });
    }
};

const updateStudents = async (req, res) => {
    try {
        const studentId = Number(req.params.id);
        const student = database.find((e) => Number(e.studentId) === studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const { fullName, age, gender, DOB, address, subject, attendance } = req.body;
        const fields = {
            fullName,
            age,
            gender,
            DOB,
            address,
            subject,
            attendance
        };

        student.fullName = fullName || student.fullName
        student.age = age || student.age
        student.gender = gender || student.gender
        student.DOB = DOB || student.DOB
        student.address = address || student.address
        student.subject = subject || student.subject
        student.attendance = attendance || student.attendance

        await studentDB(JSON.stringify(database, null, 2));
        return res.status(200).json({
            message: 'Student updated successfully',
            data: student
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating student',
            error: error.message
        });
    }
};

const deleteStudents = async (req, res) => {
    try {
        const studentId = Number(req.params.id);
        const studentIndex = database.findIndex((item) => Number(item.studentId) === studentId);

        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Student not found' });
        }

        database.slice(studentIndex, studentIndex + 1);
        await studentDB(JSON.stringify(database, null, 2));
        return res.status(200).json({
            message: 'Student deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting student',
            error: error.message
        });
    }
};

const getAllStudents = async (req, res) => {
    const students = database
    res.status(200).json({
        message: 'All students retrieved successfully',
        data: students
    })
}

module.exports = {
    updateStudents,
    newStudent,
    oneStudent,
    deleteStudents,
    getAllStudents
};
