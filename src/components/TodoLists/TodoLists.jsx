import React, { useEffect } from "react";
import "./TodoLists.css";
import { useSelector, useDispatch } from "react-redux";
import { List } from "./List/List";
import { getTodoLists } from "../../store/thunk/todoLists/getTodoLists";
import { Loader } from "../general/Loaded/Loader";
import { Button } from "@material-ui/core";
import { Confirm } from "./Confirm/Confirm";
import { CreateList } from "./CreateList/CreateList";
import { ListEditor } from "./ListEditor/ListEditor";

export const TodoLists = () => {
  const dispatch = useDispatch();
  const todoLists = useSelector((state) => state.todoLists);
  const loading = useSelector((state) => state.loading);
  const confirmed = useSelector((state) => state.confirmed);
  const inCreateMod = useSelector((state) => state.createMod);
  const inEditMod = useSelector((state) => state.inEditMod);

  useEffect(() => {
    dispatch(getTodoLists());
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="todoLists">
      <div className="todoWrapper">
        <div className="title">Todo Lists</div>
        <div className="todoContainer">
          {todoLists.map((list) => (
            <List key={list._id} list={list} />
          ))}
        </div>
        {confirmed && <Confirm />}
        <Button size="large" onClick={() => dispatch({ type: "CREAT_MOD" })}>
          create list
        </Button>
        {inCreateMod && <CreateList />}
        {inEditMod && <ListEditor />}
      </div>
    </div>
  );
};
