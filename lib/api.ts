import "server-only";

import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export async function getPostSlugs() {
    const entries = await readdir(postsDirectory, { withFileTypes: true });
    const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);

    return files;
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, slug);
    const fileContents = await readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    console.log('DATA', data, content);

    type Items = {
        [key: string]: string;
    };

    const items: Items = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === "slug") {
            items[field] = realSlug;
        }
        if (field === "content") {
            items[field] = content;
        }

        if (typeof data[field] !== "undefined") {
            items[field] = data[field];
        }
    });

    return items;
}

export async function getAllPosts(fields: string[] = []) {
    const slugs = await getPostSlugs();
    const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug, fields)));

    console.log('POSTS', posts);
    return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
