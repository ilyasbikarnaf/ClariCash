import { connectToDatabase } from "@/db/db";
import { Transaction, User } from "@/db/schema";
import { getSession } from "./auth";
import mongoose from "mongoose";

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(session.userId),
    });

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
