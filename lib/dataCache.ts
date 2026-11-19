type CACHE_TAG = "products" | "users" | "courses" | "userCourseAccess" | "courseSections" | "lessons";


export function getGlobalTag(tag: string){
    return `global:${tag}` as const;
}


export function getIdTag(tag:  CACHE_TAG, id: string){
    return `id:${id}-${id}` as const;
}


export function getUserTag(tag:  CACHE_TAG, userId: string){
    return `user:${userId}-${tag}` as const;
}


export function getCourseTag(tag:  CACHE_TAG, courseId: string){
    return `course:${courseId}-${tag}` as const;
}
