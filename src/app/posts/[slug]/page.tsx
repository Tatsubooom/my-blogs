import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { PostHeader } from "@/app/_components/post-header";
import { PostContent } from "./post-content";

// Paramsの型定義
type Params = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * 1. 静的パスの生成 (SSG 設定)
 * ビルド時に全ての記事の slug を取得し、HTMLを事前に書き出します。
 * これにより Firebase Hosting などの静的サーバーで 404 になるのを防ぎます。
 */
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * 2. ページコンポーネント本体
 */
export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <article className="pb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostContent content={content} />
        </article>
      </Container>
    </main>
  );
}

/**
 * 3. 各記事ごとのメタデータ生成 (OGP設定)
 */
export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  const title = `${post.title} | ${CMS_NAME}`;
  const description = post.excerpt || "TATSUBON'S BLOG 記事詳細";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://test-blog-a29a5.web.app/posts/${post.slug}`,
      images: [
        {
          url: post.ogImage.url,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.ogImage.url],
    },
  };
}