import { useEffect, useState } from 'react';
import './App.css';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
function App() {
  const [tasks, setTasks] = useState(null);
  const userMail = 'anurag@gmail.com'
  const getData = async () =>{
    
    try {
      const response = await fetch(`http://localhost:5000/todos/${userMail}`)
      const json = await response.json()
      setTasks(json);
    } catch (error) {
      console.log(error)
    }
  } 
  useEffect(()=>getData,[])
  const sortedTasks = tasks?.sort((a,b)=>new Date(a.date)-new Date(b.date))
  return (
    <div className="app">
      <ListHeader listName={'🔖Todo APP'}/>
      {sortedTasks?.map((task)=><ListItem key={task.id} task={task}/>)}
      
    </div>
  );
} 

export default App;
