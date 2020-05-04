import axios from "axios";
// http://pdh-estore.akcybex.com:3000/
export default axios.create({
    baseURL: "http://157.245.43.228:3000",
    responseType: "json",
  
});