const fs = require('fs'); // Import the fs module
const path = require('path'); // Import the path module for handling file paths

// Class to encapsulate the data for students and courses
class Data {
  constructor(students, courses) {
    this.students = students; 
    this.courses = courses;
  }
}

let dataCollection = null; // Array of students

// Function to initialize the data by reading from JSON files
function initialize() {
  return new Promise((resolve, reject) => {
    // Read the students.json file
    fs.readFile(path.join(__dirname, '../data/students.json'), 'utf8', (err, data) => {
      if (err) {
        reject('Unable to read students.json'); // Reject the promise if there's an error reading the file
        return;
      }
      // Parse the JSON data for students
      let students = JSON.parse(data);
      fs.readFile(path.join(__dirname, '../data/courses.json'), 'utf8', (err, data) => {
        if (err) {
          reject('Unable to read courses.json');
          return;
        }
        let courses = JSON.parse(data);
        // Initialize the dataCollection variable with students and courses data
        dataCollection = new Data(students, courses);
        // Resolve the promise indicating successful initialization
        resolve();
      });
    });
  });
}

// Function to get all students
function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      // Reject if dataCollection is not initialized
      reject('Data collection not initialized');
      return;
    }
    if (dataCollection.students.length === 0) {
      reject('No results returned'); // Reject if there are no students
      return;
    }
    resolve(dataCollection.students); // Resolve with the list of students
  });
}

// Function to get all TAs
function getTAs() {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      reject('Data collection not initialized');
      return;
    }
    // Filter students to get only TAs
    let tas = dataCollection.students.filter(student => student.TA); 
    if (tas.length === 0) {
      // Reject if there are no TAs
      reject('No results returned'); 
      return;
    }
    resolve(tas); // Resolve with the list of TAs
  });
}

// Function to get all courses
function getCourses() {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      reject('Data collection not initialized');
      return;
    }
    if (dataCollection.courses.length === 0) {
      // Reject if there are no courses
      reject('No results returned');
      return;
    }
    resolve(dataCollection.courses);
  });
}

// Function to get students by course
function getStudentsByCourse(course) {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      reject('Data collection not initialized');
      return;
    }
    // Filter students by course
    let studentsByCourse = dataCollection.students.filter(student => student.course === course);
    if (studentsByCourse.length === 0) {
      // Reject if no students are found
      reject('No results returned');
      return;
    }
    resolve(studentsByCourse); // Resolve with the list of students
  });
}

// Function to get student by student number
function getStudentByNum(num) {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      reject('Data collection not initialized');
      return;
    }
    // Find student by student number
    let student = dataCollection.students.find(student => student.studentNum === num);
    if (!student) {
      // Reject if no student is found
      reject('No results returned');
      return;
    }
    resolve(student); // Resolve with the student
  });
}

// Export the functions for use in other modules
module.exports = { initialize, getAllStudents, getTAs, getCourses, getStudentsByCourse, getStudentByNum };