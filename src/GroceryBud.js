import React, { useState } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";

const GroceryBud = () => {
    const [name, setName] = useState('');
    const [list, setList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    

    function handleSubmit(e) {
        e.preventDefault();

        // ////////////////////
        // this is for list item
        const newItem = {
            id: new Date().getTime().toString(),
            title: name
        };
        setList(prevList => [newItem, ...prevList]);
        setName("");
        console.log("added");


        // ///////////////////////
        // this is for Item Editing 
        if (name && isEditing) {
            setList(
              list.map((item) => {
                if (item.id === editID) {
                  return { ...item, title: name };
                }
                return item;
              }
              )
            );
            setName('');
            setEditID(null);
            setIsEditing(false);
        } 
    }

    // ///////////////////////
    // this is for Editing Item 
    function handleEditItem(id){
        const specificItem = list.find((item) => item.id === id);
        setIsEditing(true);
        setEditID(id);
        setName(specificItem.title);
        console.log("Edited")
      };

    // ///////////////////////
    // this is for Deleting Item 
    function handleDelItem(id) {
        setList(list.filter((item) => item.id !== id))
        setIsEditing(true)
        console.log("removed")
    }



    return (
        <section className='section-container'>
            <header className='header'>
                <h1>Grocery Bud</h1>
            </header>
            <form  onSubmit={handleSubmit}>
                <div className='adding-place'>
                    <input 
                        onChange={(e) => setName(e.target.value)} 
                        type="text" 
                        value={name}
                        name = "text"
                        id = "text"
                        placeholder='Type your item here...' 
                        className='input-for-item' 
                    />
                    <button type='submit' className='btn-for-item'>
                        {isEditing ? "Edit" : "Submit"}
                    </button>
                </div>
            </form>
            {list.map((item) => {
                    const { id, title } = item;
                    return (
                        <article key={id} className='added-item'>
                            <input type="checkbox" />
                            <p>{title}</p>
                            <button onClick={() => handleEditItem(id)} className='icon-btn' type='button'><FaEdit className='icon-1' /></button>
                            <button onClick={() => handleDelItem(id)} className='icon-btn' type='button'><FaTrash className='icon-2' /></button> 
                        </article>
                    );
                })}

            {/* // /////////////////////// */}
            {/* // this is To Clear all Item  */}
            <footer className='footer-btn'>
                <button onClick={() => setList([])} className='clear-btn'><FaTrash className='trash-icon'/> Clear All Items</button>
            </footer>
        </section>
    )
}

export default GroceryBud
