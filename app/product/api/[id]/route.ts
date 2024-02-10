import React from "react";
import { query } from "@/app/db";
import { NextResponse } from "next/server";

export async function Delete(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	const sql = `delete from products where id = ?`;

	try {
		const data = await query(sql, [id]);
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(error);
	}
}