import AlerteComponent from "@/components/blocks/Alerte";
import NavBar from "@/components/NavBar/navBar";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../app/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const is404Page = router.pathname === "/404";

  return (
    <div className="container">
      {!is404Page && <NavBar />}
      {!is404Page && <AlerteComponent />}
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
