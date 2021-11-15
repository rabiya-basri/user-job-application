import React,{useState} from "react";
import swal from 'sweetalert'
import axios from "axios";

const Table = (props) => {
    const { data,toggle } = props
    const [shortlist, setShortlist] = useState('')
    const [reject, setRejected] = useState('')
    
    //function to display the details of selected applicant
    const viewDetails = (_id) => {
        const result = data.find((d) => {
            return d._id===_id
        })
        //console.log(result)
        swal({
            title: `${result.name}`,
            text: `Contact: ${result.phone}\n Email: ${result.email}\n Skills: ${result.skills} \n Experience: ${result.experience}`,
            button:'close'
        } )
    }

    //function to shortlist Applicant
    //PUT: update the status of applicant job application
    const handelShortlist = (_id) => {    
        axios.put(`https://dct-application-form.herokuapp.com/users/application-form/update/${_id}`,
            { status: "shortlisted" })
            .then((response) => {
                //console.log(response.data.status) 
                setShortlist(response.data.status)
                const result = data.map(ele => {
                    if (ele._id ===response.data._id ) {
                        return {...response.data}
                    } else {
                        return ele
                    }
                })
               // console.log(result)
               toggle(result)
            })
            .catch((err) => {
             alert(err.message)
         })
    }

    //function to Reject Applicant
    //PUT: update the status of applicant job application
    const handelReject = (_id) => {
        axios.put(`https://dct-application-form.herokuapp.com/users/application-form/update/${_id}`,
            { status: "rejected" })
        .then((response) => {
            console.log(response.data.status)
            setRejected(response.data.status)
            const result = data.map(ele => {
                if (ele._id ===response.data._id ) {
                    return {...response.data}
                } else {
                    return ele
                }
            })
            //console.log(result)
            toggle(result)
           
        })
        .catch((err) => {
            alert(err.message)
        }) 
    }

    return (
        <div className='container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Technical Skills</th>
                        <th>Experience</th>
                        <th>Applied Date</th>
                        <th>View Details</th>
                        <th>Update Application Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data) => {
                        return (
                            <tr key={ data._id}>
                                <td>{data.name}</td>
                                <td>{data.skills}</td>
                                <td>{data.experience}</td>
                                <td>{data.createdAt.slice(0, 10)}</td>
                                <td><button className='btn btn-primary' onClick={() => {
                                    viewDetails(data._id)
                                }}>View Details</button></td>
                                <td>
                                    {data.status === 'applied' ? (
                                        <div>
                                            <button className='btn btn-success' onClick={() => {
                                            handelShortlist(data._id)
                                            }}>shortlist</button>
                                            <button className='btn btn-danger' onClick={() => {
                                                handelReject(data._id)
                                                }}>reject</button>
                                        </div>
                                    ) : (
                                            data.status === 'shortlisted' ? (
                                                <button className='btn btn-success'>shortlisted</button>
                                        ):(<button className='btn btn-danger'>rejected</button>)
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </div>
    )
}
export default Table