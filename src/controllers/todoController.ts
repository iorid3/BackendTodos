import { Request, Response, NextFunction } from "express";
import { todoServices } from "../services/todoServices"


export const todoAddHandler = async (req: Request, res: Response,next: NextFunction)=>{
    try{
        const response = await todoServices.addTodo(req);
        return res.json({data:response})
    }
    catch{
     console.log(Error)
     next(Error);
    }
}

export const checkTodoHandler = async (req: Request, res: Response,next: NextFunction)=>{
    try{
        const response = await todoServices.checkTodo(req);
        return res.json({data:response})
    }
    catch{
     console.log(Error)
     next(Error);
    }
}

export const updateTodoTitleHandler = async (req: Request, res: Response,next: NextFunction)=>{
    try{
        const response = await todoServices.checkTodo(req);
        return res.json({data:response})
    }
    catch{
     console.log(Error)
     next(Error);
    }
}


export const sortTodoTitleHandler = async (req: Request, res: Response,next: NextFunction)=>{
    try{
        const response = await todoServices.sortTodos();
        return res.json({data:response})
    }
    catch{
     console.log(Error)
     next(Error);
    }
}


export const searchTodoTitleHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await todoServices.searchTodos(req);
      return res.json({ data: response });
    } catch (error:any) {
      console.log(error);
      next(new Error(`Unable to search: ${error.message}`));
    }
  };


  export const deleteAllTodoTitleHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await todoServices.deleteAllTodos(req);
      return res.json({ data: response });
    } catch (error:any) {
      console.log(error);
      next(new Error(`Unable to search: ${error.message}`));
    }
  };