import Image from "next/image";

export function Profile() {
  return (
    <section 
      id="profile" 
      className="scroll-mt-24 my-16 p-8 bg-white border border-slate-200 rounded-xl shadow-sm max-w-2xl mx-auto text-center"
    >
      {/* アイコン画像エリア */}
      <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-4 border-slate-50 shadow-md">
        <img
          src="/assets/blog/authors/20250618_165925.png" 
          alt="tatsubon"
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* 名前と肩書き */}
      <h2 className="text-3xl font-bold text-slate-800 mb-2">tatsubon</h2>
      <p className="text-indigo-600 font-semibold mb-6">Developer / Maker</p>
      
      {/* 自己紹介本文 */}
      <div className="text-slate-600 leading-relaxed space-y-4 mb-8 text-left max-w-md mx-auto">
        <p>
          Discord Botの開発や、ステッピングモーターを使った電子工作など、
          「作ってみた」記録をメインに発信しているブログです。
        </p>
        <p>
          エラーにハマった時の解決策や、便利なライブラリの使い方など、
          自分のための備忘録を誰かの役にも立てる形で残しています。
        </p>
      </div>

      {/* SNSリンク */}
      <div className="flex justify-center gap-8 border-t border-slate-100 pt-8">
        <a 
          href="https://github.com/Tatsubooom" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-500 hover:text-slate-900 transition-colors font-medium flex items-center gap-2"
        >
          GitHub
        </a>
        <a 
          href="https://x.com/tatsubon0920" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-500 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
        >
          Twitter / X
        </a>
      </div>
    </section>
  );
}