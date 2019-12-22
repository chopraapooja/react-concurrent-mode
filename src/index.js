import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { fetchArticleResource } from "./fakeAPI";

// Preload all resources needed on page in the predicted order.
const resource = fetchArticleResource();

function LoadingState({ msg }) {
  return (
    <h5>
      <strong>{msg}</strong>
    </h5>
  );
}

function Comments() {
  const comments = resource.comments.read();
  return (
    <Suspense fallback={<LoadingState msg="Loading Comments..." />}>
      <div className="card">
        <div className="card-body">
          <h6>Comments</h6>
          {comments.map(comment => {
            return (
              <div className="comment" key={comment.id}>
                <div>
                  <img src={comment.avatar} className="avatar" alt="avatar" />
                  <strong>{comment.email}</strong>
                </div>
                {comment.body}
              </div>
            );
          })}
        </div>
      </div>
    </Suspense>
  );
}

function ArticleTitle({ title }) {
  return <h1>{title}</h1>;
}

function ArticleBody({ body }) {
  return <p>{body}</p>;
}

function Article() {
  const article = resource.article.read();
  console.log(article.title);
  return (
    <Suspense fallback={<LoadingState msg="Loading Article..." />}>
      <ArticleTitle title={article.title} />
      <ArticleBody body={article.body} />
      <Comments />
    </Suspense>
  );
}

function StumbleUpon() {
  return (
    <div className="app-header">
      <button
        type="button"
        className="btn btn-success"
        // onClick={() => fetchData()}
        // disabled={isLoading}
      >
        Stumble Upon
      </button>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingState msg="Loading Application..." />}>
      <div className="App">
        <div className="container app-container">
          <StumbleUpon />
          <Article />
        </div>
      </div>
    </Suspense>
  );
}

// the main thing to notice here is
// We are using createRoot, which allows us to use concurrent mode.
const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
// Older: ReactDOM.render(<App />, rootElement);
