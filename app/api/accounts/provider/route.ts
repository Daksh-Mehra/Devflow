import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { providerAccountId } = await request.json();

    try{
        await dbConnect();
        const validatedData=AccountSchema.partial().safeParse({ providerAccountId });
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
        const account=await Account.findOne({ providerAccountId });
        if(!account) throw new NotFoundError("Account");
        return NextResponse.json({ success: true, data: account }, { status: 200 });
        
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }
    
}