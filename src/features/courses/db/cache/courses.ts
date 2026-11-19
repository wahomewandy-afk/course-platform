import { getIdTag } from "@/lib/dataCache";
import { getGlobalTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getCourseGlobalTag(){
    return getGlobalTag("courses");
}

export function getCourseIdTag(id: string){
    return getIdTag("courses", id);
}
// when you want to tag a particular user 

export function revalidateCourseCache( id: string){
    revalidateTag(getCourseGlobalTag(),"max");
    revalidateTag(getCourseIdTag(id),"max");
}