import Header from "./components/Header";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
    
      <div className="h-dvh w-screenh-dvh w-full overflow-hidden flex ">
          <div
            className="min-h-screen w-full bg-center bg-no-repeat bg-cover text-white"
            style={{ backgroundImage: "url('/Patagonian Peaks... - Imgur.gif')" }}
          >
            <Header />
          </div>
        </div>
    </div>
  );
}
