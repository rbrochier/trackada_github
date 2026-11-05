import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import readline from "readline";
import { styleText } from "util";

// Fonction de vérification des dossiers //
function lancerVerif() {

  // Vérification du dossier ~/ada-tech/bloc1/projets //

  const cheminProjets = join(homedir(), "ada-tech", "bloc1", "projets");
  if (existsSync(cheminProjets)) {
    console.log(styleText("green", "\n ✅ dossier ~/ada-tech/bloc1/projets"));
  } else {
    console.log("\n ❌ dossier ~/ada-tech/bloc1/projets");
    process.exit(1);
  }

  // Lecture du fichier track.json //

    const track = JSON.parse(readFileSync("track.json", "utf-8"));
    track.projects.forEach((projet) => {
    const cheminProjet = join(cheminProjets, projet.name);
    const problemes = [];

    if (!existsSync(cheminProjet)) {
      problemes.push("le dossier n'existe pas ou n'est pas nommé correctement");
    }

    /// verification du Git ///

    if (!existsSync(join(cheminProjet, ".git"))) {
      problemes.push("le repository git n'est pas initialisé");

    }
 const fichiersManquants = [];
 
    /// verification des fichiers requis ///

    projet.required.forEach((file) => {
      if (!existsSync(join(cheminProjet, file))) {
        fichiersManquants.push(file);
      }
    });

     if (fichiersManquants.length > 0){
      problemes.push(`Il manque : ${fichiersManquants.join(" et ")}`);
     }
    /// verification des problèmes ///

    if (problemes.length === 0) {
      console.log(styleText("green", `\n ✅ dossier du projet ${projet.name}`));
    } else {
      console.log(styleText("red", `\n ❌ dossier du projet ${projet.name}`));
      problemes.forEach((probleme) => {
      console.log(`- ${probleme}`);
      });
    }
  });
}

// Interface de lecture pour la question //

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Question à l'utilisateur pour lancer la vérification //

rl.question("Lancer la vérification ? (o/n) ", (reponse) => {
  if (reponse.trim().toLowerCase() === "o") {
    console.log("Vérification en cours...");
    lancerVerif();
  } else {
    console.log("Annulé.");
  }
  rl.close();
});
