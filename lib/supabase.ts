import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = () =>{
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{
            async accessToken() {
                return (((await auth()).getToken()))
                
            }
        }
    );

}