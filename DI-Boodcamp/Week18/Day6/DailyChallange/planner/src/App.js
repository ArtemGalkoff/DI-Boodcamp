import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import DeleteTask from './components/DeleteTask';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Provider store={store}>

      <div>
        <h1>Daily planner</h1>
        <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
        {selectedDate && (
          <div>
            <AddTask selectedDate={selectedDate} />
            <TaskList selectedDate={selectedDate} />
            <EditTask selectedDate={selectedDate} />
            <DeleteTask selectedDate={selectedDate} />
            
          </div>
        )}
      </div>
    </Provider>
  );
};

export default App;