import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteServices from "../appwrite/post.service";

function AllPost() {
  // const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteServices.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);
  // console.log(posts);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
