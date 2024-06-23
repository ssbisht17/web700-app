/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part  of this assignment has been copied manually or electronically from any other 
*  source (including 3rd party web sites) or distributed to other students.
* 
*  Name: Sachin Singh Bisht         Student ID: 147996235        Date: 22 July, 2024
*
********************************************************************************/ 
const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData");

const app = express();

// Middleware to serve static files from the views directory
app.use(express.static(path.join(__dirname, "views")));

// GET /students route
app.get("/students", async (req, res) => {
    try {
        if (req.query.course) {
            const data = await collegeData.getStudentsByCourse(parseInt(req.query.course));
            res.json(data);
        } else {
            const data = await collegeData.getAllStudents();
            res.json(data);
        }
    } catch (err) {
        errorHandler(res, "Error retrieving students");
    }
});

// GET /tas route
app.get("/tas", async (req, res) => {
    try {
        const data = await collegeData.getTAs();
        res.json(data);
    } catch (err) {
        errorHandler(res, "Error retrieving TAs");
    }
});

// GET /courses route
app.get("/courses", async (req, res) => {
    try {
        const data = await collegeData.getCourses();
        res.json(data);
    } catch (err) {
        errorHandler(res, "Error retrieving courses");
    }
});

// GET /student/:num route
app.get("/student/:num", async (req, res) => {
    try {
        const data = await collegeData.getStudentByNum(parseInt(req.params.num));
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        errorHandler(res, "Error retrieving student");
    }
});

// GET / route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

// GET /about route
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

// GET /htmlDemo route
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

// 404 route
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize data and start server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`server listening on port: ${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.log(`Failed to initialize data: ${err}`);
    });