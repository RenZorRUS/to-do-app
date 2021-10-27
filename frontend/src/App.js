import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: [],
      activeItem: {
        id: null,
        title: "",
        completed: false,
      },
      editing: false,
    };

    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.strikeUnstrike = this.strikeUnstrike.bind(this);
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch("http://127.0.0.1:8000/api/task-list/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          toDoList: data,
        });
      });
  }

  handleChange(e) {
    var value = e.target.value;

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const csrftoken = this.getCookie("csrftoken");
    let url = "http://127.0.0.1:8000/api/task-create/";

    if (this.state.editing === true) {
      url = `http://127.0.0.1:8000/api/task-update/${this.state.activeItem.id}/`;
      this.setState({
        editing: false,
      });
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(this.state.activeItem),
    })
      .then((response) => {
        this.fetchTasks();
        this.setState({
          activeItem: {
            id: null,
            title: "",
            completed: false,
          },
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  startEdit(task) {
    this.setState({
      activeItem: task,
      editing: true,
    });
  }

  strikeUnstrike(task) {
    task.completed = !task.completed;
    const csrftoken = this.getCookie("csrftoken");
    const url = `http://127.0.0.1:8000/api/task-update/${task.id}/`;
    
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        'title': task.title,
        'completed': task.completed,
      })
    }).then(() => {
      this.fetchTasks()
    })
  }

  deleteItem(task) {
    const csrftoken = this.getCookie("csrftoken");
    fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((response) => {
        this.fetchTasks();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  render() {
    let task = this.state.toDoList;

    return (
      <div className="container">
        <div className="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    className="form-control"
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Add task..."
                    onChange={this.handleChange}
                    value={this.state.activeItem.title}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    id="submit"
                    className="btn btn-warning"
                    type="submit"
                    name="Add"
                  />
                </div>
              </div>
            </form>
          </div>
          <div id="list-wrapper">
            {task.map((task, index) => {
              return (
                <div key={index} className="task-wrapper flex-wrapper">
                  <div onClick={() => this.strikeUnstrike(task)} style={{ flex: 7 }}>
                    {task.completed === true ? (
                      <strike>{task.title}</strike>
                    ) : (
                      <span>{task.title}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => this.startEdit(task)}
                      className="btn btn-sm btn-outline-info"
                    >
                      Edit
                    </button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => {
                        this.deleteItem(task);
                      }}
                      className="btn btn-sm btn-outline-dark delete"
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
