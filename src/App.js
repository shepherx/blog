import { useState, useEffect } from "react";
import "./App.css";

const query = `
{
  blogPostCollection {
    items {
      title
      thoughts
      image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
    }
  }
}
`;

function App() {
  const [blogPost, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/d1rolk8j1qz7/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer lEd_u1uUAFhnn0LYD_466892TAdHAnkj27bhe5VwkOc",
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        setPage(data.blogPostCollection.items[0]);
      });
  }, []);

  if (!blogPost) {
    return "Loading...";
  }

  // render the fetched Contentful data
  return (
    <div className="App">
      <header className="App-header">
        <div class="post-wrapper">
          <img src={blogPost.image.url} class="App-logo" alt="logo" />
          <p class="title-wrapper">{blogPost.title}</p>
          <p>{blogPost.thoughts}</p>
        </div>
      </header>
    </div>
  );
}

export default App;