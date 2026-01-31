import * as jose from "jose";
import { compare, hash } from "bcrypt";
import { cookies } from "next/headers";
import { User } from "@/db/schema";

type JWTPayload = {
  userId: string;
  [key: string]: string | number | boolean | null | undefined;
};

const JWT_EXPIRATION = "7d";

// Safety check to ensure secret exists
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

export async function generateJWT(payload: JWTPayload) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string) {
  // CRITICAL FIX: Removed try/catch. If this fails, we WANT it to throw
  // so the user is not redirected without a cookie.
  const token = await generateJWT({ userId });

  const cookieStore = await cookies();

  cookieStore.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
  });
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyJWT(token);

    return payload ? { userId: payload.userId } : null;
  } catch (error) {
    // Handle Next.js prerendering edge case
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password);

  try {
    const user = await User.create({ email, password: hashedPassword });
    return { _id: user._id };
  } catch (err) {
    console.error("Create User Error:", err);
    return null;
  }
}
