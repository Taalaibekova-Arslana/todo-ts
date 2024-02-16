import { FC, useEffect, useState } from "react";
// import { TodoType } from "../types";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import TodoItem from "./TodoItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import scss from "./TodoList.module.scss";

const url = import.meta.env.VITE_BACKEND_URL;

const TodoList: FC = () => {
	const [value, setValue] = useState({
		name: "",
		password: "",
		img: "",
		price: "",
	});
	const [todo, setTodo] = useState([]);

	const inputValue =
		value.name === "" ||
		value.password === "" ||
		value.img === "" ||
		value.price === "";

	const getTodo = async () => {
		const response = (await axios.get(url)).data;
		setTodo(response);
	};

	const postTodo = async () => {
		if (inputValue) {
			toast.error("Please enter");
			return;
		} else {
			const response = (await axios.post(url, value)).data;
			toast.success("Successfully");
			setTodo(response);
			setValue({
				name: "",
				password: "",
				img: "",
				price: "",
			});
		}
	};

	useEffect(() => {
		getTodo();
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleInput = (e: any) => {
		const { id, value } = e.target;
		setValue((values) => ({
			...values,
			[id]: value,
		}));
	};

	const deleteAll = async () => {
		await axios.delete(url);
		getTodo();
	};

	return (
		<div className={scss.todos}>
			<div className="container">
				<h1 className={scss.title}> TodoList</h1>
				<div className={scss.inputs}>
					<TextField
						id="name"
						label="name"
						type="text"
						variant="outlined"
						value={value.name}
						onChange={handleInput}
					/>
					<TextField
						id="password"
						label="password"
						type="password"
						variant="outlined"
						value={value.password}
						onChange={handleInput}
					/>
					<TextField
						id="img"
						label="image"
						type="text"
						variant="outlined"
						value={value.img}
						onChange={handleInput}
					/>
					<TextField
						id="price"
						label="price"
						type="number"
						variant="outlined"
						value={value.price}
						onChange={handleInput}
					/>
					<Button variant="outlined" onClick={postTodo}>
						Add
					</Button>
					<Button variant="outlined" onClick={deleteAll}>
						Delete All
					</Button>
				</div>
			</div>
			<ToastContainer />
			<TodoItem getTodo={getTodo} todo={todo} />
		</div>
	);
};

export default TodoList;
