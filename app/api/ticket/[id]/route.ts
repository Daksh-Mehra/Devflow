import tickets from "@/app/database";
import { NextResponse } from "next/server";

export async function GET(request:Request,{params}:{params:Promise<{id:string}>}){
    const {id}=await params;
    const ticket=tickets.find((ticket)=>ticket.id===parseInt(id));
    return NextResponse.json(ticket)
}

export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}){
    const {name,status,type}=await request.json();
    const {id}=await params;
    const ticket=tickets.find((ticket)=>ticket.id===parseInt(id));
    if(!ticket){
        return NextResponse.json({error:"Ticket not found"},{status:404})
    }
    if(name) ticket.name=name;
    if(status) ticket.status=status;
    if(type) ticket.type=type;
    return NextResponse.json(ticket)
    
};

export async function DELETE(request:Request,{params}:{params:Promise<{id:string}>}){
    const {id}=await params;
    const index=tickets.findIndex((ticket)=>ticket.id===parseInt(id));
    if(index===-1){
        return NextResponse.json(new Error("Ticket not found"),{status:404})
    }
    tickets.splice(index,1);
    return NextResponse.json(tickets)
}