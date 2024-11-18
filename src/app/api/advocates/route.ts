import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, eq } from "drizzle-orm";

const isNumber = (value: string | null) => {
  if (!value) return false;

  return !isNaN(Number(value));
};

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get("searchTerm");
  const page = request.nextUrl.searchParams.get("page");

  const itemsPerPage = 10;
  const currentPage = isNumber(page) ? Number(page) : 1;
  const offset = (currentPage - 1) * itemsPerPage;

  const dbData = await db
    .select()
    .from(advocates)
    .where(
      or(
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`),
        ilike(advocates.city, `%${searchTerm}%`),
        ilike(advocates.degree, `%${searchTerm}%`),
        isNumber(searchTerm)
          ? eq(advocates.yearsOfExperience, Number(searchTerm))
          : undefined
      )
    )
    .limit(itemsPerPage)
    .offset(offset);

  return Response.json({ data: dbData });
}
