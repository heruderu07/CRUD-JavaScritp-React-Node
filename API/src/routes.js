const express = require("express");
const {PrismaClient}  = require("@prisma/client"); 

const taskRoutes = express.Router();

const prisma = new PrismaClient();

taskRoutes.post("/task", async (request, response) => {
    const { name } = request.body;
    const todo = await prisma.todo.create({
        data: {
            name,
        },
    });
    return response.status(201).json(todo);
});

taskRoutes.get("/task", async (request, response) => {
    const todo = await prisma.todo.findMany();
    return response.status(200).json(todo);
});

taskRoutes.put("/task", async (request, response) => {
    const { name, id, status } = request.body;

    if (!id) {
        return response.status(400).json("Id is mandatory");
    };

    const todoAlreadyExists = await prisma.todo.findUnique({ where: {id} });

    if (!todoAlreadyExists) {
        return response.status(404).json("Todo does not exist");
    };

    const todo = await prisma.todo.update({
        where: {
            id,
        },
        data: {
            name,
            status,
        },
    });
    return response.status(200).json(todo);
});

    taskRoutes.delete("/task/:id", async (request, response) => {
        const { id } = request.params;
        const convertedId = parseInt(id);
       
        if (!convertedId) {
            return response.status(400).json("Id is mandatory");
        };
    
        const todoAlreadyExists = await prisma.todo.findUnique({ where: {id: convertedId} });
    
        if (!todoAlreadyExists) {
            return response.status(404).json("Todo does not exist");
        };
    
        await prisma.todo.delete({ where: { id: convertedId }})
        return response.status(200).json("Task " + convertedId + " deleted");
    });



module.exports = taskRoutes;
