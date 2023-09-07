import { isEmpty, isEqual } from "lodash";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password, confirmPassword } = await req.json();

  if (
    isEmpty(name) &&
    isEmpty(email) &&
    isEmpty(password) &&
    isEmpty(confirmPassword)
  ) {
    return NextResponse.json(
      {
        error: "The body cannot be empty",
      },
      { status: 422 }
    );
  }
  if (!isEqual(password, confirmPassword)) {
    return NextResponse.json(
      {
        error: "Password does not match with confirmation field",
      },
      { status: 422 }
    );
  }

  const exists = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // inserting user to the db
  const user = await db.user.create({
    data: {
      name,
      email,
      password: await hash(password, 10),
      emailVerified: new Date().toISOString(),
    },
  });
  return NextResponse.json(user);
}
