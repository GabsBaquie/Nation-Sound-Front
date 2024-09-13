import AlerteComponent from "@/components/Alerte";
import NavBar from "@/components/NavBar/navBar";
import { AlerteController } from "@/controller/AlerteController";
import { Alerte } from "@/models/AlerteModel";
import { AppProps } from "next/app";
import "../app/globals.css";

const MyApp = ({
  Component,
  pageProps,
  alertes,
}: AppProps & { alertes: Alerte[] }) => {
  return (
    <div className="container">
      <NavBar />
      <AlerteComponent alertes={alertes} />
      <Component {...pageProps} />
    </div>
  );
};

MyApp.getInitialProps = async () => {
  const { alertes } = await AlerteController.getInitialProps();
  return { pageProps: {}, alertes: alertes ?? [] }; // Provide a default value if alertes is null
};

export default MyApp;
