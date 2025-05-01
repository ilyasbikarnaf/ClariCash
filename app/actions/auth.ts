"use server";

import { connectToDatabase } from "@/db/db";
import { User } from "@/db/schema";
import {
  createSession,
  createUser,
  deleteSession,
  verifyPassword,
} from "@/lib/auth";
import { getUserByEmail } from "@/lib/dal";
import { SigninSchema, SignupSchema } from "@/lib/zodSchemas";

export type ActionResponse = {
  success: boolean;
  message: string;
  error?: string;
};

export async function signup(formData: FormData): Promise<ActionResponse> {
  try {
    await connectToDatabase();
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validatedData = SignupSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        message: "validation failed",
        success: false,
        error: validatedData.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { email, password } = validatedData.data;

    const existingUser = await User.findOne({ email }, { password: 0, __v: 0 });
    if (existingUser) {
      return {
        message: "User already exists",
        success: false,
      };
    }

    const user = await createUser(email, password);

    if (!user) {
      return { message: "failed to signup", success: false };
    }

    await createSession(user._id.toString());

    return {
      message: "Account created succesfully",
      success: true,
    };
  } catch (err) {
    return { message: "An expected error occured", success: false };
  }
}

export async function signin(formData: FormData): Promise<ActionResponse> {
  try {
    await connectToDatabase();
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validatedData = SigninSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        message: "Validation failed",
        success: false,
        error: validatedData.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { email, password } = validatedData.data;

    const user = await getUserByEmail(email);

    if (!user) {
      return {
        message: "Invalid email or password",
        success: false,
      };
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return {
        message: "Invalid email or password",
        success: false,
      };
    }

    await createSession(user._id.toString());

    return {
      message: "Signed in succesfully",
      success: true,
    };
  } catch (err) {
    return {
      message: "An Error occured",
      success: false,
    };
  }
}

export async function logout() {
  try {
    await deleteSession();
    return {
      message: "Signed out succesfully",
      success: true,
    };
  } catch (err) {
    return {
      message: "Failed to logout",
      success: false,
    };
  }
}
