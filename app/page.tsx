import Header from "./components/Header";
export default function Home() {
  return (
    <div
      className="min-h-screen w-full bg-center bg-no-repeat bg-cover text-white opacity-75"
      style={{ backgroundImage: "url('/sky-5534319_1280.jpg')" }}
    >
      <Header />
    </div>
  );
}
