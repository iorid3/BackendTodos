import { Router } from "express";

import {todoAddHandler,
        checkTodoHandler,
        updateTodoTitleHandler,
        sortTodoTitleHandler,
        searchTodoTitleHandler,
        deleteAllTodoTitleHandler}
from "../controllers/todoController"

const router = Router();

router.post("/addtodo",todoAddHandler)
router.post("/checktodo",checkTodoHandler)
router.post("/updatetodo",updateTodoTitleHandler)
router.get("/sorttodo",sortTodoTitleHandler)
router.post("/searchtodo",searchTodoTitleHandler)
router.post("/deletealltodo",deleteAllTodoTitleHandler)

export default router