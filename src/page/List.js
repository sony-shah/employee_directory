import React,{useState} from 'react'

function List({ employees, handleEdit, handleDelete }) {

    const [searchTerm, setsearchTerm]=useState('');

   

  return (
   
    <section>
        <div className='contain-table'>

                <div className='add-emp'>
                        {/* <h1>Employee Directory</h1> */}

                        {/* <button 
                            className='round-button'
                            setIsAdding={setIsAdding}
                            onClick={()=>setIsAdding(true)} 
                            >Add New Employee
                        </button> */}

                    <input 
                        type='text'
                        className='input-search'
                        name='searchbar'
                        placeholder='Search...'
                        onChange={(e)=>{
                            setsearchTerm(e.target.value)
                        }}
                       

                        
                    />

                </div>
            <table className='striped-table'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>E-mail</th>
                            <th>Mobile No.</th>
                            <th colSpan={2} className='text-center'>Action</th>

                        </tr>
                    </thead>
                  
                <tbody>
                    {
                        employees.length > 0 ? (
                            employees.filter(val=>{
                                    if(searchTerm === ""){
                                        return val;
                                    }else if(
                                        val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.lastName.toLowerCase().includes(searchTerm.toLowerCase())

                                    ){
                                        return val;
                                    }
                            }).map((emp,i)=>(
                                <tr key={emp.id}>
                                    <td>{i+1}</td>
                                    <td>{emp.firstName}</td>
                                    <td>{emp.lastName}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.mobileNo}</td>
                                    <td className='action-btn'>
                                        <button className='round-button' onClick={()=>{handleEdit(emp.id)}}>Edit</button>

                                    </td>
                                    <td className=''>
                                        <button className='round-button' onClick={()=>{handleDelete(emp.id)}}>Delete</button>

                                    </td>                                 

                                </tr>

                            ))
                        ):(
                            <tr>
                                <td colSpan={6}>No Employee </td>
                            </tr>

                           
                        )
                      

                    
                    }
                   
                   
                </tbody>
            </table>
        </div>
    </section>
  )
}

export default List
