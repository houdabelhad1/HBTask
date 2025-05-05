
# HBTask 📝

Une application de gestion de tâches (Todo List) développée avec Spring Boot et React.

## Fonctionnalités ✨
- ✅ Créer, lire, mettre à jour et supprimer des tâches (CRUD)
- ✅ Marquer les tâches comme complétées/incomplètes
- ✅ Filtrer les tâches par statut (complétées/en cours)
- ✅ API RESTful avec Spring Boot
- 🚀 (Optionnel) Interface frontend avec React (si applicable)

## Technologies 🛠️
- **Backend** : 
  - Java 21
  - Spring Boot 
  - Spring Data JPA
  - H2 Database (en développement)
  - ModelMapper (pour le mapping DTO <-> Entity)
  - Lombok (pour réduire le code boilerplate)
- **Frontend** : 
  - Next.Js
  - Material-UI 
  - Tailwind CSS
  
## Prérequis 📋
- JDK 21
- Maven 3.9+
- (Optionnel) Node.js si frontend React

## Installation & Lancement 🚀

### Backend (Spring Boot)
```bash
# Cloner le dépôt
git clone git@github.com:houdabelhad1/HBTask.git
cd HBTask

# Lancer l'application
mvn spring-boot:run
```

L'API sera disponible sur : `http://localhost:8080/api/tasks`

### Endpoints API 🌐
| Méthode | Endpoint                | Description                          |
|---------|-------------------------|--------------------------------------|
| GET     | `/api/tasks`            | Lister toutes les tâches             |
| GET     | `/api/tasks/{id}`       | Obtenir une tâche par ID             |
| POST    | `/api/tasks`            | Créer une nouvelle tâche             |
| PUT     | `/api/tasks/{id}`       | Mettre à jour une tâche              |
| DELETE  | `/api/tasks/{id}`       | Supprimer une tâche                  |
| GET     | `/api/tasks/completed/{true/false}` | Filtrer par statut          |

## Structure du projet 📂
```
HBTask/
├── src/
│   ├── main/
│   │   ├── java/com/example/hbdev/
│   │   │   ├── controller/   # Contrôleurs API
│   │   │   ├── dto/          # Data Transfer Objects
│   │   │   ├── entity/       # Entités JPA
│   │   │   ├── repository/   # Repositories Spring Data
│   │   │   └── service/      # Logique métier
│   │   └── resources/
│   │       ├── application.properties  # Config DB
├── pom.xml                   # Dépendances Maven
```

## Contribuer 🤝
Les contributions sont les bienvenues !  
1. Forkez le projet  
2. Créez une branche (`git checkout -b feature/ma-fonctionnalite`)  
3. Commitez (`git commit -m 'Ajout d'une super fonctionnalité'`)  
4. Pushez (`git push origin feature/ma-fonctionnalite`)  
5. Ouvrez une Pull Request  

## Licence 📄
MIT License - Voir le fichier [LICENSE](LICENSE) 

---

