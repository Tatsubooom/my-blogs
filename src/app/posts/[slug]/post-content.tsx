'use client'; // クライアントコンポーネントとしてマーク

import { PostBody } from "@/app/_components/post-body";
import Script from "next/script"; // 再びNext.jsのScript機能を呼び出します

type Props = {
  content: string;
};

export function PostContent({ content }: Props) {
  return (
    <>
      {}
      <Script src="https://embed.zenn.studio/js/listen-embed-event.js" />
      <PostBody content={content} />
    </>
  );
}