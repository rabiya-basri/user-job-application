import React from 'react'
import { Link, Route} from 'react-router-dom'
import Admin from './Admin'
import ApplicantForm from './ApplicantForm'
import Home from './Home'
import '../style.css'

const NavBar = (props) => {
    return (
        <div className='nav' role="tablist">
            <div className='nav-bar-container'>
                <h3>User-Job</h3>
                <Link className='nav-link'  to='/'>Home</Link> 
                <Link className='nav-link'  to='/applicationform'>Application Form</Link> 
                <Link className='nav-link' to='/admin'>Admin Dashboard</Link>
            </div>
            
            <Route path='/' component={Home} exact={true} />
            <Route path='/applicationform' component={ApplicantForm} />
            <Route path='/admin' component={ Admin}/>
        </div>
    )
}
export default NavBar