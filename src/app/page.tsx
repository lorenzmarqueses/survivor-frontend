import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page.</p>
      <Image src="/logo.svg" alt="Logo" width={200} height={200} />
    </div>
  );
}
