import React, {useEffect, useState} from 'react'
import { signOut ,onAuthStateChanged} from 'firebase/auth';
import {auth} from'../firebase.js';
import { useNavigate } from 'react-router-dom';
import {uid} from 'uid';
import {set,ref, onValue, DataSnapshot, remove, update} from 'firebase/database';
import {db} from '../firebase.js';
import "./Homepage.css";
import AddIcon from '@mui/icons-material/Add';

export default function Homepage() {
    const [todo,setTodo] = useState("");
    const [todos,setTodos] = useState([]);
    const [isEdit,setIsEdit] = useState(false);
    const [tempUidd,setTempUidd] = useState("");
    const navigate = useNavigate();

   const populate =  ()=> {
        auth.onAuthStateChanged((user) => {

            if (user) {
                // read
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                  setTodos([]);
                  const data = snapshot.val();
                //   console.log(Object.values(data));
                  if (data !== null) {
                    // Object.values(data).map((todo) => {
                    //   setTodos((oldArray) => [...oldArray, todo])
                    // });
                    // const newArray = Object.values(data).map(item =>{
                    //     return item.todo
                    //   })
                      setTodos(Object.values(data));
                    //   console.log(newArray);
                  }
                });
              }
            if(!user){
                navigate('/'); 
            }
        })
    }
    useEffect(populate,[]);

    const handleSignOut = () =>{
        signOut(auth).then(()=> {
            navigate('/')
        }).catch(err => {
            alert(err.message)
        })
    }

    //Add
    const writeToDatabase = () => {
        if(!todo){
           window.alert('Task cannot be empty');
           return ;
        }
        const uidd = uid();
        set(ref(db, `${auth.currentUser.uid}/${uidd}`),{
            todo : todo,
            uidd : uidd
        });
        setTodo("");
    }
    //Read
    //Delete
     const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`)).then(() => {
            console.log(`${uid} - Data removed`);
        });
    };
    //Update
    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
    }

    const handleEditConfirm = () => {
        if(!todo){
            window.alert('Task cannot be empty');
            return ;
        }
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`),{
            todo : todo,
            tempUidd : tempUidd
        });

        setTodo("");
        setIsEdit(false);
    }

  return (
    <div className='homepage'>
        <div className="head-text">
            <strong>Welcome to DailyDoer 👋🏻 </strong>
        </div>
        <div className="input-header">
        <input type="text" className='add-edit-input' placeholder='Add task' value = {todo} onChange={(e)=> setTodo(e.target.value)}/>
        {
            isEdit?(
                <div>
                     <button className='confirm-task-button' onClick={handleEditConfirm}>Confirm</button>
                </div>
            ):
            <div>
                <button  className='add-task-button' onClick={writeToDatabase}>Add</button>
            </div>
        }
        </div>
        {
            todos.map((element) => {
                return <div className='tasks-added'>
                    <div className='task'>{element.todo}</div>
                    <div className='update-delete-button'>
                        <button className='update-button'  onClick={() => handleUpdate(element)}>Update</button>
                        <button  className="delete-button" onClick={() => handleDelete(element.uidd)}>Delete</button>
                    </div>
                    </div>
            })
        }
        <button className="sign-out-button" onClick={handleSignOut}>sign out</button>
    </div>
  )
}
