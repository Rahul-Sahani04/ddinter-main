import { connectToDatabase } from "@/lib/mongodb";

import { NextFunction, Request, Response } from "express";

export default async function handler(req : Request, res : Response, next : NextFunction) {
    if (req.method === "POST") {
        console.log("In POST API ROUTE", req.body);
        const { db } = await connectToDatabase();
        const drugName = req.body.drugName;
        console.log("Drug Name: ", drugName);
        const similarDrugs = await db
            .collection("interactions")
            .aggregate([
            { $match: { $or: [
                { Drug_A: { $regex: `^${drugName}`, $options: 'i' } },
            ] } },
            { $group: { _id: { Drug_A: "$Drug_A", Drug_B: "$Drug_B" } } },
            { $limit: 5 },
            { $project: { _id: 0, Drug_A: "$_id.Drug_A", Drug_B: "$_id.Drug_B" } },
            { $group: { _id: null, similarDrugs: { $addToSet: "$Drug_A" } } },
            { $project: { _id: 0, similarDrugs: 1 } }
            ])
            .toArray();

        return res.status(200).json({ similarDrugs: similarDrugs });
    }

    return res.status(400).json({ message: "This route is not defined" });

}



