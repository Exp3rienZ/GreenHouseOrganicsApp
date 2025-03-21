# Hofladen Abo App - MVP Phase 1

Diese Anwendung ist ein MVP für ein Abonnement-basiertes landwirtschaftliches Unternehmen. 
In Phase 1 liegt der Fokus auf der Vorregistrierung von Interessenten und der Möglichkeit, 
das Projekt durch Spenden zu unterstützen.

## Systemanforderungen

- Docker und Docker Compose
- Node.js 16 oder höher (für lokale Entwicklung ohne Docker)
- Git

## Umgebungsvariablen

Erstellen Sie eine `.env`-Datei im Stammverzeichnis mit folgenden Variablen:

```
JWT_SECRET=ein_sicherer_schlüssel_für_jwt
STRIPE_PUBLIC_KEY=pk_test_ihre_stripe_public_key
STRIPE_SECRET_KEY=sk_test_ihre_stripe_secret_key
```

Für Stripe können Sie zunächst mit Testschlüsseln arbeiten, die Sie nach der Registrierung 
im [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) erhalten.

## Projektstart mit Docker

1. Repository klonen:
   ```bash
   git clone https://github.com/username/hofladen-abo-app.git
   cd hofladen-abo-app
   ```

2. Umgebungsvariablen einrichten:
   ```bash
   cp .env.example .env
   # Bearbeiten Sie die .env-Datei und fügen Sie Ihre eigenen Werte ein
   ```

3. Docker-Container starten:
   ```bash
   docker-compose up
   ```

4. Die Anwendung ist nun verfügbar unter:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api

## Lokale Entwicklung ohne Docker

### Backend

1. Ins Backend-Verzeichnis wechseln:
   ```bash
   cd backend
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. PostgreSQL-Datenbank starten (kann lokal oder in Docker sein)

4. Lokale `.env`-Datei im `backend`-Verzeichnis erstellen

5. Backend starten:
   ```bash
   npm run start:dev
   ```

### Frontend

1. Ins Frontend-Verzeichnis wechseln:
   ```bash
   cd frontend
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Frontend starten:
   ```bash
   npm start
   ```

## Projektstruktur

```
farm-subscription-app/
├── frontend/              # React-Frontend
│   ├── public/            # Statische Dateien
│   ├── src/
│   │   ├── components/    # Wiederverwendbare UI-Komponenten
│   │   ├── pages/         # Seitenkomponenten
│   │   ├── services/      # API-Dienste und Hilfsfunktionen
│   │   └── App.tsx        # Hauptkomponente
│   └── package.json
│
├── backend/               # NestJS-Backend
│   ├── src/
│   │   ├── auth/          # Authentifizierungsmodul
│   │   ├── users/         # Benutzermodule
│   │   ├── products/      # Produktmodule
│   │   ├── donations/     # Spendenmodule
│   │   └── app.module.ts  # Hauptmodul
│   └── package.json
│
├── docker-compose.yml     # Docker-Konfiguration
└── .env                   # Umgebungsvariablen
```

## Phase 1 Funktionalitäten

- Landing Page mit Projektinformation
- Vorregistrierung für Interessenten
- Fortschrittsanzeige mit aktueller Anzahl der Registrierungen
- Spendenformular mit Stripe-Integration

## Nächste Schritte (Phase 2)

- Vollständige Implementierung des Produktkatalogs
- Konfiguration der Abo-Kisten
- Bestellsystem und Lieferplanung
- Administrationsbereich