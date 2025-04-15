export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#00f0ff]/20 pt-6 text-center text-[#eeeeee]/50">
      <p>© {new Date().getFullYear()} КЛЭПТРЭП Digital Art Zine</p>
      <div className="flex justify-center space-x-4 mt-3">
        <a href="#" className="text-[#00f0ff] hover:text-[#ff00a0] transition-colors" title="Share on Social Media">
          <i className="fas fa-share-alt"></i>
        </a>
        <a href="#" className="text-[#00f0ff] hover:text-[#ff00a0] transition-colors" title="Download as PDF">
          <i className="fas fa-download"></i>
        </a>
        <a href="#" className="text-[#00f0ff] hover:text-[#ff00a0] transition-colors" title="About">
          <i className="fas fa-info-circle"></i>
        </a>
      </div>
    </footer>
  );
}
