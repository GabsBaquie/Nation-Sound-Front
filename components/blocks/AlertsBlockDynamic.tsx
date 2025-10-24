import { useAlertsDataDynamic } from "@/components/blocks/data/alerteDataDynamic";
import { LoadingError } from "@/components/common/LoadingError";
import React from "react";

interface AlertsBlockDynamicProps {
  // Props spécifiques au composant AlertsBlock
}

export const AlertsBlockDynamic: React.FC<AlertsBlockDynamicProps> = () => {
  const { alertsData, loading, error, fallbackAlertsData } =
    useAlertsDataDynamic();

  return (
    <LoadingError
      loading={loading}
      error={error}
      fallbackData={
        <div className="alerts-container">
          <h2>Alertes de Sécurité</h2>
          <div className="alerts-list">
            {fallbackAlertsData.map((alert) => (
              <div
                key={alert.id}
                className={`alert-item ${alert.urgence ? "urgent" : "normal"}`}
              >
                <h3>{alert.title}</h3>
                <p>{alert.description}</p>
                {alert.urgence && <span className="urgent-badge">URGENT</span>}
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="alerts-container">
        <h2>Alertes de Sécurité</h2>
        <div className="alerts-list">
          {alertsData.map((alert) => (
            <div
              key={alert.id}
              className={`alert-item ${alert.urgence ? "urgent" : "normal"}`}
            >
              <h3>{alert.title}</h3>
              <p>{alert.description}</p>
              {alert.urgence && <span className="urgent-badge">URGENT</span>}
            </div>
          ))}
        </div>
      </div>
    </LoadingError>
  );
};
