import { getAllPosts } from "../../../lib/api";
import css from "./page.module.css";
import "./prism-theme.css";

export async function generateStaticParams() {
    const posts = getAllPosts(["slug"]);

    return await Promise.all(
        posts.map(async (post) => {
            return {
                slug: post.slug,
            };
        })
    );
}

export default async function Post({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const { post, content } = await fetch(
        `http://localhost:3000/api/blogs/${slug}`
    ).then((res) => res.json());

    return (
        <main>
            <article>
                <h1 className={css.title}>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>
        </main>
    );
}
