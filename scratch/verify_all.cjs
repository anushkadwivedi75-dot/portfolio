const fs = require('fs');

console.log('=== RUNNING COMPREHENSIVE PORTFOLIO CODE AUDIT ===');

const filesToCheck = [
  'src/App.tsx',
  'src/components/WorkRail.tsx',
  'src/components/ProjectCard.tsx',
  'src/components/Hero.tsx',
  'src/components/About.tsx',
  'src/components/Skills.tsx',
  'src/components/Leadership.tsx',
  'src/components/Achievements.tsx',
  'src/components/Contact.tsx',
  'src/components/SoundDock.tsx',
  'src/components/DesignEngineeringHUD.tsx',
  'src/components/WorkLog.tsx',
  'src/components/mockups/AirSentinelMockup.tsx',
  'src/components/mockups/LegalSimplifierMockup.tsx',
  'src/components/mockups/CloudDriveMockup.tsx',
  'src/components/mockups/SATSAMockup.tsx',
  'src/context/ThemeContext.tsx',
  'src/data/portfolioData.ts',
  'src/types/index.ts',
  'src/index.css',
  'index.html'
];

let allOk = true;
filesToCheck.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`MISSING FILE: ${file}`);
    allOk = false;
  } else {
    const content = fs.readFileSync(file, 'utf8');
    if (content.length === 0) {
      console.error(`EMPTY FILE: ${file}`);
      allOk = false;
    }
  }
});

if (allOk) {
  console.log(`✓ All ${filesToCheck.length} component & configuration files exist and have content.`);
}

// Check key features in components
const workRail = fs.readFileSync('src/components/WorkRail.tsx', 'utf8');
console.log('WorkRail has rail view:', workRail.includes("layout=\"rail\""));
console.log('WorkRail has stacked view:', workRail.includes("layout=\"stacked\""));
console.log('WorkRail has skip ahead:', workRail.includes("SKIP"));
console.log('WorkRail has view switcher:', workRail.includes("Rail View") && workRail.includes("Stacked View"));

const hero = fs.readFileSync('src/components/Hero.tsx', 'utf8');
console.log('Hero has Caveat hand intro:', hero.includes("font-hand"));
console.log('Hero has affiliations:', hero.includes("DJS ACM SIGAI"));

const soundDock = fs.readFileSync('src/components/SoundDock.tsx', 'utf8');
console.log('SoundDock has sound toggle:', soundDock.includes("soundManager.toggle"));

const hud = fs.readFileSync('src/components/DesignEngineeringHUD.tsx', 'utf8');
console.log('HUD has collaborative cursor:', hud.includes("Anushka (Lead Dev)"));
console.log('HUD has zoom dock:', hud.includes("handleZoomIn") && hud.includes("handleFit"));

const workLog = fs.readFileSync('src/components/WorkLog.tsx', 'utf8');
console.log('WorkLog has chronological rows:', workLog.includes("experiences.map"));
console.log('WorkLog has CV footnote:', workLog.includes("The serious bit"));

console.log('=== AUDIT COMPLETE ===');

