import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import readline from "readline";
import { styleText } from "util";

// Fonction de vérification des dossiers //
function lancerVerif(nomProjet) {


  // Vérification du dossier ~/ada-tech/bloc1/projets //

  const cheminProjets = join(homedir(), "ada-tech", "bloc1", "projets");
  if (existsSync(cheminProjets)) {
    console.log(styleText("green", "\n ✅ dossier ~/ada-tech/bloc1/projets"));
  } else {
    console.log("\n ❌ dossier ~/ada-tech/bloc1/projets");
    process.exit(1);
  }

  const nomsDossiers = readdirSync(cheminProjets);
  let projetsComplets = 0;

  // Lecture du fichier track.json //

  const track = JSON.parse(readFileSync("track.json", "utf-8"));
  let projetAVerifier = track.projects;
  if (nomProjet) {
    projetAVerifier = track.projects.filter(
      (projet) => projet.name === nomProjet,
    );
  }

  projetAVerifier.forEach((projet) => {
    const cheminProjet = join(cheminProjets, projet.name);
    const problemes = [];

    if (!nomsDossiers.includes(projet.name)) {
      problemes.push("le dossier n'existe pas ou n'est pas nommé correctement");
    } else {
      /// verification du Git ///
      if (!existsSync(join(cheminProjet, ".git"))) {
        problemes.push("le repository git n'est pas initialisé");
      }

      /// verification des fichiers manquants ///

      const fichiersManquants = [];
      projet.required.forEach((file) => {
        if (!existsSync(join(cheminProjet, file))) {
          fichiersManquants.push(file);
        }
      });

      if (fichiersManquants.length > 0) {
        problemes.push(`Il manque : ${fichiersManquants.join(" et ")}`);
      }
    }
    /// verification des problèmes ///

    if (problemes.length === 0) {
      console.log(styleText("green", `\n ✅ dossier du projet ${projet.name}`));
      projetsComplets++;
    } else {
      console.log(styleText("red", `\n ❌ dossier du projet ${projet.name}`));
      problemes.forEach((probleme) => {
        console.log(`- ${probleme}`);
      });
    }
  });

  const pourcentage = Math.round(
    (projetsComplets / projetAVerifier.length) * 100,
  );

  if (pourcentage === 100) {
    console.log(
      styleText(
        "green",
        `✅ ${pourcentage}% des projets sont initialisés correctement (${projetsComplets}/${projetAVerifier.length})`,
      ),
    );
  } else {
    console.log(
      styleText(
        "red",
        `❌ ${pourcentage}% des projets sont initialisés correctement (${projetsComplets}/${projetAVerifier.length})`,
      ),
    );
  }
}

// Interface de lecture pour la question //

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Veux tu vérifier tous les projets (t) ou un seul projet (p)  ? (t/p) ",
  (reponse) => {
    if (reponse.trim().toLowerCase() === "t") {
      console.log("Vérification de tous les dossiers en cours...");
      rl.close();
      lancerVerif();
    } else if (reponse.trim().toLowerCase() === "p") {
      rl.question(
        "Entrer le nom du dossier que vous voulez vérifier :",
        (nom) => {
          lancerVerif(nom.trim().toLowerCase());
          rl.close();
        },
      );
    } else {
      console.log("Annulé.");
      rl.close();
    }
  },
);
