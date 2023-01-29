// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    post: any;
    content: string;
};

interface SlugApiRequest extends NextApiRequest {
  query: {
    slug: string;
  };
}

export default async function handler(
    req: SlugApiRequest,
    res: NextApiResponse<Data>
) {
    const { slug } = req.query;
    const post = getPostBySlug(slug, ["title", "author", "content"]);
    const content = await markdownToHtml(post.content || "");
    res.status(200).json({ post, content })
}
