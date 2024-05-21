import React, { useState } from 'react';
import UserForm from './userform';
import UserList from './userlist';

const MainComponent = () => {
    const [users, setUsers] = useState([]);
    const [newuser, setNewUser] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    const addUser = (user) => {
        setUsers([...users, user]);
    };

    const toggleStatus = (userIndex, addressIndex) => {
        const newUsers = [...users];
        const address = newUsers[userIndex].addresses[addressIndex];
        address.status = address.status === 'valid' ? 'invalid' : 'valid';
        setUsers(newUsers);
    };

    const deleteAddress = (userIndex, addressIndex) => {
        const newUsers = [...users];
        newUsers[userIndex].addresses.splice(addressIndex, 1);
        setUsers(newUsers);
    };

    const editAddress = (userIndex, addressIndex, editedAddress) => {
        setNewUser({ userIndex, addressIndex, ...editedAddress });
        setEditIndex(userIndex);
    };

    return (
        <div className='container'>
            <h1>User and Address Management</h1>
            <UserForm addUser={addUser} newuser={newuser} setUsers={setUsers} users={users} setEditIndex={setEditIndex}  editIndex={editIndex}/>
            <UserList users={users} toggleStatus={toggleStatus} deleteAddress={deleteAddress} editAddress={editAddress} />
        </div>
    );
};

export default MainComponent;
