import {readdirSync, readFileSync, writeFileSync} from 'node:fs'

const versionToSet = process.argv[2];
if(!versionToSet) {
  throw new Error('argument versionToSet expected');
}

const libFolderPath = './libs';
const tsconfigPath = './tsconfig.base.json';

function getFileContentAsObject(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function* getFiles(dir) {
  const dirEntries = readdirSync(dir, { withFileTypes: true});
  for(const entry of dirEntries) {
    if(entry.isDirectory()) {
      yield* getFiles(`${dir}/${entry.name}`);
    } else {
      yield `${dir}/${entry.name}`;
    }
  }
}

function* getPackageJsons() {
  for (const f of getFiles(libFolderPath)) {
    if(f.endsWith('/package.json')) yield f;
  }
}

const tsconfig = getFileContentAsObject(tsconfigPath);
const potentialPackagesNames = Object.keys(tsconfig.compilerOptions.paths);

for (const packageFilePath of getPackageJsons()) {
  const packageContent = getFileContentAsObject(packageFilePath);
  let hasChanges = false;
  for(const dependency in packageContent.peerDependencies) {
    if(potentialPackagesNames.includes(dependency)) {
      hasChanges = true;
      packageContent.peerDependencies[dependency] = versionToSet;
    }
  }
  for(const dependency in packageContent.dependencies) {
    if(potentialPackagesNames.includes(dependency)) {
      hasChanges = true;
      packageContent.dependencies[dependency] = versionToSet;
    }
  }

  if(hasChanges) {
    const newFileContent = JSON.stringify(packageContent);
    writeFileSync(packageFilePath, newFileContent, {encoding: 'utf8'});
  }
}
