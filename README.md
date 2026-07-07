# ✝️ Évangile du Jour

Application web permettant de consulter les lectures liturgiques catholiques à une date donnée.

L'application récupère les textes liturgiques depuis une source externe, les stocke dans une base SQLite puis les expose via une API PHP pour être affichés dans une interface moderne développée avec React.

---

## ✨ Fonctionnalités

- 📖 Consultation des lectures du jour
- ✝️ Consultation de l'Évangile du jour
- 📜 Consultation du verset du jour
- 📅 Navigation entre différentes dates
- 🌙 Mode sombre / ☀️ Mode clair
- 📱 Interface responsive (mobile et desktop)
- ⚡ Chargement dynamique via API PHP
- 💾 Stockage local des données dans SQLite

---

## 🏗️ Architecture

```text
Python
   ↓
SQLite
   ↓
PHP API
   ↓
React
```

### Frontend

- React
- Vite
- Tailwind CSS
- Flowbite React
- Framer Motion

### Backend

- PHP
- SQLite

### Scripts

- Python
- Import des lectures liturgiques
- Alimentation automatique de la base de données

---

## 📂 Structure du projet

```text
EvangileDuJour/
│
├── front/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── back/
│   ├── api/
│   │   ├── index.php
│   │   ├── lectures.php
│   │   └── verse.php
│   │
│   ├── database/
│   │   └── data.db
│   │
│   └── scripts/
│       ├── main.py
│       └── DBHelper.py
│
└── README.md
```

---

## 🚀 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/<votre-utilisateur>/EvangileDuJour.git

cd EvangileDuJour
```

### 2. Installer les dépendances du frontend

```bash
cd front

npm install
```

### 3. Lancer le frontend

```bash
npm run dev
```

Application disponible sur :

```text
http://localhost:5173
```

### 4. Lancer le backend PHP

Dans un second terminal :

```bash
cd back/api

php -S localhost:8000
```

API disponible sur :

```text
http://localhost:8000
```

---

## 🔌 API

### Lectures du jour

```http
GET /lectures.php?date=YYYY-MM-DD
```

Exemple :

```http
GET /lectures.php?date=2026-07-07
```

Réponse :

```json
[
  {
    "title": "...",
    "text": "...",
    "ref": "...",
    "Type": "lecture"
  },
  {
    "title": "...",
    "text": "...",
    "ref": "...",
    "Type": "psaume"
  },
  {
    "title": "...",
    "text": "...",
    "ref": "...",
    "Type": "evangile"
  }
]
```

### Verset du jour

```http
GET /verse.php?date=YYYY-MM-DD
```

Exemple :

```http
GET /verse.php?date=2026-07-07
```

Réponse :

```json
{
  "title": "...",
  "text": "...",
  "ref": "..."
}
```

---

## 🗄️ Base de données

### Table `TextType`

Permet de définir les différents types de textes :

- Lecture
- Psaume
- Évangile
- Verset

### Table `GospelTexts`

Stocke les textes liturgiques pour chaque date.

### Vue `Texts`

Vue SQL simplifiant l'accès aux données depuis l'API PHP.

---

## 🎯 Roadmap

### Backend Features

- [x] Import Python
- [x] Stockage SQLite
- [x] API PHP
- [ ] Dockerisation
- [ ] Gestion des erreurs avancée
- [ ] Mise à jour automatique des données

### Frontend Features

- [x] Affichage de l'Évangile
- [x] Affichage du verset du jour
- [x] Navigation par date
- [x] Mode sombre
- [x] Responsive mobile
- [x] Navigation entre Lecture / Psaume / Évangile
- [ ] Historique des lectures
- [ ] Recherche par référence biblique
- [ ] PWA

---

## 📸 Capture d'écran

Ajouter une capture dans :

```text
docs/screenshot.png
```

Puis :

```markdown
docs/screenshot.png
```

---

## 🛠️ Technologies utilisées

| Technologie | Usage |
| ------------ | -------- |
| React | Frontend |
| Vite | Build & Développement |
| Tailwind CSS | Styling |
| Flowbite React | Composants UI |
| Framer Motion | Animations |
| PHP | API |
| SQLite | Base de données |
| Python | Collecte des données |

---

## 📄 Licence

Projet personnel développé dans un objectif d'apprentissage et de consultation des textes liturgiques.

---
🙏 Bonne lecture !
