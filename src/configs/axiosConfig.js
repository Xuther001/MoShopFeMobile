// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:8080',
// });

// export default instance;


// For AWS Amplify
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ec2-3-235-3-82.compute-1.amazonaws.com:8080',
});

export default instance;

