import * as uuid from "uuid";
import { CreateTodoRequest } from "./requests";
import { TodoItem, TodoUpdate } from "./models";
import { TodoDao } from "../dao/todoDao";
import { S3Util } from "../utils/s3Util";
import { APIGatewayProxyEvent } from "aws-lambda";
import { AuthUtil } from "../utils/authUtil";
import { UpdateTodoRequest } from "./requests";

const todoAccess = new TodoDao();
const s3Helper = new S3Util();

export const getTodoItem = async (todoId: string): Promise<TodoItem> => {
    return await todoAccess.getTodoItem(todoId);
};

export const getTodo = async (todoId: string, event: APIGatewayProxyEvent): Promise<TodoItem> => {
    const userId = AuthUtil.getUserId(event);
    return await todoAccess.getTodo(todoId, userId);
};

export const getAllTodos = async (): Promise<TodoItem[]> => {
    return await todoAccess.getAllTodos();
};

export const getAllTodosByUser = async (event: APIGatewayProxyEvent): Promise<TodoItem[]> => {
    const userId = AuthUtil.getUserId(event);
    return await todoAccess.getAllTodosByUser(userId);
};

export const createTodo = async (request: CreateTodoRequest, event: APIGatewayProxyEvent): Promise<TodoItem> => {
    const todoId = uuid.v4();
    const userId = AuthUtil.getUserId(event);

    return await todoAccess.createTodo({
        createdAt: new Date().toISOString(),
        done: false,
        dueDate: request.dueDate,
        name: request.name,
        todoId,
        userId,
        attachmentUrl: ""
    });
};

export const updateAttachmentUrl = async (todoId: string, userId: string, attachmentUrl: string): Promise<void> => {
    return await todoAccess.updateAttachmentUrl(todoId, userId, attachmentUrl);
};

export const updateTodo = async (todoId: string, request: UpdateTodoRequest, event: APIGatewayProxyEvent): Promise<TodoUpdate> => {
    const userId = AuthUtil.getUserId(event);
    return await todoAccess.updateTodo(todoId, userId, request);
};

export const deleteTodo = async (todoId: string, event: APIGatewayProxyEvent): Promise<void> => {
    const userId = AuthUtil.getUserId(event);
    return await todoAccess.deleteTodo(todoId, userId);
};

export const getUploadUrl = (todoId: string) => s3Helper.getUploadUrl(todoId);

export const deleteS3BucketObject = (todoId: string) => s3Helper.deleteObject(todoId);