import { useEffect, useState } from 'react';
import axios from 'axios';
import './Todo.css'

function Todo() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  const token = localStorage.getItem("token");

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/todo/api/item',
        { item: itemText },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
      setListItems((prev) => [...prev, res.data]);
      setItemText('');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/todo/api/item',
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getItemList();
  }, [token]); 

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/todo/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  }

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/todo/api/item/${isUpdating}`,
        { item: updateItemText },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const updatedItemIndex = listItems.findIndex((item) => item._id === isUpdating);
      listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    } catch (err) {
      console.log(err);
    }
  }

  const updateForm = (id) => {
    return (
      <form className='update-form' onSubmit={(e) => {updateItem(e)}} > 
        <input className='update-input' type="text" placeholder='New Item' onChange={e => {setUpdateItemText(e.target.value)}} value={updateItemText} />
        <button className='update-btn' type='submit'>Update</button>
      </form>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.alert('Log Out successfully');
    window.location.href = '/';
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder='Add Todo Item' onChange={e => {setItemText(e.target.value)} } value={itemText} />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listIems">
        {
          listItems.map(item => (
            <div className="todo-item">
              {
                isUpdating === item._id
                ? updateForm(item._id)
                : <>
                    <p className="item-content">{item.item}</p>
                    <button className="update-item" onClick={() => {setIsUpdating(item._id)}}>Update</button>
                    <button className="delete-item" onClick={() => {deleteItem(item._id)}}>Delete</button>
                  </>
              }
            </div>
          ))
        }
      </div>
      <button className="login" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Todo;
