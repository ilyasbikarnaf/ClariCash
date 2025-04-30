import { ObjectId } from "mongoose";

export type TransactionType = {
  name: string;
  amount: number;
  category: "income" | "expense";
  date: Date;
  createdAt: Date;
  _id: String;
};
