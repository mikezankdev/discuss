import { Comment } from "@prisma/client";
import { db } from "..";
import { cache } from "react";

export type CommentWithAuthor = (Comment & 
    { user: { 
        name: string | null 
        image: string | null
    }
})

function fetchCommentsFn(postId: string): Promise<CommentWithAuthor[]> {
    console.log('fetching')
    return db.comment.findMany({
        where: { postId },
        include: {
            user: { select: { name: true, image: true }
        }}
    })
}

export const fetchCommentsByPostId = cache(fetchCommentsFn)


// export const fetchCommentsByPostId = (postId: string): Promise<CommentWithAuthor[]> => {
//     console.log('fetching')
//     return db.comment.findMany({
//         where: { postId },
//         include: {
//             user: { select: { name: true, image: true }
//         }}
//     })
// }
    
