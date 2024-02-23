import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: any) {
	const sql = "select * from products order by id desc";
	const result = await query(sql, "");

	try {
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json(error);
	}
}

export async function POST(req: NextRequest) {
	const data = await req.formData();
	const sql = `insert into products (Name, BuyPrice,SellPrice) values(?,?,?)`;

	const values = [
		data.get("name" || ""),
		data.get("buyPrice" || ""),
		data.get("sellPrice" || ""),
	];

	try {
		await query(sql, values);
		return NextResponse.json({
			status: "success",
			message: "Successfully created",
		});
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json({
			status: "error",
			message: "Error Processing",
			error,
		});
	}
}

export async function PATCH(req: NextRequest) {
	const data = await req.formData();
	const sql = `update products set Name = ?, BuyPrice = ?,SellPrice = ? where Id = ? `;

	const values = [
		data.get("name" || ""),
		data.get("buyPrice" || ""),
		data.get("sellPrice" || ""),
		data.get("id" || ""),
	];

	try {
		await query(sql, values);
		return NextResponse.json({
			status: "Success",
			message: "Successfully Updated",
		});
	} catch (error) {
		console.error("Error : ", error);
		return NextResponse.json({
			status: "error",
			message: "Error processing update",
			error,
		});
	}
}
