import { AlertsBlockDynamic } from "@/components/blocks/AlertsBlockDynamic";
import { useProgramDataDynamic } from "@/components/blocks/data/programDataDynamic";
import { MapBlockDynamic } from "@/components/blocks/MapBlockDynamic";
import { LoadingError } from "@/components/common/LoadingError";

// Page d'exemple montrant l'intégration API
export default function ExempleIntegration() {
  const { programData, loading, error, fallbackProgramData } =
    useProgramDataDynamic();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Exemple d'Intégration API</h1>

      {/* Section Carte */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Carte du Festival</h2>
        <MapBlockDynamic />
      </section>

      {/* Section Alertes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Alertes de Sécurité</h2>
        <AlertsBlockDynamic />
      </section>

      {/* Section Programmation */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Programmation</h2>
        <LoadingError
          loading={loading}
          error={error}
          fallbackData={
            <div className="program-fallback">
              <h3>Programme par défaut</h3>
              <div className="concerts-list">
                {fallbackProgramData.map((concert) => (
                  <div key={concert.id} className="concert-item">
                    <h4>{concert.title}</h4>
                    <p>{concert.performer}</p>
                    <p>
                      {concert.time} - {concert.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <div className="program-api">
            <h3>Programme depuis l'API</h3>
            <div className="concerts-list">
              {programData.map((concert) => (
                <div key={concert.id} className="concert-item">
                  <h4>{concert.title}</h4>
                  <p>{concert.performer}</p>
                  <p>
                    {concert.time} - {concert.location}
                  </p>
                  <p>{concert.description}</p>
                  {concert.image && (
                    <img
                      src={concert.image}
                      alt={concert.title}
                      className="concert-image"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </LoadingError>
      </section>
    </div>
  );
}
