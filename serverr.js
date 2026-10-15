const express = require('express');
const app = express();

app.use(express.json());

app.get('/students', (req, res) => {
    res.send('Get all students');
});

app.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    res.send('Get student with ID: ' + studentId);
});

app.post('/students', (req, res) => {
    const studentData = req.body;
    res.json({
        message: 'Student created successfully',
        data: studentData
    });
});

app.put('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const updatedData = req.body;
    res.json({
        message: 'Student updated: ' + studentId,
        data: updatedData
    });
});

app.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;
    res.send('Delete student with ID: ' + studentId);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
