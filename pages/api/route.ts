import { NextFunction, Request, Response } from "express";

export default async function handler(req : Request, res : Response, next : NextFunction) {
  console.log("Hello from the server");
  return res.status(400).json({ message: "Welcome message" });
}
