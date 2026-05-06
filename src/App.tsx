import MercurySidebar from "./components/MercurySidebar";

export default function App() {
  return (
    <div className="flex h-screen w-full bg-[#0A0A0F] font-sans selection:bg-cyan-500/30 overflow-hidden justify-center">
      {/* Mercury Sidebar Container */}
      <div className="w-full max-w-md h-full border-x border-white/5 shadow-2xl">
        <MercurySidebar />
      </div>
    </div>
  );
}
