import { todoServices } from "../services/todoServices";
import { supabase } from "../db/dbConnection";
import { Request } from "express";
require('dotenv').config()

describe("todoServices", () => {
  beforeAll(() => {
    process.env.SUPABASE_URL = "https://dummy-url.com";
    process.env.SUPABASE_KEY = "dummy-key";
  });

  describe("addTodo", () => {
    it("should add a todo", async () => {
      const req: Request = {
        body: {
          title: "test todo",
        },
      } as Request;
      const insertMock = jest.fn().mockReturnValue({
        data: {
          id: "test-id",
          title: "test todo",
          completion: false,
        },
      });
      const fromMock = jest.fn().mockReturnValue({
        insert: insertMock,
      });
      (supabase as any).from = fromMock;

      await todoServices.addTodo(req);

      expect(fromMock).toHaveBeenCalledWith("todos");
      expect(insertMock).toHaveBeenCalledWith([
        { title: "test todo", completion: false },
      ]);
    });
  });
});

describe("checkTodo", () => {
  it("should update a todo's completion status", async () => {
    const req: Request = {
      body: {
        id: 1,
        completion: false,
      },
    } as Request;
    const updateMock = jest.fn().mockReturnValue({
      data: {
        id: 1,
        title: "test todo",
        completion: true,
      },
    });
    const eqMock = jest.fn().mockReturnValue({
      update: updateMock,
      // single: jest.fn(),
    });
    const fromMock = jest.fn().mockReturnValue({
      eq: eqMock,
      update: updateMock
    });
    (supabase as any).from = fromMock;

    console.log(eqMock());
    console.log(updateMock());

    await todoServices.checkTodo(req);

    expect(fromMock).toHaveBeenCalledWith("todos");
    expect(eqMock).toHaveBeenCalledWith("id", 1);
    expect(updateMock).toHaveBeenCalledWith({ completion: true });
  });
});

describe("todoServices", () => {
  beforeAll(() => {
    process.env.SUPABASE_URL = "https://dummy-url.com";
    process.env.SUPABASE_ANON_KEY = "dummy-key";
  });

  describe("searchTodos", () => {
    it("should search for todos", async () => {
      const searchText = "test";
      const req: Request = {
        body: {
          searchText,
        },
      } as Request;
      const todos = [
        { id: "test-id-1", title: "Test todo 1" },
        { id: "test-id-2", title: "Test todo 2" },
      ];
      const selectMock = jest.fn().mockReturnValue({
        textSearch: jest.fn().mockReturnValue({
          data: todos,
        }),
      });
      const fromMock = jest.fn().mockReturnValue({
        select: selectMock,
      });
      (supabase as any).from = fromMock;

      const result = await todoServices.searchTodos(req);

      expect(fromMock).toHaveBeenCalledWith("todos");
      expect(selectMock).toHaveBeenCalledWith("*");
      expect(selectMock().textSearch).toHaveBeenCalledWith("title", searchText);
      expect(result).toEqual(todos);
    });

    it("should throw an error if Supabase returns an error", async () => {
      const searchText = "test";
      const req: Request = {
        body: {
          searchText,
        },
      } as Request;
      const error = new Error("Something went wrong");
      const selectMock = jest.fn().mockReturnValue({
        textSearch: jest.fn().mockReturnValue({
          error,
        }),
      });
      const fromMock = jest.fn().mockReturnValue({
        select: selectMock,
      });
      (supabase as any).from = fromMock;

      await expect(todoServices.searchTodos(req)).rejects.toThrow(`Unable to search: ${error}`);
    });
  });
});

describe("sortTodos", () => {
  it("should return todos sorted by title in ascending order", async () => {
    const todos = [{ id: 1, title: "c" },{ id: 2, title: "a" },{ id: 3, title: "b" }];

    const mockFrom = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        order: jest.fn().mockReturnValue({
          data: todos,
          error: null,
        }),
      }),
    });
    (supabase as any).from = mockFrom;

   
    const sortedTodos = await todoServices.sortTodos();
    expect(sortedTodos).toEqual([
      { id: 2, title: "a" },
      { id: 3, title: "b" },
      { id: 1, title: "c" },
    ]);

 
    expect(mockFrom).toHaveBeenCalledWith("todos");
    expect(mockFrom("todos").select).toHaveBeenCalledWith("*");
    expect(mockFrom("todos").select("*").order).toHaveBeenCalledWith("title", { ascending: true });
  });

  it("should throw an error if supabase returns an error", async () => {
    const error = new Error("supabase error");


    const mockFrom = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        order: jest.fn().mockReturnValue({
          data: null,
          error: error,
        }),
      }),
    });
    (supabase as any).from = mockFrom;

    await expect(todoServices.sortTodos()).rejects.toThrow(`Unable to sort todos: ${error}`);

    expect(mockFrom).toHaveBeenCalledWith("todos");
    expect(mockFrom("todos").select).toHaveBeenCalledWith("*");
    expect(mockFrom("todos").select("*").order).toHaveBeenCalledWith("title", { ascending: true });
  });
});










