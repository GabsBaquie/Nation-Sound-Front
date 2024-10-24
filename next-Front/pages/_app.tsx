import AlerteComponent from '@/components/blocks/Alerte'; // Assurez-vous que ce chemin est correct
import NavBar from '@/components/NavBar/navBar';
import { AlerteController } from '@/controller/AlerteController/AlerteController';
import { Alerte } from '@/models/alertesModel/alerteModel';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../app/globals.css';

const MyApp = ({
  Component,
  pageProps,
  alertes,
}: AppProps & { alertes: Alerte[] }) => {
  const router = useRouter();
  const is404Page = router.pathname === '/404';

  return (
    <div className="container">
      {!is404Page && <NavBar />}
      {!is404Page && <AlerteComponent alertes={alertes} />}
      <Component {...pageProps} />
    </div>
  );
};

MyApp.getInitialProps = async () => {
  const { alertes } = await AlerteController.getInitialProps();
  return { pageProps: {}, alertes: alertes ?? [] }; // Fournir une valeur par défaut si alertes est null
};

export default MyApp;
