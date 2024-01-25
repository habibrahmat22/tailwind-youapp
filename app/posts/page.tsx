import CardList from "../components/posts/CardList";
import ViewUserButton from "../components/posts/ViewUserButton";
import styles from "./postPage.module.css";
const base_url = "https://jsonplaceholder.typicode.com/posts";

interface Iposts {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const Posts = async () => {
  const response = await fetch(base_url,{
    cache : "no-store"
  });
  const posts: Iposts[] = await response.json();

  return (
    <>
    <p>{new Date().toLocaleTimeString()}</p>
    <button className={styles.btnRgb}>submit </button>
      <h1 className={styles.bgRed}>POSTING PAGE</h1>
      {posts.map((post) => {
        return (
          <CardList key={post.id}>
            <p>{post.id}</p>
            <i>{post.title}</i>
            <p>{post.body}</p>
            <ViewUserButton userId={post.userId} />
          </CardList>
        );
      })}
    </>
  );
};

export default Posts;
