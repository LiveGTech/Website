---
title: Quoi de neuf dans LiveG OS V0.2.0 &colon; prise en charge multiplateforme et bien plus encore
description:
    Un aperçu d'un certain nombre de nouvelles fonctionnalités qui ont été ajoutées à la dernière version Alpha de LiveG OS, y compris la prise en charge du Raspberry Pi et du PinePhone.
author: james
publishedAt: 1691945111327
---

Après presque une année complète de travail sur le développement de nouvelles fonctionnalités pour LiveG OS, nous sommes ravis d'annoncer la dernière version Alpha de LiveG OS qui est maintenant disponible pour une gamme d'appareils, y compris pour le Raspberry Pi, le PinePhone et les deux ordinateurs x86-64 et ARM64. Cette nouvelle version réalise notre objectif de faire de LiveG OS un système d'exploitation véritablement multiplateforme et l'un des rares systèmes d'exploitation pouvant fonctionner à la fois sur les ordinateurs de bureau et sur les appareils mobiles.

Notre dernier épisode de LiveG Showcase présente toutes les nouvelles fonctionnalités incluses dans cette nouvelle version, désormais disponible sur YouTube. Dans cet article, nous vous ferons un résumé de ces nouvelles fonctionnalités.

<a href="https://youtu.be/wa5K0FJ_rKk" target="_blank" class="videoLink" translate="attributesOnly" tl:title="videoAlt_youtube" tl:aria-label="videoAlt_youtube">
    <img src="/media/blog/new-in-os-0-2-0/showcase-video.png" translate="attributesOnly" tl:alt="videoAlt_youtube">
    <img src="https://opensource.liveg.tech/Adapt-UI/icons/play-circle.svg" aui-icon="light" aria-hidden="true">
</a>

## Prise en charge multiplateforme
![Un graphique qui répertorie les différents appareils désormais pris en charge.](/media/blog/new-in-os-0-2-0/platforms.svg)

Cette version de LiveG OS est la première à fonctionner sur le Raspberry Pi. LiveG OS fonctionne particulièrement bien sur le Raspberry Pi 4 et le Compute Module 4, mais il fonctionne également sur le Raspberry Pi 3. Le système fonctionne sans problème sur le Pi 4 et est plus ou moins aussi rapide que sur les  ordinateurs x86-64 conventionnel, mais vous pouvez rencontrer une lenteur et une consommation d'énergie plus élevée lors de son exécution sur des modèles plus anciens tels que le Pi 3.

