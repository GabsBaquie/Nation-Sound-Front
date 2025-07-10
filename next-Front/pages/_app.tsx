import AlerteComponent from "@/components/blocks/Alerte";
import NavBar from "@/components/NavBar/navBar";
import { useAlertes } from "@/lib/controllers/alertesController";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../app/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const is404Page = router.pathname === "/404";

  const { alertes, isLoading, hasError } = useAlertes();

  let alertesContent = null;
  if (isLoading) {
    alertesContent = (
      <div className="text-center">Chargement des alertes...</div>
    );
  } else if (hasError) {
    alertesContent = (
      <div className="text-center text-red-500">
        Erreur lors du chargement des alertes
      </div>
    );
  } else {
    alertesContent = <AlerteComponent alertes={alertes} />;
  }

  return (
    <div className="container">
      {!is404Page && <NavBar />}
      {!is404Page && alertesContent}
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
