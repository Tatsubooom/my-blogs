import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm absolute inset-0 w-full h-full m-auto object-contain bg-white rounded-md', {
        'hover:shadow-lg transition-shadow duration-200': slug,
      })}
    />
  );
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title} className="block w-full h-full">
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;