<<<<<<< HEAD
# 🚀 Portfolio Data Engineer - Hamid Zidelmal

Portfolio professionnel moderne et interactif pour Data Engineer / Data Architect Junior.

## 📋 Contenu du Portfolio

### Structure des sections

1. **Hero Section** - Présentation principale
   - Nom et titre professionnel
   - Badge de disponibilité (CDI / Opportunités)
   - Boutons d'action (Contact + Projets)
   - Animation 3D de data orb

2. **Profil** - Présentation détaillée
   - Parcours en Data Architecture & IA
   - Expertise en Data Engineering
   - Statistiques clés (5+ projets, Azure, SQL+)

3. **Expériences** - Parcours professionnel
   - **Data Engineer** - Projet de fin d'études (2025)
     - Pipeline automatisé cloud
     - Azure Data Factory
     - Scripts Python de transformation
   
   - **Développeur Data Apps** - Power Platform (2025)
     - Applications Power Apps
     - Dashboards Power BI
     - Digitalisation de processus

4. **Contact** - Coordonnées professionnelles
   - Email
   - LinkedIn
   - GitHub

## 🎨 Design & Technologies

### Palette de couleurs
- **Fond** : `#0a0e1a` (bleu nuit profond)
- **Primaire** : `#00d4ff` (cyan électrique)
- **Secondaire** : `#7c3aed` (violet data)
- **Accent** : `#f59e0b` (orange vif)

### Typographie
- **Display** : Orbitron (titres, headers)
- **Body** : JetBrains Mono (texte, code-style)

### Effets visuels
- Grille animée en arrière-plan
- Dégradés radiaux subtils
- Orbe 3D avec anneaux rotatifs
- Animations au scroll
- Effets hover sur les cartes
- Navigation fixe avec backdrop blur

## 📁 Structure des Fichiers

```
portfolio/
│
├── index.html          # Page principale (structure HTML)
├── style.css           # Styles complets (thème tech/data)
├── script.js           # Interactions JavaScript
├── assets/             # Dossier pour ressources
│   └── README.md       # Guide d'utilisation du dossier assets
│
└── DEPLOIEMENT.md      # Guide de déploiement en ligne
```

## ✨ Fonctionnalités

### Interactivité
- ✅ Navigation smooth scroll avec offset
- ✅ Sections qui s'animent à l'apparition
- ✅ Liens de navigation actifs selon la section
- ✅ Effet parallaxe sur le hero
- ✅ Changement de style de navigation au scroll
- ✅ Animations des statistiques
- ✅ Easter egg Konami Code 🎮

### Responsive Design
- ✅ Adapté mobile, tablette et desktop
- ✅ Navigation masquée sur mobile < 480px
- ✅ Layout flexible avec CSS Grid et Flexbox
- ✅ Texte lisible sur tous les écrans

### Performance
- ✅ Intersection Observer pour animations optimisées
- ✅ Animations CSS plutôt que JavaScript quand possible
- ✅ Fonts Google chargées en preconnect
- ✅ Code léger et minimaliste

## 🛠️ Personnalisation

### 1. Informations de contact

Dans `index.html`, section Contact :

```html
<a href="mailto:VOTRE-EMAIL@example.com" class="contact-link">
    📩 VOTRE-EMAIL@example.com
</a>

<a href="https://linkedin.com/in/VOTRE-PROFIL" target="_blank" class="contact-link">
    🔗 LinkedIn
</a>

<a href="https://github.com/VOTRE-USERNAME" target="_blank" class="contact-link">
    💻 GitHub
</a>
```

### 2. Modifier les couleurs

Dans `style.css`, section `:root` :

```css
:root {
    --color-bg: #0a0e1a;           /* Fond principal */
    --color-primary: #00d4ff;      /* Couleur principale */
    --color-secondary: #7c3aed;    /* Couleur secondaire */
    /* ... */
}
```

### 3. Ajouter des projets ou sections

Pour ajouter une section "Projets", insérez avant la section Contact :

