import React, { Component } from "react";
class Todoform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      todo: "",
      date: ""
    };
  }
  /*     submitForm=(e)=>{
   
        this.setState({
            title:e.target.title.value,
            todo:e.target.todo.value,
            date:e.target.date.value,
            time:e.target.time.value
        })
    } */
  render() {
    console.log(this.state.title);
    return (
      <div>
        <form action="/createData" method="post">
          <div className="form-group">
            <label>title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter title"
            />
          </div>
          <div className="form-group">
            <label>Task</label>
            <input
              type="text"
              name="todo"
              className="form-control"
              placeholder="todo"
            />
          </div>
          <div className="form-group form-check">
            <label>Date</label>

            <input type="date" name="date" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Todoform;
