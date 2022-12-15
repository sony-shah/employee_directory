import React,{ useState, useEffect,useCallback} from 'react'
import { employeesData } from '../db/employee'
import Swal from 'sweetalert2'

import List from './List'
import Create from './Create'
import Edit from './Edit'




function Dashboard() {
    const [employees, setEmployees]= useState(employeesData);
    const [isAdding, setIsAdding]=useState(false);
    const [isEditing, setIsEditing]=useState(false);
    const [selectedEmployee, setSelectedEmployee]=useState(null);
    // const [RefreshData, setRefreshData] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isShown, setIsShown] = useState(false);
    // const [data, setData] = useState([]);

   
    // edit the employee data
    const handleEdit = (id) => {
        console.log("Edit Id",id);

        const[employee]= employees.filter(employee=>employee.id = id);

        setSelectedEmployee(employee);
        setIsEditing(true);
    }

    // delete employee tha data
    const handleDelete = (id) =>{
        console.log("delete Id",id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No, cancel!',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

                const[employee]=employees.filter(employee => employee.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEmployees(employees.filter(employee => employee.id !== id));

            }
          })



        
    }

    // refresh data
    const handleRefresh=()=>{
        window.location.reload(false);
    }

    function openbox(item) {
        setIsOpen(item)
    }

    const handleAdd = event => {
        // 👇️ toggle shown state
        setIsAdding(true);
        setIsOpen(!isOpen);
        // setIsShown(current => !current);
    
        // 👇️ or simply set it to true
        // setIsShown(true);
      };
    // useEffect(() => {
       
    //     setData(employees);
    //     localStorage.setItem('dataKey', JSON.stringify(data));

    //   }, [data]);
    

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            console.log("esc pressed");
            setIsOpen(false);
            setIsAdding(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction);

        return () => {
            document.removeEventListener("keydown", escFunction);
        };
    }, [escFunction])

  return (
    <>

        <section className='p-dashboard'>
            <div className='container' >

                {/* list showing */}
            {
                !isAdding && !isEditing  && (
                    <>
                

                        <div className='add-emp'>
                            <h1>Employee Directory</h1>


                            <button 

                                className='round-button'
                                setIsAdding={setIsAdding}
                                onClick={handleAdd}
                                // onClick={()=>setIsAdding(true)} 
                                // onClick={setIsShown(current => !current)}
                               
                                >Add New Employee
                            </button>

                        

                            
                            <button
                                style={{ marginLeft: '20px' }}
                                className="round-button"
                                type="button"
                                onClick={handleRefresh}
                                >
                                Refresh
                                </button>

                            {/* <input 
                                type='text'
                                className='input'
                                name='searchbar'
                                id='searchbar'
                                onChange={onChange}
                            /> */}

                        </div>

                        {/* <Header
                            setIsAdding={setIsAdding}
                        /> */}

                        <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        />

                
                    </>
            )}

            {/* add employess */}

            {
                isAdding && (
                    <Create
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                
                    />
                )
            }

            {/* edit the employees */}

            {
                isEditing && (
                    <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                    />

                )
            }

            


            </div>
        </section>


       
       

        {/* {isOpen &&

            <Create openBox={openbox}  />

        }
         */}
    </>

   
    )
}

export default Dashboard
