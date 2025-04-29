"use server";

import { connectToDatabase } from "@/db/db";
import { TransactionSchema } from "@/lib/zodSchemas";
import { ActionResponse } from "./auth";
import { Transaction } from "@/db/schema";

type TransactionType = {
  name: string;
  amount: number;
  category: "income" | "expense";
  date: Date;
  createdAt: Date;
};

export async function createTransaction(
  formData: FormData
): Promise<ActionResponse> {
  try {
    await connectToDatabase();
    const data = {
      name: formData.get("name") as string,
      amount: parseFloat(formData.get("amount") as string),
      category: formData.get("category") as string,
      date: new Date(formData.get("date") as string),
    };

    const validatedData = TransactionSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        message: validatedData.error.errors
          .map((err) => err.message)
          .join(", "),
        success: false,
      };
    }
    const { name, amount, category, date } = validatedData.data;

    const transaction = await Transaction.create({
      name,
      amount,
      category,
      date,
    });

    if (!transaction) {
      return {
        message: "Failed to create transaction",
        success: false,
      };
    }

    return { message: "Transaction created succesfully", success: true };
  } catch (err) {
    console.log(err);
    return { message: "An unexpected error occured", success: false };
  }
}

export async function getAllTransactions() {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find({}, { _id: 0, __v: 0 })
      .sort({
        date: -1,
        createdAt: -1,
      })
      .lean();

    return transactions as TransactionType[];
  } catch (err) {
    console.log(err);
  }
}

// export async function getLast5Transactions() {
//   try {
//     await connectToDatabase();

//     const transactions = await Transaction.find({}, { _id: 0, __v: 0 })
//       .sort({
//         date: -1,
//         createdAt: -1,
//       })
//       .lean();

//     return transactions as TransactionType[];
//   } catch (err) {
//     console.log(err);
//   }
// }
