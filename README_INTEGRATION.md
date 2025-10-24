# 🔗 Intégration API - Frontend avec Base de Données

## ✅ **Système d'intégration mis en place**

**Objectif :** Lier les données du frontend avec celles de la base de données via l'API.

## 🏗️ **Architecture du système**

### **1. Configuration API (`lib/api.ts`)**

```typescript
// Configuration de l'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Types TypeScript pour toutes les entités
export interface Concert { ... }
export interface POI { ... }
export interface SecurityInfo { ... }

// Services pour les appels API
export const apiService = {
  async getConcerts(): Promise<Concert[]> { ... }
  async getPOIs(): Promise<POI[]> { ... }
  async getSecurityInfos(): Promise<SecurityInfo[]> { ... }
};

// Transformateurs de données
export const dataTransformers = {
  transformConcertsForProgram(concerts: Concert[]) { ... }
  transformPOIsForMap(pois: POI[]) { ... }
  transformSecurityInfosForAlerts(securityInfos: SecurityInfo[]) { ... }
};
```

### **2. Hooks React (`hooks/useApiData.ts`)**

```typescript
// Hooks pour récupérer les données
export function useConcerts() { ... }
export function usePOIs() { ... }
export function useSecurityInfos() { ... }
export function useMapData() { ... }
export function useAlertsData() { ... }
export function useProgramData() { ... }
```

### **3. Composants Dynamiques**

- `MapBlockDynamic` : Carte avec données API
- `AlertsBlockDynamic` : Alertes avec données API
- `LoadingError` : Composant de chargement/erreur

## 🚀 **Utilisation**

### **1. Configuration de l'environnement**

```bash
# Créer un fichier .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### **2. Utilisation dans un composant**

```typescript
import { useMapDataDynamic } from "@/components/blocks/data/mapDataDynamic";
import { LoadingError } from "@/components/common/LoadingError";

export const MyComponent = () => {
  const { mapData, loading, error, fallbackMapData } = useMapDataDynamic();

  return (
    <LoadingError
      loading={loading}
      error={error}
      fallbackData={<div>Données par défaut</div>}
    >
      <div>Données de l'API : {mapData.title}</div>
    </LoadingError>
  );
};
```

### **3. Hooks disponibles**

```typescript
// Récupérer les concerts
const { concerts, loading, error } = useConcerts();

// Récupérer les POIs
const { pois, loading, error } = usePOIs();

// Récupérer les alertes
const { alertsData, loading, error } = useAlertsData();

// Récupérer les données de programmation
const { programData, loading, error } = useProgramData();
```

## 🔄 **Flux de données**

### **1. Chargement des données**

1. **Hook appelé** → `useConcerts()`
2. **API appelée** → `apiService.getConcerts()`
3. **Données récupérées** → `Concert[]`
4. **État mis à jour** → `setConcerts(data)`

### **2. Gestion des erreurs**

1. **Erreur API** → `setError(message)`
2. **Données de fallback** → Affichage des données statiques
3. **Message d'erreur** → Affiché à l'utilisateur

### **3. Transformation des données**

1. **Données brutes** → `Concert[]` (API)
2. **Transformation** → `dataTransformers.transformConcertsForProgram()`
3. **Format frontend** → Données adaptées aux composants

## 📊 **Types de données**

### **Concert**

```typescript
interface Concert {
  id: number;
  title: string;
  description: string;
  performer: string;
  time: string;
  location: string;
  image?: string;
  days: Day[];
}
```

### **POI (Point d'Intérêt)**

```typescript
interface POI {
  id: number;
  name: string;
  type: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
```

### **SecurityInfo**

```typescript
interface SecurityInfo {
  id: number;
  title: string;
  description: string;
  urgence: boolean;
  actif: boolean;
}
```

## 🛠️ **Fonctionnalités**

### **✅ Avantages**

- **Données dynamiques** : Mise à jour en temps réel
- **Gestion d'erreurs** : Fallback automatique
- **Types TypeScript** : Sécurité des types
- **Hooks réutilisables** : Logique centralisée
- **Performance** : Cache et optimisations

### **🔄 États de chargement**

- **Loading** : Affichage d'un spinner
- **Error** : Affichage des données de fallback
- **Success** : Affichage des données de l'API

### **📱 Responsive**

- **Mobile** : Optimisé pour les petits écrans
- **Desktop** : Interface complète
- **Tablet** : Adaptation automatique

## 🧪 **Tests**

### **1. Test de l'API**

```bash
# Tester la connectivité API
npm run test:api
```

### **2. Test des hooks**

```typescript
import { renderHook } from "@testing-library/react-hooks";
import { useConcerts } from "@/hooks/useApiData";

test("should fetch concerts", async () => {
  const { result } = renderHook(() => useConcerts());

  expect(result.current.loading).toBe(true);
  // ... tests
});
```

### **3. Test des composants**

```typescript
import { render, screen } from "@testing-library/react";
import { MapBlockDynamic } from "@/components/blocks/MapBlockDynamic";

test("should render map with data", () => {
  render(<MapBlockDynamic />);
  expect(screen.getByText("Plan du festival")).toBeInTheDocument();
});
```

## 📝 **Fichiers créés**

### **Configuration**

- `lib/api.ts` - Configuration API et types
- `config/api.ts` - Configuration des endpoints
- `config/environment.ts` - Configuration environnement

### **Hooks**

- `hooks/useApiData.ts` - Hooks pour les données API

### **Composants**

- `components/common/LoadingError.tsx` - Composant de chargement/erreur
- `components/blocks/MapBlockDynamic.tsx` - Carte dynamique
- `components/blocks/AlertsBlockDynamic.tsx` - Alertes dynamiques

### **Données dynamiques**

- `components/blocks/data/mapDataDynamic.ts` - Données carte
- `components/blocks/data/alerteDataDynamic.ts` - Données alertes
- `components/blocks/data/programDataDynamic.ts` - Données programmation

### **Styles**

- `styles/api-components.css` - Styles pour les composants API

### **Tests**

- `scripts/test-api-integration.js` - Script de test API
- `pages/exemple-integration.tsx` - Page d'exemple

### **Documentation**

- `INTEGRATION_API.md` - Documentation détaillée
- `README_INTEGRATION.md` - Guide d'utilisation

## 🚀 **Prochaines étapes**

1. **Tester l'intégration** : `npm run test:api`
2. **Configurer l'environnement** : Créer `.env.local`
3. **Intégrer les composants** : Remplacer les données statiques
4. **Tester en développement** : Vérifier le fonctionnement
5. **Déployer en production** : Configurer l'URL de production

## 📋 **Checklist d'intégration**

- [ ] **API accessible** : Vérifier que l'API fonctionne
- [ ] **Variables d'environnement** : Configurer `NEXT_PUBLIC_API_URL`
- [ ] **Types TypeScript** : Vérifier la cohérence des types
- [ ] **Hooks fonctionnels** : Tester les hooks
- [ ] **Composants intégrés** : Remplacer les données statiques
- [ ] **Gestion d'erreurs** : Vérifier le fallback
- [ ] **Performance** : Optimiser les appels API
- [ ] **Tests** : Écrire des tests unitaires

**Le système d'intégration API est maintenant prêt !** 🎉
