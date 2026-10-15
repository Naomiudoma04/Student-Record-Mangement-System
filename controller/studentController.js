const database = require ('../model/database.json')
const fs = require('fs')

const studentRecord = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./model/database.json', data, (error, data) => {
            if (error) {
                reject('Error writing to file')
            } else {
                resolve('File written successfully')
            }
        });
    });
};


const newStudent = async (req, res)=> {
    const {fullName, age, gender, DOB, address, subject, attendance} = req.body
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
    }
    database.push(student)
    // console.log('database:', database)
    await studentRecord(JSON.stringify(database, null, 2))
    res.status(201).json({
        message: 'Student created successfully',
        data: student
    })
    
};

const oneStudent = (req, res) => {
    const studentId = req.params.id;
const student = database.find((e)=> e.studentId === stundentId);
if (!student){
    return res.status(404).json({
        message : 'Student not found'
    })
}

    return res.status(200).json({
        message: 'St found successfully',
        data: user
    });
};



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
        data: student
    })
}

const deleteStudents = async (req, res) => {
    const student = Number(req.params.student)

    const studentIndex = database.findIndex((el) => el.student === student) 
    if(studentIndex === -1){
        return res.status(404).json({
         message: 'Student not found'
            
        })
    }

    database.splice(studentIndex, 1)
    await studentRecord(JSON.stringify(database, null, 2))
    res.status(200).json({
        message:'Student deleted successfully',
        data: database
    });
}

module.exports = {
    updateStudents,
    newStudent,
    oneStudent
}

