import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Table from './Table'

const Admin = (props) => {
    const [jobData, setJobData] = useState([])
    const [loading, setLoading] = useState(false)
    
    //get's all the jobData
     useEffect(() => {
        axios.get('https://dct-application-form.herokuapp.com/users/application-forms')
            .then((response) => {
                const result = response.data
                setJobData(result)
                setLoading(!loading)
            })
            .catch((err) => {
                alert(err.message)
            })
    }, [])
    
    //GET: get's only front-end data
    const handelFrontEnd = () => {
        axios.get(('https://dct-application-form.herokuapp.com/users/application-forms'))
            .then((response) => {
                const newArry = response.data.filter((data) => {
                     return data.jobTitle==='Front-End Developer'
                 })
                 setJobData(newArry)
            })
            .catch((err) => {
             alert(err.message)
         })
    }

    //GET: get's only nodejs data
    const handelNodeJs = () => {
        axios.get(('https://dct-application-form.herokuapp.com/users/application-forms'))
         .then((response) => {
            const newArry = response.data.filter((data) => {
            return data.jobTitle==='Node.js Developer'
            })
            setJobData(newArry)
            })
            .catch((err) => {
            alert(err.message)
         })
    }

    //GET: get's only Means stack data
    const handelMernStack = () => {
        axios.get(('https://dct-application-form.herokuapp.com/users/application-forms'))
        .then((response) => {
            const newArry = response.data.filter((data) => {
                return data.jobTitle==='MEAN Stack Developer'
            })
            setJobData(newArry)
            })
            .catch((err) => {
             alert(err.message)
        })
    }

    //GET: get's only FullStack data
    const handelFullStack = () => {
        axios.get(('https://dct-application-form.herokuapp.com/users/application-forms'))
        .then((response) => {
            const newArry = response.data.filter((data) => {
               return data.jobTitle==='FULL Stack Developer'
            })
            setJobData(newArry)
        })
        .catch((err) => {
            alert(err.message)
        })  
    }
    
    return (
        <div className='mt-2'>
            <h1>Admin Dashboard</h1>
            <div className='mt-3 mb-3' >
            <button className='btn btn-primary' onClick={ handelFrontEnd}>FrontEnd Developer</button>
            <button className='btn btn-success mx-2' onClick={ handelNodeJs}>NodeJs Developer</button>
            <button className='btn btn-danger mx-2' onClick={ handelMernStack}>Mean Developer</button>
            <button className='btn btn-secondary mx-2' onClick={ handelFullStack}>FullStack Developer</button>
            </div>
            {loading ? (<>
                <h3>Total Applications : { jobData.length}</h3>
                <Table data={jobData} toggle={setJobData} />
            </>) :'loading....' }
            
        </div>
    )
}
export default Admin