# 📚 Bookly+ Hybrid API



Ce projet met en œuvre une **API RESTful** construite avec **Node.js** et **Express**, utilisant une **architecture hybride** pour la gestion des données. L'objectif principal est de démontrer la **complémentarité** entre les bases de données **SQL** et **NoSQL** pour une application moderne.

## 💡 Architecture Hybride

L'architecture sépare les données en fonction de leurs caractéristiques :

* **PostgreSQL (SQL)** : Utilisé pour les données **structurées, cohérentes** et **critiques**.
    * **Données gérées** : `Utilisateurs` (identité principale) et `Livres` (catalogue).
* **MongoDB (NoSQL)** : Utilisé pour les données **flexibles, évolutives** et **non structurées**.
    * **Données gérées** : `Profils utilisateurs` (préférences) et `Historiques de lecture`.

La liaison des données est assurée par l'utilisation de la **clé primaire SQL (`user.id`)** comme identifiant dans le document MongoDB.

---

## 🛠️ Technologies Clés

| Catégorie | Technologie | Rôle |
| :--- | :--- | :--- |
| **Backend** | Node.js (avec `type: "module"`) & Express | Environnement d'exécution et Framework Web |
| **SQL** | PostgreSQL (avec `pg`) | Base de données relationnelle |
| **NoSQL** | MongoDB (avec `mongoose`) | Base de données orientée document |
| **Outils** | `dotenv`, `cors`, `nodemon` | Configuration, sécurité et développement rapide |

---

## 🚀 Installation et Lancement

### 1. Prérequis

Assurez-vous que les services et outils suivants sont installés et opérationnels :

* **Node.js** (version récente)
* **PostgreSQL Server**
* **MongoDB Server**

### 2. Configuration du Projet

1.  **Cloner le dépôt** :
    ```bash
    git clone <URL_DU_DÉPÔT>
    cd bookly-hybrid-api
    ```
2.  **Installer les dépendances** :
    ```bash
    npm install
    ```
3.  **Fichier d'environnement (`.env`)** :
    Créez un fichier `.env` à la racine du projet et remplacez les placeholders par vos identifiants réels :
    ```ini
    PORT=3000
    POSTGRES_URI=postgres://<USER>:<PASSWORD>@localhost:5432/bookly_sql
    MONGO_URI=mongodb://localhost:27017/bookly_mongo
    ```
4.  **Initialisation PostgreSQL** :
    Exécutez le script d'initialisation (`e.g., init_bookly_sql.sql`) pour créer les tables `users` et `books` dans PostgreSQL.

### 3. Démarrage

Démarrez le serveur en mode développement avec `nodemon` :

```bash
npm run dev
````

Le serveur démarrera sur **`http://localhost:3000`** et confirmera les connexions aux deux bases.

-----

## 📂 Structure du Projet

L'organisation suit le pattern **Model-View-Controller (MVC)** pour une meilleure clarté et maintenabilité :

```
.
├── config/             # Logique de connexion aux bases (SQL & NoSQL)
├── controllers/        # Logique métier et gestion des requêtes (CRUD et Hybride)
├── models/             # Définition des schémas (pg pool pour SQL, Mongoose pour NoSQL)
├── routes/             # Définition des URLs de l'API
├── server.js           # Point d'entrée de l'application
└── ...
```

-----

## 🗺️ Endpoints de l'API

L'API est accessible via l'URL de base : **`http://localhost:3000/api`**.

### 1\. Routes Standards (CRUD Séparé)

Ces routes gèrent les opérations CRUD sur une seule base de données à la fois.

| Ressource | Base | Méthode | Route | Rôle |
| :--- | :--- | :--- | :--- | :--- |
| **Utilisateurs** | SQL | GET / POST / PUT / DELETE | `/api/users/:id` | Gestion des données `name`, `email` |
| **Livres** | SQL | GET / POST / PUT / DELETE | `/api/books/:id` | Gestion du catalogue de livres |
| **Profils** | NoSQL | GET / POST / PUT / DELETE | `/api/profiles/:userId/profile` | Gestion des données `preferences`, `history` |

### 2\. Routes Hybrides (Le Cœur du Projet)

Gérées par `hybridController.js`, ces routes interagissent avec les données des **deux bases simultanément**.

| Ressource | Base(s) | Méthode | Route | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Utilisateur Complet** | SQL + NoSQL | **GET** | `/api/user-full/:id` | Récupère l'utilisateur SQL et agrège son profil NoSQL dans le champ `profile`. |
| **Utilisateur Complet** | SQL + NoSQL | **PUT** | `/api/user-full/:id` | Met à jour de manière transactionnelle les champs SQL (PostgreSQL) **ET** les champs NoSQL (MongoDB) en gérant les requêtes partielles. |

**Exemple de Corps de Requête PUT `/api/user-full/:id` :**

```json
// Cette requête met à jour le nom (SQL) et les préférences (NoSQL) simultanément
{
  "name": "Alexandre Dumas",
  "preferences": ["Aventure", "Classique"]
}
```