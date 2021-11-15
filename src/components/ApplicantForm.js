import React,{useState} from "react";
import axios from 'axios'
import validator  from "validator";

const ApplicantForm = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [experience, setExperience] = useState('')
    const [skills, setSkills] = useState('')
    const [formErrors,setFormErrors]=useState({})
    const errors = {}
    
    const jobTitles = ['FULL Stack Developer', 'Front-End Developer'
        , 'MEAN Stack Developer', 'Node.js Developer']
    
        const handelInputs = (e) => {
            const attr = e.target.name
            if (attr === 'fullName') {
                setName(e.target.value)
            } else if (attr === 'email') {
                setEmail(e.target.value)
            } else if (attr === 'phoneNumber') {
                setPhone(e.target.value)
            } else if (attr === 'experience') {
                setExperience(e.target.value)
            } else if (attr === 'skills') {
                setSkills(e.target.value)
            }
                
        }
        
        const handelSelect = (e) => {
            const selectjob=e.target.value
            setJobTitle(selectjob)
        }
    
        //POST:sends applicant data
        const formSubmit = (detail) => {
            axios.post('https://dct-application-form.herokuapp.com/users/application-form',detail)
                .then((response) => {
                    console.log(response.data)
                    //const result = response.data
                    alert('Your job application submitted successfully!')
                    props.history.push('/')
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    
        //form validations
        const runValidation=()=>{
            //name
            if(name.trim().length===0){
                errors.name='name cannot be blank'
            }
    
            //email
            if(email.trim().length===0){
                errors.email='email cannot be blank'
            }else if(!validator.isEmail(email)){
                errors.email='invalid email format'
            }
        }
    
        const handelSubmit = (e) => {
            e.preventDefault()
            runValidation()
            if (Object.keys(errors).length === 0) {
                setFormErrors({})
                const formData = {
                    name: name,
                    email: email,
                    phone: phone,
                    jobTitle: jobTitle,
                    experience: experience,
                    skills:skills
                }
                formSubmit(formData)       
            }else{
                setFormErrors(errors)
            }     
        }
        
     return (
        <div className='container-sm px-5 mt-4 mb-4 border border-light'>
            <h1 style={{color:'#111827'}}>Apply for Job</h1>
            <form onSubmit={handelSubmit} >
                <div className='row gx-5'>
                <label className='col-sm-2 col-form-label mt-4'>FullName: </label>
                <div className="col-sm-9">
                {formErrors.name && <span style={{color:'red'}}>{formErrors.name}</span>}<br />
                <input className='form-control' type='text' value={name} name="fullName" onChange={ handelInputs} placeholder='jonh paul'/>
                </div>
   
                <label className='col-sm-2 col-form-label mt-4'>Email Address: </label>
                 <div className="col-sm-9">
                 {formErrors.email && <span style={{color:'red'}}>{formErrors.email}</span>}<br />
                <input className='form-control' type='text' value={email} name='email' onChange={ handelInputs} placeholder='john@gmail.com'/><br />
                </div>
   
                <label className='col-sm-2 col-form-label'>Contact Number: </label>
                <div className="col-sm-9">
                <input className='form-control' type='text' value={phone} name='phoneNumber' onChange={ handelInputs} placeholder='+91 1234567892'/><br />
                </div>
   
                <label className='col-sm-2 col-form-label'>Applying for job:</label>
                <div className="col-sm-9">
                <select className='form-select' value={jobTitle} onChange={ handelSelect}>
                    <option value=''>---select---</option>
                    {jobTitles.map((title,i) => {
                        return (
                            <option value={ title} key={i }>{ title}</option>
                        )
                    })}
                </select><br />
                </div>
   
                <label className='col-sm-2 col-form-label'>Exprience: </label>
                <div className="col-sm-9">
                <input className='form-control' type='text' value={experience} name='experience' onChange={ handelInputs} placeholder='2Years 1Month'/><br />
                </div>
  
                <label className='col-sm-2 col-form-label'>Technical Skills: </label>
                <div className="col-sm-9"> 
                <textarea className='form-control' value={skills} name='skills' onChange={handelInputs} placeholder='FullStack developer,java'></textarea><br />
                </div>
                </div>
                <input className='btn btn-primary' type='submit' value='send application'/>
            
            </form>  
        </div>
    )
}
export default ApplicantForm