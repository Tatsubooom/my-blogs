'use client'; // クライアントコンポーネントとしてマーク

import { useEffect } from "react";
import { PostBody } from "@/app/_components/post-body";
import initTwitterScriptInner from "zenn-embed-elements/lib/init-twitter-script-inner";

type Props = {
  content: string;
};

export function PostContent({ content }: Props) {
  useEffect(() => {
    import('zenn-embed-elements');
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner
        }}
      />
      <PostBody content={content} />
    </>
  );
}