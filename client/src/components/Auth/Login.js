import React, {Fragment, useState} from 'react';

const Login = () => { 
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const {email,password} = formData;

    const onSubmit = async(e) => {
        e.preventDefault();
        console.log("success");
    }

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

    return ( 
        <Fragment>
        <h1 className="large text-primary">Sign In</h1>
       
        <form className="form" onSubmit={e=>onSubmit(e)}>
          
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)}/>
           
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value = {password}
              onChange={e => onChange(e)}
            />
          </div>
        
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
       
      </Fragment>
     );
}
 
export default Login;