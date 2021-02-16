import axios from "axios";

export default axios.create({
  baseURL: "https://jsonmock.hackerrank.com/api/article_users",
  headers: {
    "Content-type": "application/json"
  }
})