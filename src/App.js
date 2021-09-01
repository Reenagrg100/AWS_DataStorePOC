import React, { useEffect, useState } from "react";
import "./App.css";
import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Post } from "./models";
// import { createPost2, createPost3, createPost } from "./graphql/mutations";
import { API, graphqlOperation, Hub } from "aws-amplify";

import awsConfig from "./aws-exports";
Amplify.configure(awsConfig);

const App = () => {
	const [posts, setPosts] = useState([]);
	const [title, setTitle] = useState("");
	const [rating, setRating] = useState(undefined);
	const [status, setStatus] = useState("DRAFT");
	const [isPostEdit, setPostEdit] = useState(false);
	const [postId, setPostId] = useState(undefined);

	useEffect(() => {
		// Initially fetching all the data
		getAllPosts();
		// will be called everytime if there is any change in datastore.
		const subscription = DataStore.observe(Post).subscribe((msg) => {
			// whenever there is any change in the data store get all data
			getAllPosts();
			console.log("Subscription method:", msg);
		});

		// Hub.listen("datastore", async (hubData) => {
		// 	const { event, data } = hubData.payload;
		// 	if (event === "networkStatus") {
		// 		// console.log(`User has a network connection: ${data.active}`);
		// 	}
		// });

		// Hub.listen("datastore", async (hubData) => {
		// 	const { event, data } = hubData.payload;
		// 	// console.log("Sync event:", event);
		// 	if (event === "ready") {
		// 	}
		// });

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const handleAddPost = async (event) => {
		event.preventDefault(true);
		if (isPostEdit) {
			editPost();
		} else {
			await addPost();
		}
	};

	const addPost = async () => {
		try {
			await DataStore.save(
				new Post({
					title,
					rating: parseInt(rating),
					status,
				}),
			);

			// clearing the state values
			await clearFormFields();
			console.log("Post saved successfully!");
		} catch (error) {
			console.log("Error while saving post:", error);
		}
	};

	const getAllPosts = async () => {
		try {
			const posts = await DataStore.query(Post);
			console.log("posts:", posts);
			document.getElementById("form").reset();

			setPosts(posts);
		} catch (error) {
			console.log("Error while fetching posts:", error);
		}
	};

	const handleEditPost = async (post) => {
		setPostEdit(true);
		setTitle(post.title);
		setRating(post.rating);
		setStatus(post.status);
		setPostId(post.id);
	};

	const editPost = async () => {
		try {
			const original = await DataStore.query(Post, postId);
			console.log("Original:", original);
			await DataStore.save(
				Post.copyOf(original, (updated) => {
					updated.title = title;
					updated.rating = parseInt(rating);
				}),
			);
			await clearFormFields();
		} catch (error) {
			console.log("Error while editing post:", error);
		}
	};

	const clearFormFields = async () => {
		setTitle("");
		setRating("");
		setStatus("");
	};

	const deletePost = async (postId) => {
		try {
			const todelete = await DataStore.query(Post, postId);
			DataStore.delete(todelete);
		} catch (error) {
			console.log("Error while deleting post:", error);
		}
	};

	const deleteAllPosts = async () => {
		try {
			await DataStore.delete(Post, Predicates.ALL);
		} catch (error) {
			console.log("Error while deleting post:", error);
		}
	};

	// const createPostDirectlyOnAppsync = async () => {
	// 	try {
	// 		const res = await API.graphql(
	// 			graphqlOperation(createPost, {
	// 				input: { title: "Directly on appsync", rating: 5 },
	// 			}),
	// 		);
	// 		console.log("Result directly created on appsync:", res);
	// 	} catch (error) {
	// 		console.log("Error:", error);
	// 	}
	// };

	// const createPostThroughExternalMutation = async () => {
	// 	try {
	// 		const res = await API.graphql(
	// 			graphqlOperation(createPost2, {
	// 				input: { title: "Through external mutation", rating: 5 },
	// 			}),
	// 		);
	// 		console.log("Result directly created on appsync:", res);
	// 	} catch (error) {
	// 		console.log("Error:", error);
	// 	}
	// };

	// const createPostThroughLambda = async () => {
	// 	try {
	// 		const res = await API.graphql(
	// 			graphqlOperation(createPost3, {
	// 				input: { title: "through lambda", rating: 5 },
	// 			}),
	// 		);
	// 		console.log("Result directly created on appsync:", res);
	// 	} catch (error) {
	// 		console.log("Error:", error);
	// 	}
	// };

	const manualSync = async () => {
		try {
			await DataStore.start();
		} catch (error) {
			console.log("Error:", error);
		}
	};

	const clearDatastore = async () => {
		try {
			await DataStore.clear();
			// await DataStore.start();
			getAllPosts();
		} catch (error) {
			console.log("Error:", error);
		}
	};

	return (
		<div
			style={{
				marginLeft: 50,
				marginTop: 30,
				marginRight: 250,
				marginBottom: 30,
			}}
		>
			<h2>
				<center>
					<u>AWS DataStore Demo</u>
				</center>
			</h2>
			<br></br>
			<form onSubmit={handleAddPost} id="form">
				<h3>
					<u>Add/Edit Post</u>
				</h3>
				<div class="form-group mx-sm-3 mb-2">
					<label for="exampleInputEmail1">Title</label>
					<input
						class="form-control form-control-sm"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
					<label for="exampleInputPassword1">Rating</label>
					<input
						class="form-control"
						id="exampleInputPassword1"
						value={rating}
						onChange={(event) => setRating(event.target.value)}
					/>
				</div>
				<br></br>
				<button type="submit" className="btn btn-primary">
					Add
				</button>{" "}
				<br></br>
				<br></br>
				{/* <br></br>
				<br></br> */}
			</form>
			{/* <button
				type="button"
				className="btn btn-primary"
				onClick={createPostDirectlyOnAppsync}
			>
				Add directly on appsync
			</button>{" "}
			<button
				type="button"
				className="btn btn-primary"
				onClick={createPostThroughExternalMutation}
			>
				Add through external mutation
			</button>{" "}
			<button
				type="button"
				className="btn btn-primary"
				onClick={createPostThroughLambda}
			>
				Add through Lambda
			</button>{" "} */}
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => manualSync()}
			>
				Manual sync
			</button>{" "}
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => clearDatastore()}
			>
				Clear DataStore
			</button>{" "}
			<div>
				<hr />

				{/* All Posts */}
				<h3>
					<u>All Posts</u>
				</h3>
				<br></br>
				<button className="btn btn-primary btn" onClick={deleteAllPosts}>
					Delete All
				</button>
			</div>
			<br></br>
			<table className="table" border="1">
				<thead>
					<tr>
						<td>S.no</td>
						<td>Id</td>
						<td>Title</td>
						<td>Rating</td>
						<td>Version</td>
						<td></td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{posts.map((item, i) => {
						return (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{posts[i].id}</td>
								<td>{posts[i].title}</td>
								<td>{posts[i].rating}</td>
								<td>{posts[i]._version}</td>
								<td>
									<button onClick={() => handleEditPost(posts[i])}>Edit</button>
								</td>
								<td>
									<button onClick={() => deletePost(posts[i].id)}>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default App;
