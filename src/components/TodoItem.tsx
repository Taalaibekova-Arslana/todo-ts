import { FC, useState } from "react";
import { TodoType } from "../types";
import { Button, TextField } from "@mui/material";
import axios from "axios";

import scss from "./TodoItem.module.scss";

const url = import.meta.env.VITE_BACKEND_URL;

const TodoItem: FC<{ todo: TodoType[]; getTodo: () => void }> = ({
	todo,
	getTodo,
}) => {
	const [save, setSave] = useState(null);

	const [value, setValue] = useState({
		name: "",
		password: "",
		img: "",
		price: "",
	});

	const deleteTodo = async (_id) => {
		await axios.delete(`${url}/${_id}`);
		getTodo();
	};

	const handleInput = (e: any) => {
		const { id, value } = e.target;
		setValue((values) => ({
			...values,
			[id]: value,
		}));
	};

	const saveTodo = async (id) => {
		const newData = {
			name: value.name,
			password: value.password,
			img: value.img,
			price: value.price,
		};
		await axios.patch(`${url}/${id}`, newData);
		setSave(null);
		getTodo();
	};

	const editTodo = async (item) => {
		setValue(item);
		setSave(item._id);
	};

	return (
		<div className={scss.todoItem}>
			<div className="container">
				<div className={scss.cards}>
					{todo.map((item, index) => (
						<div className={scss.card} key={index}>
							{save === item._id ? (
								<>
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
									<Button
										onClick={() => saveTodo(item._id)}
										variant="contained"
										href="#contained-buttons">
										Save
									</Button>
								</>
							) : (
								<>
									<h1>{item.name}</h1>
									<p>{item.password}</p>
									<img src={item.img} alt="" />
									<p>{item.price}</p>
									<div className={scss.buttons}>
										<Button
											onClick={() => deleteTodo(item._id)}
											variant="contained"
											href="#contained-buttons">
											Delete
										</Button>

										<Button
											onClick={() => editTodo(item)}
											variant="contained"
											href="#contained-buttons">
											Edit
										</Button>
									</div>
								</>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TodoItem;
