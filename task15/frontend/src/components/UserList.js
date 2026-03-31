import { useEffect, useState } from "react";
import client from "../api";

function UserList({ trigger }) {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const loadUsers = async () => {
    try {
      const res = await client.get(`/?page=${page}&search=${query}`);
      setList(res.data);
    } catch {
      alert("Error loading users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, query, trigger]);

  const removeUser = async (id) => {
    try {
      await client.delete(`/${id}`);
      loadUsers();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="list-section">
      <input
        className="search-input"
        placeholder="Search users..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />

      <div className="user-grid">
        {list.map((u) => (
          <div key={u.id} className="user-row">
            <div className="user-info">
              <strong>{u.name}</strong> • {u.email} • <small>Age: {u.age}</small>
            </div>
            <button className="btn-delete" onClick={() => removeUser(u.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {list.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>No users found.</p>}

      <div className="pagination-controls">
        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button
          disabled={list.length < 5}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserList;