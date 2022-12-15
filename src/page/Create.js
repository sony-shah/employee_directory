import React,{  useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'

function Create({ employees, setEmployees, setIsAdding, props,setIsOpen }) {
  const [firstName, setFirstName] =useState('');
  const [lastName, setLastName] =useState('');
  const [email, setEmail] =useState('');
  const [mobileNo, setMobileNo] =useState('');






  const textInput=useRef(null);

  useEffect(()=>{
    textInput.current.focus();
    // setEmployees(employees);
    // console.log(employees);

  }, [])

  const handleAdd = e =>{
    e.preventDefault();

    console.log(employees);

    if(!firstName || !lastName || !email || !mobileNo) {

      // alert("all fields are required");
        return Swal.fire({
          icon: 'error',
          title: "Error!",
          text: "All fields are required",
          showConfirmButton: true
        });
    }



    const id = employees.length + 1;
    const newEmployee = {
        id,
        firstName,
        lastName,
        email,
        mobileNo,
    }
    
    employees.push(newEmployee);
    setEmployees(employees);
    setIsAdding(false);
   
    console.log(employees);

    // alert(`${firstName} ${lastName}'s data has been added`);
    
    Swal.fire({
      icon: 'success',
      title: "Added!",
      text: `${firstName} ${lastName}'s data has been added`,
      showConfirmButton: false,
      timer: 1500
    });

    
  }


  const close =  () => {
    // props.openBox(false);
    setIsAdding(false);
    setIsOpen(false);
  };

 




  return (
  <section className='p-create'>
    
        <div 
          onClick={() => close()} 
          className='closeicon'>
        x</div>
    <div className='small-container employee-form'>
    
        <form onSubmit={handleAdd} >
            <h1>Add Employee</h1>
          
          <div className='input-field'>

              <input
                   id='firstName'
                type="text"
                name='firstName'
           
                ref={textInput}
                value={firstName}
                placeholder="Enter your first name"
                onChange={e=> setFirstName(e.target.value)}
              />

              <input
                type="text"
                name='lastName'
                id='lastName'
                value={lastName}
                placeholder="Enter your last name"
                onChange={e=> setLastName(e.target.value)}
              />

              <input
                type="email"
                name='email'
                id='email'
                value={email}
                placeholder="Enter your Email id"
                onChange={e=> setEmail(e.target.value)}
              />

              <input
                type="number"
                name='mobileNo'
                id='mobileNo'
                value={mobileNo}
                placeholder="Enter your phone number"
                onChange={e=> setMobileNo(e.target.value)}
              />

          </div>

              

              <div className='handle-btn'>
              <button  style={{ marginRight: '20px' }}
              className='round-button'
         
              >Add</button>

              <button 
                 className="round-button"
                  onClick={() => setIsAdding(false)}
              >Cancel
              </button>

              
              </div>


        </form>
    </div>
  </section>
  )
}

export default Create 
