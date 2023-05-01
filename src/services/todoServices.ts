import { supabase } from "../db/dbConnection";
import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo.interface";

export class todoServices {
  static async addTodo(req: Request): Promise<Todo[]> {
    const { title } = req.body;
    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ title: `${title}`, completion: false }])
        .select();
      if (error) {
        throw error;
      }
      console.log(data);
      return data as Todo[];
    } catch (error) {
      console.log(error);
      throw new Error(`Unable to add: ${error}`);
    }
  }

  static async checkTodo(req: Request): Promise<Todo[]> {
    const { id, completion} = req.body;
    const now = new Date().toISOString();
    console.log(req.body)
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ completion: !completion, updated_at:now})
        .eq("id", id)
        .select();
      if (error) {
        throw error;
      }
      console.log(data);
      return data as Todo[];
    } catch (error) {
      console.log(error);
      throw new Error(`Unable to update completion: ${error}`);
    }
  }

  static async updateTodoTitle(req: Request): Promise<void> {
    const { id, title } = req.body;
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ title: title })
        .eq("id", id)
        .single();
      if (error) {
        throw error;
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`Unable to update title: ${error}`);
    }
  }

  static async searchTodos(req: Request): Promise<Todo[]> {
    const { searchText } = req.body;
    console.log(req);
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .ilike("title", `%${searchText}%`);
      if (error) {
        throw error;
      }
      console.log(searchText);
      return data.map((todo: any) => ({ id: todo.id, title: todo.title })) as Todo[];
      // return data as Todo[]
    } catch (error) {
      console.log(error);
      throw new Error(`Unable to search: ${error}`);
    }
  } 
  
  static async deleteAllTodos(req: Request): Promise<Todo[]> {
    console.log(req);
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ isActive: false })
        .eq('isActive', true)
        .select();
      if (error) {
        throw error;
      }
      return data as Todo[]
    } catch (error) {
      console.log(error);
      throw new Error(`Unable to search: ${error}`);
    }
  }

  static async sortTodos(): Promise<Todo[]> {
    try {
      const { data: todos, error } = await supabase
        .from("todos")
        .select("*")
        .eq("isActive", true)
        .order("title", { ascending: true });
      if (error) {
        throw error;
      }
      console.log(todos);
      const sortedTodos = todos
        .map((todo: any) => ({
          id: todo.id,
          title: todo.title,
          completion: todo.completion,
        }))
        .sort((a, b) => a.title.localeCompare(b.title, undefined));
      return sortedTodos;
    } catch (error) {
      console.log(error);
      throw new Error(`Unable to sort todos: ${error}`);
    } 
  }
}
