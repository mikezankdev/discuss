import PostList from "@/components/posts/post-list"
import { fetchPostsBySearchTerm } from "@/db/queries/posts"
import { redirect } from "next/navigation"

interface Props {
    searchParams: {
        term: string
    }
}

export default async function SearchPage({ searchParams }: Props) {
    const { term } = searchParams

    if (!term) {
        redirect('/')
    }

    return <div>
        <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
        </div>
}