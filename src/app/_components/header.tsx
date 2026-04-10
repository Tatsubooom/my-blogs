import Link from "next/link";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 dark:bg-slate-800 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white hover:opacity-80 transition-opacity">
          Top.
        </Link>

        <div className="flex items-center gap-6">
          {/* ↓ 修正ポイント：href を "/profile" から "#profile" に変更 */}
          <Link href="#profile" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;