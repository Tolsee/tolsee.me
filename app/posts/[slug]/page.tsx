import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

import css from "./page.module.css";
import "./prism-theme.css";
import "./remark.css";

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
    const post = getPostBySlug(slug, ["title", "author", "content"]);
    const content = await markdownToHtml(post.content || "");

    return (
        <div className={css.container}>
            <main>
                <article>
                    <h1 className={css.title}>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </article>
            </main>
        </div>
    );
}
