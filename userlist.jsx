import React from 'react';

const UserList = ({ users, toggleStatus, deleteAddress, editAddress }) => {
    console.log(users)
    const handleEditAddress = (userIndex, addressIndex) => {
        console.log(addressIndex)
        console.log(userIndex)
        const editedAddress = users[userIndex];
        editAddress(userIndex, addressIndex, editedAddress);
        console.log(editedAddress)
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-4'>
                    <h3 className='text-secondary'>List of Users</h3>
                </div>
                <div className='col-8'>
                    <h3 className='text-secondary'>List of Addresses</h3>
                </div>
            </div>

            {users.map((user, userIndex) => (
                <div className='row mb-3' key={userIndex}>
                    <div className='col-4'>
                        <h6>{user.name} (Age: {user.age})</h6>
                    </div>
                    <div className='col-8'>
                        <ul>
                            {user.addresses.map((address, addressIndex) => (
                                <li key={addressIndex} className={`mb-2 ${address.status}`}>
                                    {address.city}, {address.state}, {address.houseNo}, {address.country} - {address.status}
                                    <button className='mx-2 btn btn-warning' onClick={() => toggleStatus(userIndex, addressIndex)}>
                                        {address.status === 'valid' ? 'Mark Invalid' : 'Mark Valid'}
                                    </button>
                                    <button className='btn btn-primary mx-2' onClick={() => handleEditAddress(userIndex, address)}>Edit</button>
                                    <button className='mx-2 btn btn-danger' onClick={() => deleteAddress(userIndex, addressIndex)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserList;
