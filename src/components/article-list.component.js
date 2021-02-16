import React, { useState, useEffect } from "react";
import ArticleDataService from "../services/service";
import Box from '@material-ui/core/Box';
import Pagination from "@material-ui/lab/Pagination";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ArticlesList = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchUser, setSearchUser] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const onChangesearchUser = (e) => {
    const searchUser = e.target.value;
    setSearchUser(searchUser);
  };

  const getRequestParams = (searchUser, page, pageSize) => {
    let params = {};

    if (searchUser) {
      params["username"] = searchUser;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveArticles = () => {
    const params = getRequestParams(searchUser, page, pageSize);

    ArticleDataService.getAll(params)
      .then((response) => {
        const { articles, totalPages } = response.data.data;

        setArticles(response.data.data);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveArticles, [page, pageSize]);

  const refreshList = () => {
    retrieveArticles();
    setCurrentArticle(null);
    setCurrentIndex(-1);
  };

  const setActiveArticle = (article, index) => {
    setCurrentArticle(article);
    setCurrentIndex(index);
  };

  const removeAllArticles = () => {
    ArticleDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  function stripHtml(html) {
    // using for html tag in strings
    var temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }

  function timeConverter(UNIX_timestamp) {
    // using for converting unix timestamp
    let date;
    if (UNIX_timestamp !== null && UNIX_timestamp !== undefined) {
      date = new Date(UNIX_timestamp);
      return date.toUTCString();
    } else return "Trying to connect to the server...";
  }
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <TextField
            label="Search by user"
            className="form-control"
            value={searchUser}
            onChange={onChangesearchUser}
          />
          <div className="input-group-append">
            <Button
              variant="contained"
              color="default"
              onClick={retrieveArticles}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Articles List</h4>

        <div className="mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>

        <ul className="list-group">
          {articles &&
            articles.map((article, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveArticle(article, index)}
                key={index}
              >
                {article.about
                  ? `User: ${
                      article.username
                    }, About: ${article.about.substring(0, 30)}...`
                  : "User: " + article.username}
              </li>
            ))}
        </ul>
        <div style={{ padding: "20px" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={removeAllArticles}
          >
            Remove Articles
          </Button>
        </div>
      </div>
      <List className={classes.root}>
        {currentArticle ? (
          <>
            <h4>Article</h4>
            <ListItem>
                {stripHtml(currentArticle.about)}
            </ListItem>
            <ListItem>
                <strong>User:</strong> {`: ${currentArticle.username}`}
            </ListItem>
            <ListItem>
                <strong>Submitted</strong> {`: ${currentArticle.submitted}`}
            </ListItem>
            <ListItem>
                <strong>Count </strong> {`: ${currentArticle.submission_count}`}
            </ListItem>
            <ListItem>
                <strong>Created at </strong> {`: ${timeConverter(currentArticle.created_at)}`}
            </ListItem>
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </>
        ) : (
          <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
            <p>Please click on a Article...</p>
          </Box>
        )}
      </List>
    </div>
  );
};

export default ArticlesList;
