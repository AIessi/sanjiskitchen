import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Task({ task, index, markTask, removeTask }) {
  return (
    <div
      className="task"
      
    >
      <span style={{ textDecoration: task.isDone ? "line-through" : "" }}>{task.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTask(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTask(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTask({ addTask }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Task</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new task" />
    </Form.Group>
    <Button className="submitbtn" variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function App() {
  const [tasks, setTasks] = React.useState([
    {
      text: "This is a sampe task",
      isDone: false
    }
  ]);

  const addTask = text => {
    const newTasks = [...tasks, { text }];
    setTasks(newTasks);
  };

  const markTask = index => {
    const newTasks = [...tasks];
    newTasks[index].isDone = true;
    setTasks(newTasks);
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Task List &#128221;</h1>
        <FormTask addTask={addTask} />
        <div>
          {tasks.map((task, index) => (
            <Card>
              <Card.Body>
                <Task
                key={index}
                index={index}
                task={task}
                markTask={markTask}
                removeTask={removeTask}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;