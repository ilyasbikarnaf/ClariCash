import { Transaction, User } from "@/db/schema";
import { getSession } from "./auth";
import mongoose from "mongoose";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const session = await getSession();

  if (!session?.userId) {
    return null;
  }

  try {
    const user = await User.findOne(
      { _id: new mongoose.Types.ObjectId(session.userId) },
      { password: 0, __v: 0 }
    ).lean();

    if (!user) return null;

    return {
      ...user,
      id: user._id.toString(),
    };
  } catch (err) {
    console.error("Failed to get current user:", err);
    return null;
  }
});

export async function getUserByEmail(email: string) {
  try {
    const user = await User.findOne({ email }, { __v: 0, password: 0 });

    if (!user) {
      return null;
    }
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
