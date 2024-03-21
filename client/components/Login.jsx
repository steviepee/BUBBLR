import React from 'react';
// import axios from 'axios';

function Login() {

  // const onclick = () => {
  //   axios.get('/auth/google')
  //     .then(response => console.log('auth onclick: ', response))
  //     .catch(err => console.error('failed get auth onclick: ', err));
  // }

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