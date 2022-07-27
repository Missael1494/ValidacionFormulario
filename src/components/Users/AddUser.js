import React, { useRef, useState } from 'react'
import { Wrapper } from '../Helpers/Wrapper';
import { Button } from '../UI/Button';

import { Card } from '../UI/Card'
import classes from './AddUser.module.css'
import { ErrorModal } from './ErrorModal';

export const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();


    //const [enteredUsername, setEnteredUsername] = useState('');
    //const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState()


    const addUserHandler = (event) => {
        event.preventDefault();
        //console.log(nameInputRef)
        console.log(nameInputRef.current.value);
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if(enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        if( +enteredUserAge < 1){
            setError({
                title: 'Invalid age',
                message: 'Please enter age.'
            })
            return;
        }
        //console.log(enteredUsername, enteredAge);
        props.onAddUser(enteredName, enteredUserAge);
        //setEnteredAge('');
        //setEnteredUsername('');
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };

    //const usernameChangeHandler = (event) => {
    //    setEnteredUsername(event.target.value);
    //}

    //const ageChangeHandler = (event) => {
    //    setEnteredAge(event.target.value);
    //}

    const errorHandler = () => {
        setError(null);
    }


  return (
    <Wrapper>
        { error && (
            <ErrorModal 
                title={error.title} 
                message={error.message} 
                onConfirm={errorHandler}/>)}
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor='username'>username</label>
                <input 
                    id='username' 
                    type='text'
                    //value={enteredUsername} 
                    //onChange={usernameChangeHandler}
                    ref={nameInputRef}
                />
                <label htmlFor='age'>Age (Years)</label>
                <input 
                    id='age' 
                    type='number'
                    //value={enteredAge} 
                    //onChange={ageChangeHandler}
                    ref={ageInputRef}    
                />
                <Button type='submit'>Add User</Button>
            </form>

        </Card>
    </Wrapper>
  )
}
