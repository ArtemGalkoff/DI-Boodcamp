import Greeting from './Greeting'
import Counter from  './Counter'
import Smth from './UserCard'
import UserList from './UserList'


import './App.css'

function App() {
  

  return (
    <>
      < Greeting name="Andy" messageCount= "What happend?" />
      < Counter />
      < Smth/>
      < UserList/>
    </>
  )
}

export default App
