import React, {useState, useEffect} from 'react'
import ArticleDataService from "../services/service";

const Article = props => {
    const initialArticleState = {
        id: null,
        about: "",
        username: "",
        comment_count: 0,
        submitted: "",
        updated_at: "",
        submission_count: ""
    };
    const [currentArticel, setCurrentArticle] = useState(initialArticleState);
    const [message, setMessage] = useState("");
  
    const getArticle = id => {
        ArticleDataService.get(id)
        .then(response => {
            setCurrentArticle(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    useEffect(() => {
        getArticle(props.match.params.id);
    }, [props.match.params.id]);
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentArticle({ ...currentArticel, [name]: value });
    };
  
    // const updateArticle = status => {
    //   var data = {
    //     id: currentArticel.id,
    //     about: currentArticel.about,
    //     username: currentArticel.username,
    //     comment_count: currentArticel.comment_count,
    //     submitted: currentArticel.submitted,
    //     updated_at: currentArticel.updated_at,
    //     submission_count: currentArticel.submission_count
    //   };
  
    //   ArticleDataService.update(currentArticel.id, data)
    //     .then(response => {
    //       setcurrentArticel({ ...currentArticel, updated_at: status });
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // };
  
    const updateArticle = () => {
      ArticleDataService.update(currentArticel.id, currentArticel)
        .then(response => {
          console.log(response.data);
          setMessage("The article was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteArticle = () => {
      ArticleDataService.remove(currentArticel.id)
        .then(response => {
          console.log(response.data);
          props.history.push("/");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    return (
      <div>
        {currentArticel ? (
          <div className="edit-form">
            <h4>Article</h4>
            <form>
              <div className="form-group">
                <label htmlFor="about">About</label>
                <input
                  type="text"
                  className="form-control"
                  id="about"
                  name="about"
                  value={currentArticel.about}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">User</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={currentArticel.username}
                  onChange={handleInputChange}
                />
              </div>
  
              <div className="form-group">
                <label>
                  <strong>Submission Count:</strong>
                </label>
                {currentArticel.submission_count}
              </div>
              <div className="form-group">
                <label>
                  <strong>Comment Count:</strong>
                </label>
                {currentArticel.comment_count}
              </div>
              <div className="form-group">
              <label>
                <strong>Submitted:</strong>
              </label>
              {currentArticel.submitted}
            </div>
              <div className="form-group">
                <label htmlFor="username">Updated At</label>
                <input
                  type="text"
                  className="form-control"
                  id="updated_at"
                  name="updated_at"
                  value={currentArticel.updated_at}
                  onChange={handleInputChange}
                />
              </div>
            </form>
  
            <button className="badge badge-danger mr-2" onClick={deleteArticle}>
              Delete
            </button>
  
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateArticle}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Article...</p>
          </div>
        )}
      </div>
    );
  };
  
  export default Article;