En plus du Raspberry Pi, LiveG OS fonctionne désormais également sur le smartphone PinePhone de PINE64. Cela rend LiveG OS officiellement disponible pour les appareils mobiles aux côtés de l'option actuelle pour l'exécuter sur le bureau. LiveG OS ne fonctionnera pas encore sur le PinePhone Pro — toute personne qui souhaite se porter volontaire pour apporter LiveG OS au PinePhone Pro doit consulter notre référentiel [LiveG OS Bootstrap Toolchain sur GitHub](https://github.com/LiveGTech/OS-Bootstrap) et également [rejoindre notre communauté Discord](https://discord.gg/pTYsJME9xH).

Vous pouvez essayer cette version de LiveG OS maintenant pour le Raspberry Pi et PinePhone — et même les ordinateurs x86-64 et ARM64 — en téléchargeant une image du système d'exploitation pour votre plate-forme à partir de notre site web. C'est simple : après avoir téléchargé l'image, utilisez un outil tel que balenaEtcher ou le Raspberry Pi Imager pour flasher l'image sur une carte SD, puis démarrez-la sur votre appareil et suivez les instructions de configuration présentées dans LiveG OS.

## Applications web installables
![Une capture d'écran de Sphere avec l'option de menu 'installer l'application' ouverte. Sur le côté gauche, un LiveG Prism est affiché avec une application ajoutée à l'écran d'accueil.](/media/blog/new-in-os-0-2-0/install-app.png)

Les applications web progressives — ou PWA — peuvent désormais être installées dans LiveG OS grâce à la nouvelle option permettant d'installer des sites web en tant qu'applications web dans notre navigateur web Sphere. Tout site web peut devenir une application dans LiveG OS, et le site web peut tirer parti de fonctionnalités supplémentaires telles que des icônes d'application masquables grâce à l'utilisation d'un [manifeste d'application web] (https://developer.mozilla.org/en-US/docs/Web/Manifest).

Les applications web ouvrent de grandes opportunités qui peuvent permettre à LiveG OS de rivaliser avec les principaux systèmes d'exploitation actuels, car les technologies PWA permettent d'installer une large gamme d'applications existantes sur LiveG OS, telles que Mastodon, Twitter, YouTube — et même nos propres applications, comme [LiveG Docs](https://docs.liveg.tech). La compatibilité indépendante du système d'exploitation des applications web fait des technologies PWA une plate-forme idéale pour LiveG OS, et les propres applications système de LiveG OS — et même son environnement de bureau, [gShell](https://github.com/LiveGTech/gShell) — sont eux-mêmes réalisés à l'aide des technologies web.

## Options de recherche, d'alimentation et de tri des applications dans le menu des applications
![Une capture d'écran du menu des applications sur la version de bureau de LiveG OS. Le terme 'réseau' est recherché dans la barre de recherche, avec des suggestions d'applications affichées ci-dessous.](/media/blog/new-in-os-0-2-0/app-menu.png)

Les applications installées s'affichent désormais dans le menu des applications de LiveG OS. Le menu des applications comprend désormais également un certain nombre de fonctionnalités utiles qui facilitent la recherche d'applications. Vous pouvez désormais trier les applications par ordre alphabétique en choisissant l'option **affichage alphabétique**, ou vous pouvez rechercher des applications à l'aide de la barre de recherche.

Les raccourcis d'application apparaissent également lors de l'utilisation de la barre de recherche, ce qui facilite l'accès à certaines fonctionnalités des applications. Par exemple, vous pouvez rechercher des options de réseau dans Paramètres en tapant 'réseau' dans la barre de recherche.

Enfin, il existe des options pour verrouiller, arrêter ou redémarrer LiveG OS dans le menu d'alimentation. Cela supprime la nécessité pour l'Environnement de Débogage du LiveG OS d'arrêter le système, qui a maintenant lui-même été supprimé dans cette version.

## Interface basée sur des onglets dans Sphere
![Une capture d'écran de l'interface à onglets de Sphere sur ordinateur et mobile.](/media/blog/new-in-os-0-2-0/sphere-tabs.png)

La navigation sur le web est devenue beaucoup plus facile dans le navigateur web Sphere grâce à la nouvelle interface basée sur des onglets dans Sphere. L'interface basée sur des onglets fonctionne de manière similaire à ce que l'on voit dans d'autres navigateurs modernes, permettant aux utilisateurs d'ouvrir plusieurs pages web à la fois sans avoir besoin d'ouvrir plusieurs fenêtres.

L'interface basée sur des onglets est également disponible sur mobile en appuyant sur le bouton de la liste des onglets. Nous espérons publier une API pour l'interface basée sur des onglets à l'avenir pour les applications web afin de leur permettre de tirer parti de ce paradigme : par exemple, l'application de gestion de fichiers que nous espérons publier bientôt bénéficiera d'une interface basée sur des onglets pour rendre la gestion des fichiers dans plusieurs dossiers est beaucoup plus facile à effectuer.

## Navigation de sélecteur des applications basée sur les gestes sur mobile
![Une capture d'écran démonstrative du sélecteur des applications sur la version mobile de LiveG OS. Les utilisateurs peuvent balayer vers le haut pour afficher la liste des applications et balayer horizontalement pour basculer rapidement entre les applications.](/media/blog/new-in-os-0-2-0/gesture-switcher.png)

Sur mobile, l'expérience de changement d'application a été améliorée grâce à l'ajout de gestes de balayage pour passer rapidement d'une application à l'autre. Glisser vers le haut depuis le logo LiveG en bas révèle maintenant la liste des applications — tout comme ce qui se passe lorsque vous appuyez deux fois sur le logo. Glisser à gauche et à droite sur le logo basculera entre les applications répertoriées à côté de l'application actuellement affichée sans avoir besoin d'afficher la liste des applications, ce qui réduit le temps nécessaire pour basculer entre les applications.

L'ajout de cette nouvelle méthode de navigation basée sur les gestes rapproche LiveG OS des expériences vues sur les autres principaux systèmes d'exploitation mobiles.

## Système de mise à jour
![Une capture d'écran de la page des mises à jour du système dans Paramètres, montrant un exemple de mise à jour.](/media/blog/new-in-os-0-2-0/update-system.png)

LiveG OS dispose désormais d'un système de mise à jour, ce qui permet aux utilisateurs de télécharger et d'installer plus facilement de nouvelles mises à jour système à l'avenir lorsqu'elles seront disponibles. Les utilisateurs peuvent désormais mettre à jour le système via l'application Paramètres, où ils peuvent également configurer le circuit de mise à jour sous **options avancées**, leur permettant de profiter de fonctionnalités de pointe qui ne sont pas encore présentes dans les versions stables.

Le système de mise à jour est conçu pour ne pas distraire ou perturber ses utilisateurs — les utilisateurs peuvent être assurés que leur système ne redémarrera pas à moins qu'ils ne le demandent, et les mises à jour ne sont pas imposées aux utilisateurs (bien qu'il soit fortement recommandé aux utilisateurs de mettre à jour lorsque cela est possible pour bénéficier des correctifs de sécurité). Le système est également conçu pour être robuste contre les arrêts inattendus du système tels que les pannes de courant avec un certain nombre de mécanismes de restauration mis en œuvre pour récupérer le système dans ces scénarios à la mise à jour précédente.

## Nouvelles options ajoutées à Paramètres
![Une capture d'écran des options de configuration de la disposition du clavier dans Paramètres sur le bureau. À droite, un LiveG Prism est affiché avec le clavier virtuel ouvert.](/media/blog/new-in-os-0-2-0/keyboard-layouts.png)

Parallèlement au nouveau système de mise à jour, nous avons également ajouté quelques options supplémentaires à l'application Paramètres pour rendre LiveG OS plus utile.

Les utilisateurs peuvent désormais configurer leurs réseaux Wi-Fi et leur fournir des options d'authentification, telles que des mots de passe Wi-Fi. LiveG OS permet l'authentification pour une gamme de normes de sécurité, notamment WEP, WPA, WPA2 et les normes d'entreprise, autrement connues sous le nom de 802.1x.

Il existe également de nouvelles options pour configurer la disposition du clavier pour LiveG OS. Ceci est particulièrement utile car LiveG OS peut déjà être utilisé en français, et nous avions donc besoin d'un moyen pour les utilisateurs de passer à la disposition AZERTY française et pas seulement QWERTY britannique. Nous avons également inclus la prise en charge de la mise en page QWERTY américain, ainsi que la saisie de texte en pinyin chinois, qui utilise l'Editeur de Méthode d'Entrée pour fournir des suggestions de texte.

Les dispositions de clavier fonctionnent également sur mobile, et nous espérons avoir bientôt un moyen de basculer rapidement entre les dispositions sans avoir à accéder à Paramètres.

Un autre nouvel ajout aux paramètres est nos options d'interaction et de confidentialité. Ces options facilitent le choix de la façon dont LiveG OS interagira avec nos services en ligne, par exemple quand le système de mise à jour vérifiera les mises à jour. Vous pouvez choisir d'activer toutes les options, ce qui intègre bien LiveG OS à nos offres en ligne, ou si vous ne pensez pas avoir besoin de nos services en ligne, vous pouvez désactiver tous les options.

## Améliorations du LiveG OS Setup
![Une capture d'écran de LiveG OS Setup, montrant les options de partition de disque.](/media/blog/new-in-os-0-2-0/oobs.png)

Et enfin, quelques améliorations ont été apportées au système de configuration prêt à l'emploi — ou OOBS, comme nous l'appelons — y compris un autre menu d'alimentation et un menu d'accessibilité pour activer les options d'accessibilité telles que Navigation par Interrupteur pendant que les utilisateurs configurent leur appareil, en plus d'une nouvelle étape de configuration pour configurer les options d'interaction et de confidentialité afin que vous puissiez facilement activer ou désactiver ces options avant d'utiliser le système.

De plus, des graphiques animés sont désormais inclus dans les étapes OOBS qui rendent la configuration de LiveG OS un peu plus intéressante et visuellement attrayante.

---

## Plans futurs
Voilà donc un aperçu des nouvelles fonctionnalités qui ont été incluses dans LiveG OS — pas étonnant que cela fasse un moment depuis notre dernière version. Cependant, nous reconnaissons qu'il reste encore beaucoup à faire pour LiveG OS avant qu'il ne devienne utilisable au quotidien.

Notre objectif principal pour le développement de la prochaine mise à jour sera de créer de nouvelles applications système, comme une calculatrice ; un gestionnaire de fichiers ; des applications avec des fonctionnalités cellulaires telles que l'envoi de SMS et les appels téléphoniques ; et quelques autres outils utiles qui mettront LiveG OS en ligne avec d'autres systèmes en termes de fonctionnalités.

Il convient également de noter certains de nos 'projets parallèles' sur lesquels nous avons travaillé pour LiveG OS, et nous sommes ravis de les intégrer bientôt pleinement dans le système : il s'agit du [Typeset Engine](https://github.com/LiveGTech/Typeset-Engine) éditeur de code que nous espérons intégrer dans un IDE ; [LiveG Search](https://search.liveg.tech) qui bénéficiera bientôt d'un nouveau système d'exploration et d'indexation ; et [Formulaic](https://github.com/LiveGTech/Formulaic), notre moteur d'évaluation d'expressions que nous espérons implémenter dans une application de calculatrice système.

Il est un peu tôt pour le dire pour le moment, mais nous envisageons également d'intégrer des applications Linux dans LiveG OS, afin que vous puissiez facilement utiliser vos applications Linux préférées directement dans gShell, un peu comme vous pouvez le faire sur ChromeOS. Je sais qu'une fois cette fonctionnalité implémentée, j'installerai certainement LiveG OS sur mon prochain ordinateur portable et je l'utiliserai pour tout ! Nous ne le verrons peut-être pas pour la version 0.3.0, mais c'est certainement sur notre radar.

---

Voici donc un aperçu de certaines des nouvelles fonctionnalités de la dernière version Alpha de LiveG OS. Vous pouvez [télécharger LiveG OS](/os/get) maintenant, qui est disponible en anglais et en français pour une variété de plates-formes.

Vous pouvez nous soutenir financièrement en [donant à notre Open Collective](https://opencollective.com/liveg), où nous utilisons les dons que nous recevons pour faire avancer nos projets. Vous pouvez également nous soutenir en rejoignant notre [communauté Discord](https://discord.gg/pTYsJME9xH) où vous pourrez nous aider dans le développement de nos projets.

Suivez-nous sur [Mastodon](https://mastodon.social/@liveg) et [Twitter](https://twitter.com/LiveGTech) pour rester au courant des dernières mises à jour de tous nos projets, et abonnez-vous à [notre chaîne YouTube](https://youtube.com/@liveg) où vous pouvez trouver des vidéos sur divers aspects de LiveG, y compris des annonces de lancement et des guides de développement.