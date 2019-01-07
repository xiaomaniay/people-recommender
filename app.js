// Generate JSON file.
const csvtojson = require('csvtojson');
const csvFileInput = 'data.csv';
const fs = require('fs');

csvtojson()
.fromFile(csvFileInput)
.then((jsonObj)=>{
  fs.writeFileSync('data.json', JSON.stringify(jsonObj))
})

// Creating the app.
var express = require('express');
var app = express();
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

// get all todos
app.get('/people-like-you', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db
  })
});

app.post('/api/v1/todos', (req, res) => {
  console.log(req.body.title);
  if (!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
  const todo = {
    id: db.length + 1,
    title: req.body.title,
    description: req.body.description
  }
  db.push(todo);
  return res.status(200).send({
    success: 'true',
    message: 'todo added successfully',
    todo
  })
});
