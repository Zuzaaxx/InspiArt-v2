import React, { useEffect, useState } from "react";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = () => {
        setLoading(true);
        fetch('http://127.0.0.1:8000/api/users/')
        .then(response => response.json())
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Users List</h2>
            <button onClick={fetchUsers}>
                Refresh
            </button>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    )
};

export default UsersList;