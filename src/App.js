import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super()

    this.state = {
      todoList: [],
      input: ''
    }

    this.getToDoList = this.getToDoList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postToDoItem = this.postToDoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  //Lifecycle Hooks
  componentDidMount(){
    this.getToDoList();
  }


  //Methods
  getToDoList(){
    axios.get('/get/list').then(response => {
      this.setState({todoList: response.data})
    }).catch(error => console.log(error))
  }

  postToDoItem(){
    let {input} = this.state;
    axios.post('/post/item', {input}).then(response => {
      this.getToDoList();
      this.state.input = '';
    })
  }

  deleteItem(index){
    axios.delete(`/delete/item/${index}`).then(response => {
      console.log(response)
      this.getToDoList();
    })
  }

  //Handle Change
  handleChange(event){
    this.setState({input: event})
  }

  render() {
    //Mapping through the list
    let mappedToDo = this.state.todoList.map((element, index) => {
      let taskCount = (index + 1);
      return (
        <div key={index} className="to-do-item">
          <p>{taskCount}</p>
          <h1>{element}</h1>
          <button onClick={() => this.deleteItem(index)}>Done</button>
        </div>
      )
    })

    return (
      <div className="app-container">
        <div className="to-do-list-container">
          <h1>Task Manager</h1>

          <div className="tasks-container">
            {mappedToDo}
          </div>

          <div className="new-task-container">
            <input type="text" value={this.state.input} onChange={(event) => this.handleChange(event.target.value)} placeholder=" Add a task.."/>
            <button onClick={() => this.postToDoItem()}>Add</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
