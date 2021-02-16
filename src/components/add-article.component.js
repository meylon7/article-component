import React, {useState} from 'react'
import ArticleDataService from "../services/service";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const AddArticle = () => {
    const initialArticleState = {
        id: 0,
        about: "",
        username: "",
        comment_count: 0,
        submitted: "",
        updated_at: "",
        submission_count: 0
    };
    const [article, setArticle] = useState(initialArticleState);
    const [submitted, setSubmitted] = useState()
    const handleInputChange = event => {
        const { name, value } = event.target;
        setArticle({ ...article, [name]: value });
      };
    
    const saveArticle = () => {
        var data = {
          id: article.id,
          about: article.about,
          username: article.username,
          comment_count: article.comment_count,
          submitted: article.submitted,
          updated_at: article.updated_at,
          submission_count: article.submission_count

        };
    
        ArticleDataService.create(data)
          .then(response => {            
            setArticle({id:response.data.id,
                about:response.data.about,
                submission_count:response.data.submission_count,
                updated_at:response.data.updated_at,
                submitted:response.data.submitted,
                submitted:response.data.comment_count,
                username:response.data.username})  
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    const newArticle = () => {
        setArticle(initialArticleState)
        setSubmitted(false);
      }
    return (
        <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Button
            variant="contained"
            color="default" onClick={newArticle}>
              Add
            </Button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <TextField
              label="ID"
              className="form-control"
                id="id"
                required
                value={article.id}
                onChange={handleInputChange}
                name="id"
              />
            </div>
            <div className="form-group">
            <TextField
            label="About"
            className="form-control"
              id="about"
              required
              value={article.about}
              onChange={handleInputChange}
              name="about"
            />
          </div>
            <div className="form-group">
              <TextField
              label="User"
              className="form-control"
                id="username"
                required
                value={article.username}
                onChange={handleInputChange}
                name="username"
              />
            </div>

            <div className="form-group">
                <TextField
                label="Submission Count"
                className="form-control"
                id="submission_count"
                value={article.submission_count}
                onChange={handleInputChange}
                name="submission_count"
              />
              </div>
              <div className="form-group">
                <TextField
                label="Comment Count"
                className="form-control"
                id="comment_count"
                value={article.comment_count}
                onChange={handleInputChange}
                name="comment_count"
              />
              </div>
              <div className="form-group">
                Submitted: {article.submitted}
            </div>
              <div className="form-group">
                <TextField
                label="Updated At"
                className="form-control"
                  id="updated_at"
                  name="updated_at"
                  value={article.updated_at}
                  onChange={handleInputChange}
                />
              </div>
            <Button
            variant="contained"
            color="default" onClick={saveArticle}>
              Submit
            </Button>
          </div>
        )}
      </div>
    )
}

export default AddArticle
