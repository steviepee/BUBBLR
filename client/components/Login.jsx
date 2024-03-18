import React from 'react';

function Login() {
  return ( 
    
    <div>
      <h2> Google Login </h2>
      <p>Click here to authenticate with Google</p>
      <form action="/auth/google" method="GET">
        <button type="submit"> Login with Google </button>
      </form>
    </div>
  );
}

export default Login;