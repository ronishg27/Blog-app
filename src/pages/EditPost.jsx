import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteServices from "../appwrite/post.service";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (!slug) navigate("/");
		appwriteServices.getPost(slug).then((post) => {
			if (post) setPost(post);
		});
	}, [slug, navigate]);

	return post ? (
		<div className="py-8">
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : null;
}

export default EditPost;