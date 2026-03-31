import { useState } from "react";
import Form from "./components/UserForm";
import List from "./components/UserList";
import "./App.css"; 

function App() {
  const [flag, setFlag] = useState(false);

  const reloadUsers = () => {
    setFlag(!flag);
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>My CRUD Dashboard</h2>
        
        <section className="form-section">
          <Form refreshList={reloadUsers} />
        </section>

        <hr className="divider" />

        <section className="list-section">
          <List trigger={flag} />
        </section>
      </div>
    </div>
  );
}

export default App;