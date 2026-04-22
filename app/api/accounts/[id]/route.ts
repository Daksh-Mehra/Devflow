import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// get /api/accoutns/[id]
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
    const {id} = await params;
    try{
        await dbConnect();
        if(!id) throw new NotFoundError("Account");
        
        const account=await Account.findById(id);
        if(!account) throw new NotFoundError("Account");
        return NextResponse.json({success:true,data: account},{status:200});

        
    }catch(error){
        return handleError(error, "api") as APIErrorResponse;
    }

}

export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){
    const {id} = await params;
    try{
        await dbConnect();
        if(!id) throw new NotFoundError("Account");
        const account=await Account.findByIdAndDelete(id);
        if(!account) throw new NotFoundError("Account");
        return NextResponse.json({success:true,data: account},{status:200});
    }
    catch(error){
        return handleError(error, "api") as APIErrorResponse;
    }
}

export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}){
    const {id}=await params;
    try{
        await dbConnect();
        if(!id) throw new NotFoundError("Account");
        const body=await request.json();
        const validatedData=AccountSchema.partial().safeParse(body);
        if (!validatedData.success) {
              const fieldErrors: Record<string, string[]> = {};
        
              for (const issue of validatedData.error.issues) {
                const path = issue.path.join(".");
                if (!fieldErrors[path]) {
                  fieldErrors[path] = [];
                }
                fieldErrors[path].push(issue.message);
              }
        
              throw new ValidationError(fieldErrors);
            }
        const updatedAccount=await Account.findByIdAndUpdate(id,validatedData.data,{new:true});
        if(!updatedAccount) throw new NotFoundError("Account");
        return NextResponse.json({success:true,data: updatedAccount},{status:200});
    }catch(error){
        return handleError(error, "api") as APIErrorResponse;
    }
}