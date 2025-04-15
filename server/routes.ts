import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPoemSchema, updatePoemSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for poems
  const poemsRouter = express.Router();
  
  // GET all poems
  poemsRouter.get("/", async (req, res) => {
    try {
      const poems = await storage.getPoems();
      res.json(poems);
    } catch (error) {
      console.error("Failed to get poems:", error);
      res.status(500).json({ message: "Failed to get poems" });
    }
  });
  
  // GET a single poem by ID
  poemsRouter.get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid poem ID" });
      }
      
      const poem = await storage.getPoem(id);
      if (!poem) {
        return res.status(404).json({ message: "Poem not found" });
      }
      
      res.json(poem);
    } catch (error) {
      console.error("Failed to get poem:", error);
      res.status(500).json({ message: "Failed to get poem" });
    }
  });
  
  // CREATE a new poem
  poemsRouter.post("/", async (req, res) => {
    try {
      const parseResult = insertPoemSchema.safeParse(req.body);
      if (!parseResult.success) {
        const validationError = fromZodError(parseResult.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const newPoem = await storage.createPoem(parseResult.data);
      res.status(201).json(newPoem);
    } catch (error) {
      console.error("Failed to create poem:", error);
      res.status(500).json({ message: "Failed to create poem" });
    }
  });
  
  // UPDATE a poem
  poemsRouter.patch("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid poem ID" });
      }
      
      const parseResult = updatePoemSchema.safeParse(req.body);
      if (!parseResult.success) {
        const validationError = fromZodError(parseResult.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const updatedPoem = await storage.updatePoem(id, parseResult.data);
      if (!updatedPoem) {
        return res.status(404).json({ message: "Poem not found" });
      }
      
      res.json(updatedPoem);
    } catch (error) {
      console.error("Failed to update poem:", error);
      res.status(500).json({ message: "Failed to update poem" });
    }
  });
  
  // DELETE a poem
  poemsRouter.delete("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid poem ID" });
      }
      
      const success = await storage.deletePoem(id);
      if (!success) {
        return res.status(404).json({ message: "Poem not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Failed to delete poem:", error);
      res.status(500).json({ message: "Failed to delete poem" });
    }
  });
  
  // Mount the poems router
  app.use("/api/poems", poemsRouter);

  const httpServer = createServer(app);
  
  return httpServer;
}
