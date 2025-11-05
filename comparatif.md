# 🌉 Analyse du Modèle d'API Hybride SQL (PostgreSQL) + NoSQL (MongoDB)

## 1. Ce que j'ai compris sur l'aide mutuelle (SQL et NoSQL)

J'ai appris que c'est mieux d'utiliser **chaque outil pour ce qu'il fait de mieux**.

* **PostgreSQL (SQL)** : C'est la base pour les choses **importantes et fixes**, comme le nom des utilisateurs. Il est très fort pour que les données soient toujours justes et bien liées.
* **MongoDB (NoSQL)** : C'est la base pour les choses qui **changent souvent** et qui n'ont pas de forme précise, comme les préférences ou l'historique de lecture. C'est plus simple de mettre à jour ces données.

Le "pont" entre les deux bases, c'est le **numéro d'utilisateur de PostgreSQL (l'ID)**. Je l'ai utilisé comme clé dans MongoDB pour relier l'utilisateur à son profil.

## 2. Ce qui a été difficile

1.  **Gérer les deux bases en même temps** : Mon programme (le contrôleur) doit parler aux deux bases en même temps et attendre les deux réponses. C'est plus compliqué à coder que de parler à une seule base.
2.  **Garder les données justes** : Quand je supprime un utilisateur, si la suppression marche dans PostgreSQL mais échoue dans MongoDB, les données ne sont plus d'accord. Il y a un risque de laisser des informations en double.
3.  **Le code est plus long** : J'ai dû installer et configurer deux systèmes de bases de données différents, ce qui demande plus de code.

## 3. Les avantages d'utiliser deux bases (Modèle Hybride)

| Avantage Simple | Ce que ça veut dire | Mieux pour Bookly+ |
| :--- | :--- | :--- |
| **Plus de souplesse** | Je peux changer les informations du profil sans toucher à la base principale (PostgreSQL). | L'ajout de nouvelles fonctions (ex: notes secrètes) est très rapide. |
| **Meilleure performance** | Les informations qui changent beaucoup (historique) ne fatiguent pas la base principale (SQL). | La base principale reste rapide pour les actions importantes. |
| **Meilleure solution** | J'utilise l'outil le plus adapté à chaque tâche. | L'application est plus solide et peut grandir facilement. |

## 4. Schéma de mon projet



*Explication du schéma :*
1.  L'utilisateur fait une demande complète (Utilisateur + Profil).
2.  Mon programme **Node.js** (l'API) envoie **deux demandes en même temps**.
3.  Une va à **PostgreSQL (SQL)** pour avoir l'identité de l'utilisateur.
4.  L'autre va à **MongoDB (NoSQL)** pour avoir son profil et son historique.
5.  Le programme **rassemble** les deux informations pour donner une **seule réponse finale** à l'utilisateur.