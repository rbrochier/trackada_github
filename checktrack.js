import { readFileSync, existsSync } from "fs";
import { join, parse } from "path";
import { homedir } from "os";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Lancer la vérification ? (o/n) ", (reponse) => {
  if (reponse.trim().toLowerCase() === "o") {
    console.log("Vérification en cours...");
    // lancer la vérification

    const track = JSON.parse(readFileSync("track.json", "utf-8"));
    console.log(track);

    const verifAda = join(homedir(), "ada-tech");
    if (existsSync(verifAda)) {
      console.log("✅ Le dossier ada est bien là !");
    } else {
      console.log("❌ Le dossier ada n'est pas là !");
    }

    const verifDossier = join(
      homedir(),
      "ada-tech",
      "bloc1",
      "projets",
      track.projects[0].name,
    );
    console.log(verifDossier);

    // chemin projets //
    track.projects.forEach((project) => {
      const cheminProjets = join(
        homedir(),
        "ada-tech",
        "bloc1",
        "projets",
        project.name,
      );
      console.log(cheminProjets);
    });

    // verif Git //

    track.projects.forEach((projet) => {
      const verifGit = join(
        homedir(),
        "ada-tech",
        "bloc1",
        "projets",
        projet.name,
        ".git",
      );

      if (existsSync(verifGit)) {
        console.log(verifGit + "✅ Le Git est bien initialisé !");
      } else {
        console.log(verifGit + "❌ Le Git n'est pas initialisé !");
      }
    });

    // verification des fichiers requis //

    track.projects.forEach((projet) => {
      projet.required.forEach((fichier) => {
        const verifFichiers = join(
          homedir(),
          "ada-tech",
          "bloc1",
          "projets",
          projet.name,
          fichier,
        );
        if (existsSync(verifFichiers)) {
          console.log(verifFichiers + "✅ Le fichier est bien là !");
        } else {
          console.log(verifFichiers + "❌ Le fichier n'est pas là !");
        }
      });
    });
  } else {
    console.log("Annulé.");
  }
  rl.close();
});
