const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, '../model/database.json');

const readDatabase = async () => {
    const contents = await fs.promises.readFile(databasePath, 'utf8');
    return JSON.parse(contents);
};

const studentRecord = async (database) => {
    await fs.promises.writeFile(databasePath, JSON.stringify(database, null, 2), 'utf8');
};

const newStudent = async (req, res) => {
    try {
        const database = await readDatabase();
        const { fullName, age, gender, class: studentClass, DOB, address, subject, attendance } = req.body;
        const studentId = database.reduce((maxId, student) => {
            return Math.max(maxId, Number(student.studentId) || 0);
        }, 0) + 1;
        const student = {
            studentId,
            fullName,
            age,
            gender,
            class: studentClass,
            DOB,
            address,
            subject,
            attendance
        };

        database.push(student);
        await studentRecord(database);
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
        const database = await readDatabase();
        const student = database.find((item) => Number(item.studentId) === studentId);

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
        const database = await readDatabase();
        const student = database.find((item) => Number(item.studentId) === studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const fields = {
            fullName: 'fullName',
            age: 'age',
            gender: 'gender',
            class: 'class',
            DOB: 'DOB',
            address: 'address',
            subject: 'subject',
            attendance: 'attendance'
        };

        for (const [requestField, studentField] of Object.entries(fields)) {
            if (Object.prototype.hasOwnProperty.call(req.body, requestField)) {
                student[studentField] = req.body[requestField];
            }
        }

        await studentRecord(database);
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
        const database = await readDatabase();
        const studentIndex = database.findIndex((item) => Number(item.studentId) === studentId);

        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const [student] = database.splice(studentIndex, 1);
        await studentRecord(database);
        return res.status(200).json({
            message: 'Student deleted successfully',
            data: student
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting student',
            error: error.message
        });
    }
};

module.exports = {
    updateStudents,
    newStudent,
    oneStudent,
    deleteStudents
};
