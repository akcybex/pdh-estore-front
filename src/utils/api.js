import axios from "axios";
// http://pdh-estore.akcybex.com:3000/
export default axios.create({
    baseURL: "https://pdh-estore.herokuapp.com",
    responseType: "json",
  
});