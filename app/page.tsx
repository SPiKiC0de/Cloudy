import Header from "./components/Header";
export default function Home() {
  return (<div>
    <div
      className="min-h-screen w-full bg-center bg-no-repeat bg-cover text-white brightness-90"
      style={{ backgroundImage: "url('/Patagonian Peaks... - Imgur.gif')" }}
    >
      <Header />
    </div>
    </div>
  );
}
