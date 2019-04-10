const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./model/todo");
const bodyParser = require("body-parser");
const logger = require("morgan");
const secret = require("./secret").dbUri;

const app = express();
const PORT = 3001;

//* This is our backend connection to MongoDB database
mongoose.connect(secret, { useNewUrlParser: true });

//* Check if database is connected succesfully (or use promise)
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", () => console.error("Connection error"));

//* bodyparser to parse the request body in json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//! This is our READ method
//* This method is to fetch all data from database
app.get("/getData", (req, res) => {
  Todo.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(data);
  });
});

// ! This is UPDATE method
// * It overwrites existing data in our database
// app.post("/updateData/:id", (req, res) => {
//   let id=req.params.id;
//   console.log(id);
//   const { id, title, todo, date } = req.body;
//   Todo.findOneAndUpdate({ id }, {title }, {date}, err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
//  });

//! This is our DELETE method
//* This method removes existing data from our database
app.delete("/deleteData/:id", (req, res) => {
  let id=req.params.id
  console.log(id);
  const query = Todo.findByIdAndDelete(id);
  query.exec(err=>{
    if(err) throw err;
    console.log('deleted')
    res.status(204).send();
  })
});

//!This is our CREATE method
//* This method adds new data in our database
app.post("/createData", (req, res) => {
  console.log(req.body)
  const { title,todo,date } = req.body;
  let query = new Todo({ title,todo,date });
  query.save((err, data) => {
    if (err) return res.json({ success: false, error: err })

    return res.redirect('/');
  });
});

  //! Fill the error condition. fields  id and message can never be empty or 0

  /*   if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "Invalid Input"
    });
  }
 */





//! Listen on PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
