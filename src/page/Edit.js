import React, {useState, useEffect,useCallback} from 'react'
import Swal from 'sweetalert2';

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing,setIsOpen }) {
 
  const id = selectedEmployee.id;

  const [firstName, setFirstName] =useState(selectedEmployee.firstName);
  const [lastName, setLastName] =useState(selectedEmployee.lastName);
  const [email, setEmail] =useState(selectedEmployee.email);
  const [mobileNo, setMobileNo] =useState(selectedEmployee.mobileNo);


  const handleEdit = (e)=>{
    console.log(id);

    e.preventDefault();

    if (!firstName || !lastName || !email || !mobileNo) {

      return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'All fields are required.',
          showConfirmButton: true
      });
    }

      const employee = {
        id,
        firstName,
        lastName,
        email,
        mobileNo
      };

      for (let i = 0; i < employees.length; i++) {
        if (employees[i].id === id) {
            employees.splice(i, 1, employee);
            break;
        }
    }

    setEmployees(employees);
    setIsEditing(false);


    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500
    });

  }

  const close =  () => {
    // props.openBox(false);
    setIsEditing(false);
    setIsOpen(false);
  };

 

 
 
  return (
    <section className='p-create'>
        <div 
          onClick={() => close()} 
          className='closeicon'>
        x</div>
   
      <div className='small-container employee-form'>
          <form onSubmit={handleEdit} >
              <h1>Update Employee</h1>



              <div className='input-field'>

                <input
                    id='firstName'
                  type="text"
                  name='firstName'
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
                    <button style={{ marginRight: '20px' }}
                    className='round-button'
                    // onClick={handleAdd}
                    >Update</button>

                    <button
                        className="round-button"
                        onClick={() => setIsEditing(false)}
                    >Cancel
                    </button>

                
                  </div>







          </form>
      </div>
    </section>
  )
}

export default Edit
