import tickets from "@/app/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    const searchParams=request.nextUrl.searchParams;
    console.log(searchParams);
    const query=searchParams.get("query");
    if(!query){
        return NextResponse.json([])
    }
    const filteredtickets=tickets.filter((ticket)=>ticket.name.toLowerCase().includes(query.toLowerCase()));
    return NextResponse.json(filteredtickets,{status:200})
}