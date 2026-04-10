import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import cn from "classnames";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section className="max-w-3xl mx-auto px-5">
      <h2 className="mb-8 text-5xl font-bold">Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
        {posts.map((post, index) => {
          const isLastRow = index >= posts.length - (posts.length % 2 === 0 ? 2 : 1);

          return (
            <div 
              key={post.slug} 
              className={cn(!isLastRow && "border-b border-slate-800")}
            >
              <PostPreview
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
