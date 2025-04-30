"use server";

import { connectToDatabase } from "@/db/db";
import { TransactionSchema } from "@/lib/zodSchemas";
import { ActionResponse } from "./auth";
import { Transaction, User } from "@/db/schema";
import { TransactionType } from "@/lib/types";
import { isValidObjectId } from "mongoose";
import { getCurrentUser } from "@/lib/dal";

export async function createTransaction(
  formData: FormData
): Promise<ActionResponse> {
  try {
    await connectToDatabase();

    const { id } = await getCurrentUser();
    if (!id) {
      console.log("no id provided");
      return { message: "you must log in", success: false };
    }

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
      userId: id.toString(),
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

    const { id } = await getCurrentUser();
    if (!id) {
      console.log("no id provided");
      return { message: "you must log in", success: false };
    }

    const transactions = await Transaction.find({ userId: id }, { __v: 0 })
      .sort({
        date: -1,
        createdAt: -1,
      })
      .lean();

    return transactions.map((transaction) => ({
      ...transaction,
      _id: transaction._id.toString(),
    })) as TransactionType[];
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTransaction(
  transactionId: string | number
): Promise<ActionResponse> {
  try {
    await connectToDatabase();

    console.log(transactionId);

    if (!isValidObjectId(transactionId)) {
      return { message: "Invalid transaction ID", success: false };
    }

    const deleted = await Transaction.deleteOne({ _id: transactionId });

    if (!deleted.deletedCount) {
      return {
        message: "Failed to delete the Transaction",
        success: false,
      };
    }

    return { message: "Transaction deleted Succesfully", success: true };
  } catch (err) {
    console.log(err);

    return { message: "Failed to delete the Transaction", success: false };
  }
}
