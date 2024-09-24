// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:8080',
// });

// export default instance;


// For AWS Amplify
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ec2-44-200-11-149.compute-1.amazonaws.com:8080',
});

export default instance;