```html
<section id="projets" class="section section-projects">
    <div class="container">
        <div class="section-header">
            <span class="section-label">04 — Réalisations</span>
            <h2 class="section-title">Projets</h2>
        </div>
        <!-- Contenu de vos projets -->
    </div>
</section>
```

Puis ajoutez le lien dans la navigation :
```html
<a href="#projets" class="nav-link">Projets</a>
```

### 4. Modifier les statistiques

Dans la section Profil, modifiez les valeurs :

```html
<div class="stat-card">
    <div class="stat-value">VOTRE CHIFFRE</div>
    <div class="stat-label">Votre label</div>
</div>
```

## 🚀 Déploiement

Consultez le fichier **DEPLOIEMENT.md** pour les instructions complètes.

### Option rapide : Netlify Drop

1. Allez sur https://app.netlify.com/drop
2. Glissez-déposez tout le dossier portfolio
3. Votre site est en ligne en 30 secondes ! ✨

### Option recommandée : GitHub Pages

1. Créez un compte sur https://github.com
2. Créez un repository "portfolio"
3. Uploadez tous les fichiers
4. Activez GitHub Pages dans Settings → Pages
5. Votre site sera sur : `https://votre-username.github.io/portfolio`

## 📱 Test en local

Pour tester localement avant déploiement :

1. Ouvrez simplement `index.html` dans votre navigateur
2. Ou utilisez un serveur local :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx serve

# Avec VS Code
# Installer l'extension "Live Server" et clic droit > Open with Live Server
```

Puis ouvrez : `http://localhost:8000`

## 🎯 Checklist avant mise en ligne

- [ ] Remplacer les liens de contact (email, LinkedIn, GitHub)
- [ ] Vérifier l'orthographe et la grammaire
- [ ] Tester sur mobile et desktop
- [ ] Vérifier que tous les liens fonctionnent
- [ ] Optimiser les images si ajoutées dans assets/
- [ ] Personnaliser le titre de la page (`<title>` dans index.html)
- [ ] Ajouter un favicon (optionnel)

## 💡 Astuces

### Easter Egg
Tapez la séquence **Konami Code** : ↑↑↓↓←→←→BA
pour activer un effet arc-en-ciel ! 🌈

### Console
Ouvrez la console du navigateur (F12) pour voir des messages stylisés.

### Animations
Les animations se déclenchent automatiquement au scroll.
Si vous trouvez qu'elles sont trop rapides/lentes, ajustez dans `script.js` :

```javascript
el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
// Changez 0.6s pour ajuster la vitesse
```

## 📦 Ajout d'images

Pour ajouter une photo de profil ou des captures d'écran :

1. Placez vos images dans le dossier `assets/images/`
2. Référencez-les dans le HTML :

```html
<img src="assets/images/photo-profil.jpg" alt="Hamid Zidelmal">
```

3. Optimisez vos images avant de les ajouter :
   - Format WebP recommandé (meilleure compression)
   - Taille max : 1920px de large
   - Utilisez https://squoosh.app pour l'optimisation

## 🔧 Support & Personnalisation avancée

### Ajouter Google Analytics

Avant la balise `</head>` dans index.html :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Ajouter un favicon

Avant la balise `</head>` :

```html
<link rel="icon" type="image/png" href="assets/favicon.png">
```

### Changer les polices

Dans le `<head>` de index.html, remplacez le lien Google Fonts :

```html
<link href="https://fonts.googleapis.com/css2?family=VotrePolice:wght@400;600;700&display=swap" rel="stylesheet">
```

Puis dans style.css :

```css
:root {
    --font-display: 'VotrePolice', sans-serif;
}
```

## 📄 Licence

Ce portfolio est libre d'utilisation pour votre usage personnel.

## 🎓 Crédits

Design & Développement : Portfolio Data Engineer
Style : Tech/Data moderne avec influences futuristes
Polices : Orbitron (Google Fonts) + JetBrains Mono (Google Fonts)

---

**Bon succès avec votre portfolio ! 🚀**

Pour toute question, consultez le fichier DEPLOIEMENT.md ou les commentaires dans le code.
=======
# portfolio
>>>>>>> 0ace3a44915bfbbfe27a6c9e6c61dcd63e7cdb53
