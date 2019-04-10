import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      arr: []
    };
  }
  componentDidMount() {
    this.getList();
  }
  getList = () => {
    fetch("/getData")
      .then(res => res.json())
      .then(data => {
        this.setState({
          arr: data
        });
      });
  };

  updateData = id => {
    console.log(id);
    // axios.update('/updateData/'+id)
    // .then(res=>{
    //     this.getList()
    // })
    // .catch(err=>{
    //     console.log(err)
    // })
  };
  deleteData = id => {
    console.log(id);
    axios
      .delete("/deleteData/" + id)
      .then(res => {
        this.getList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.arr.map(todo => {
            return (
              <div>
                <li key={todo._id}>
                  {todo.title} {todo.todo} {todo.date}
                  <Button
                    variant="primary"
                    onClick={() => this.deleteData(`${todo._id}`)}
                  >
                    Delete{" "}
                  </Button>
                  <Button variant="primary" onClick={this.handleShow}>
                    Edit
                  </Button>
                  <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>update Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="form-group">
                        <label>id</label>
                        <input
                          type="text"
                          name="id"
                          className="form-control"
                          placeholder="Enter id"
                        />
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

                        <input
                          type="date"
                          name="date"
                          className="form-control"
                        />
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ToDoList;
