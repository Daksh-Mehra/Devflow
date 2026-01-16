import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import React from "react";

const page =async () => {
  const session=await auth();

  console.log(session);
  return<>
   <div className="text-2xl">welcome to my website</div>;
   <form
   className="px-10 pt-[100px]"
   action={async()=>{
    "use server";
    await signOut({redirectTo:ROUTES.SIGN_IN});
   }}>
    <Button type="submit">Log out</Button>
   </form>
  </>
};

export default page;
