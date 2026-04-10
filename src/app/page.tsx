import Container from "@/app/_components/container";
import { MoreStories } from "@/app/_components/more-stories";
import { Profile } from "@/app/_components/profile";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main className="pt-24 md:pt-32"> {/* ヘッダー固定分の余白を確保しつつ、記事を上に */}
      <Container>
        {/* 以前あった Top. という見出しエリアを完全に削除 */}

        {/* 記事一覧セクション：ここがページ最上部になります */}
        <div className="mb-24">
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
        </div>

        {/* ページ下部のプロフィールセクション */}
        <Profile />
        
      </Container>
    </main>
  );
}