// pages/404.tsx
import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-12 my-auto">
      <div>
        <Image
          src="/image/404.png"
          alt="404 Image"
          width={300}
          height={300}
          className="mb-4 max-w-52 md:max-w-96"
        />
        <h1 className="text-4xl text-center md:text-7xl">404</h1>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xl text-center ">Il semble que vous soyez perdu !</p>
        <Link href="/">
          <Button>Retourner à l&#39;accueil</Button>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
