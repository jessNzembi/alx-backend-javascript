const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Read the database file asynchronously
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        // If there's an error reading the file, reject the Promise
        reject(new Error('Cannot load the database'));
      } else {
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

        // Resolve the Promise with the results
        resolve({ totalStudents, studentsByField });
      }
    });
  });
}

module.exports = countStudents;
