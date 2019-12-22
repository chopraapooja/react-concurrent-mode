// Make this private
export async function fetchArticle(delay = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const randomId = Math.ceil(Math.random() * 10);
        console.log(`Displaying article from ./article-${randomId}.json`);
        const response = await fetch(`./article-${randomId}.json`);
        resolve(response.json());
      } catch (e) {
        reject(e);
      }
    }, delay);
  });
}

// Make this private
export async function fetchComments(delay = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(`./comments.json`);
        resolve(response.json());
      } catch (e) {
        reject(e);
      }
    }, delay);
  });
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

export function fetchArticleResource() {
  return {
    article: wrapPromise(fetchArticle()),
    comments: wrapPromise(fetchComments())
  };
}
