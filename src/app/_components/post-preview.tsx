import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div className="flex flex-col items-center py-4 w-full">
      <div className="w-full aspect-video flex-shrink-0 mb-3 overflow-hidden rounded-md bg-white shadow-sm">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>

      <div className="flex-1 text-center">
        <h3 className="text-xl font-bold leading-snug mb-2 ">
          <Link href={`/posts/${slug}`} className="hover:underline text-[#0e1117]">
            {title}
          </Link>
        </h3>
        
        <div className="text-sm text-slate-400">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </div>
  );
}