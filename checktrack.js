import { readFileSync, existsSync } from "fs"
import { join, parse } from "path"
import { homedir } from "os"


const track = JSON.parse(readFileSync("track.json", "utf-8"));
console.log(track); 

const verifAda = join(homedir(), "ada-tech")
if(existsSync(verifAda)) {
    console.log("✅ Le dossier ada est bien là !")
}
else {
console.log("❌ Le dossier ada n'est pas là !")
};

const verifDossier = join(homedir(), "ada-tech", "bloc1","projets", track.projects[0].name);
console.log(verifDossier);

track.projects.forEach ((project) => {
    const cheminProjets = join(homedir(), "ada-tech", "bloc1","projets", project.name);
     console.log(cheminProjets);
});


track.projects.forEach((projet) => {

const verifGit = join(homedir(), "ada-tech", "bloc1","projets", projet.name, ".git");

if(existsSync(verifGit)) {
    console.log(verifGit + "✅ Le Git est bien initialisé !") }
else {
    console.log(verifGit + "❌ Le Git n'est pas initialisé !")
};
})

