const fs = require('fs');

function countStudents(path) {
  try {
    // Read the CSV file synchronously
    const data = fs.readFileSync(path, 'utf8');

    // Parse the CSV data
    const students = [];
    const lines = data.trim().split('\n');
    const headers = lines.shift().split(',');

    lines.forEach((line) => {
      const values = line.split(',');
      if (values.length === headers.length) {
        const student = {};
        headers.forEach((header, index) => {
          student[header.trim()] = values[index].trim();
        });
        students.push(student);
      }
    });

    // Count the number of students
    const totalStudents = students.length;

    // Group students by field
    const studentsByField = {};
    students.forEach((student) => {
      if (!studentsByField[student.field]) {
        studentsByField[student.field] = [];
      }
      studentsByField[student.field].push(student.firstname);
    });

    // Log the results
    console.log(`Number of students: ${totalStudents}`);
    for (const field in studentsByField) {
      if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
        const count = studentsByField[field].length;
        const list = studentsByField[field].join(', ');
        console.log(`Number of students in ${field}: ${count}. List: ${list}`);
      }
    }
  } catch (err) {
    // Throw an error if the database is not available
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
