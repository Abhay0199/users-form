import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, newuser, setUsers, users, setEditIndex }) => {

    const [user, setUser] = useState({ name: '', age: '', addresses: [] });
    const [address, setAddress] = useState({
        city: '',
        state: '',
        houseNo: '',
        country: '',
        status: 'invalid'
    });
    const [editIndex, setLocalEditIndex] = useState(null);
    const [editUserIndex, setEditUserIndex] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (newuser) {
            setUser({
                name: users[newuser.userIndex].name,
                age: users[newuser.userIndex].age,
                addresses: users[newuser.userIndex].addresses
            });
            setAddress({
                city: newuser.addressIndex.city,
                state: newuser.addressIndex.state,
                houseNo: newuser.addressIndex.houseNo,
                country: newuser.addressIndex.country,
                status: newuser.addressIndex.status
            });
            setLocalEditIndex(newuser.addressIndex);
            setEditIndex(newuser.userIndex);
        }
    }, [newuser]);

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value
        });
    };

    const addAddress = () => {
        const newAddress = { ...address };
        if (editIndex !== null) {
            user.addresses[editIndex] = newAddress;
            setLocalEditIndex(null);
        } else {
            user.addresses.push(newAddress);
        }
        setAddress({
            city: '',
            state: '',
            houseNo: '',
            country: '',
            status: 'invalid'
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateUser() && validateAddress()) {
            if (editIndex !== null) {
                const updatedUsers = [...users];
                updatedUsers[editUserIndex] = newuser;
                console.log(updatedUsers)
                setUsers(updatedUsers);
                setEditIndex(null);
            } else {
                addUser(user);
            }
            setUser({ name: '', age: '', addresses: [] });
            addAddress();
            setErrors({});
        }
    };

    const validateUser = () => {
        const newErrors = {};
        if (!user.name) newErrors.name = 'Name is required';
        if (!user.age || isNaN(user.age) || user.age <= 0) newErrors.age = 'Valid age is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateAddress = () => {
        const newErrors = {};
        if (!address.city) newErrors.city = 'City is required';
        if (!address.state) newErrors.state = 'State is required';
        if (!address.houseNo) newErrors.houseNo = 'House No is required';
        if (!address.country) newErrors.country = 'Country is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div>
            <form className='container' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Name:</label>
                    <input className="form-control" type="text" name="name" value={user.name} onChange={handleUserChange} />
                    {errors.name && <span className="error text-danger">{errors.name}</span>}
                </div>
                <div className='form-group'>
                    <label>Age:</label>
                    <input className="form-control" type="number" name="age" value={user.age} onChange={handleUserChange} />
                    {errors.age && <span className="error text-danger">{errors.age}</span>}
                </div>
                <h4>Address</h4>
                <div className='form-group'>
                    <label>City:</label>
                    <input className="form-control" type="text" name="city" value={address.city} onChange={handleAddressChange} />
                    {errors.city && <span className="error text-danger">{errors.city}</span>}
                </div>
                <div className='form-group'>
                    <label>State:</label>
                    <input className="form-control" type="text" name="state" value={address.state} onChange={handleAddressChange} />
                    {errors.state && <span className="error text-danger">{errors.state}</span>}
                </div>
                <div className='form-group'>
                    <label>House No:</label>
                    <input className="form-control" type="text" name="houseNo" value={address.houseNo} onChange={handleAddressChange} />
                    {errors.houseNo && <span className="error text-danger">{errors.houseNo}</span>}
                </div>
                <div className='form-group'>
                    <label>Country:</label>
                    <input className="form-control" type="text" name="country" value={address.country} onChange={handleAddressChange} />
                    {errors.country && <span className="error text-danger">{errors.country}</span>}
                </div>
                <button className='mt-2 btn btn-primary' type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
            </form>
        </div>
    );
};

export default UserForm;
