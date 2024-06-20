import { useState } from 'react';
import './App.css'
import Footer from './Footer'

export default function App() {
  
  const [newInput, setNewInput] = useState("");
 
  const [list, setList] = useState([]);
 
  const [checkedLi, setCheckedLi] = useState([]);
  
  const [filter, setFilter] = useState("all");


  
  const inputChange = (event) => {
    setNewInput(event.target.value);
  }


  const addList = (event) => {
    event.preventDefault();
    
    if (newInput.trim() !== "") {
      setList(prevList => [...prevList, newInput.trim()]);
      
      setNewInput("");
    }
  }

  
  const removeLi = (index) => {
    setList(list.filter((_, i) => i !== index));
    setCheckedLi(checkedLi.filter(i => i !== index));
  }


  const checkBoxChange = (index) => {
    setCheckedLi(prev => {
      
      if (prev.includes(index)) {
        
        return prev.filter(i => i !== index);
      } else {
        
        return [...prev, index];
      }
    });
  }

  
  const clearCompleted = () => {
    
    setList(list.filter((_, index) => 
      !checkedLi.includes(index)
    ));
    
    setCheckedLi([]);
  }

  
  const getFilteredItems = () => {
    
    if (filter === "active") {
      return list.filter((_, index) => !checkedLi.includes(index));
    }
    
    if (filter === "completed") {
      return list.filter((_, index) => checkedLi.includes(index));
    }
    
    return list;
  }

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={addList}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={newInput}
              onChange={inputChange}
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ul className="todo-list">
            {getFilteredItems().map((item, index) => (
              <li key={index} className={checkedLi.includes(list.indexOf(item)) ? 'completed' : ''}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={checkedLi.includes(list.indexOf(item))}
                    onChange={() => checkBoxChange(list.indexOf(item))}
                  />
                  <label>{item}</label>
                  <button className="destroy" onClick={() => removeLi(list.indexOf(item))}></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{list.length}</strong> items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className={filter === "all" ? "selected" : ""} onClick={() => setFilter("all")}>All</a>
            </li>
            <li>
              <a href="#/" className={filter === "active" ? "selected" : ""} onClick={() => setFilter("active")}>Active</a>
            </li>
            <li>
              <a href="#/" className={filter === "completed" ? "selected" : ""} onClick={() => setFilter("completed")}>Completed</a>
            </li>
          </ul>

          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>
      <Footer />
    </>
  )
}