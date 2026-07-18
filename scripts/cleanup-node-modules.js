#!/usr/bin/env node

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

const rootDir = process.cwd();
const packageGroupPaths = ['packages', 'apps', 'tooling'];

console.log('🧹 Cleaning up unwanted package-level node_modules folders...');

// First find all the unwanted node_modules directories
const unwantedNodeModules = [];

for (const groupPath of packageGroupPaths) {
  const fullGroupPath = path.join(rootDir, groupPath);
  if (fs.existsSync(fullGroupPath) && fs.statSync(fullGroupPath).isDirectory()) {
    const packageDirs = fs.readdirSync(fullGroupPath);
    for (const packageDir of packageDirs) {
      const fullPackagePath = path.join(fullGroupPath, packageDir);
      // Ensure it's a directory and not a symlink to avoid issues, and not the .pnpm folder itself if it's in a groupPath
      if (fs.statSync(fullPackagePath).isDirectory() && packageDir !== '.pnpm') {
        const nodeModulesPath = path.join(fullPackagePath, 'node_modules');
        if (fs.existsSync(nodeModulesPath)) {
          unwantedNodeModules.push(nodeModulesPath);
        }
      }
    }
  }
}

// Then delete them
if (unwantedNodeModules.length > 0) {
  console.log(
    `Found ${unwantedNodeModules.length} unwanted node_modules directories to clean up.`,
  );

  for (const nodeModulesPath of unwantedNodeModules) {
    const relativePath = path.relative(rootDir, nodeModulesPath);
    try {
      console.log(`Removing: ${relativePath}`);

      // On Windows, we need to use rimraf or similar to handle permission issues
      if (process.platform === 'win32') {
        // Try to use rimraf if available, otherwise fallback to recursive deletion
        try {
          execSync(`npx rimraf "${nodeModulesPath}"`, { stdio: 'ignore' });
        } catch {
          fs.rmSync(nodeModulesPath, { recursive: true, force: true });
        }
      } else {
        fs.rmSync(nodeModulesPath, { recursive: true, force: true });
      }

      console.log(`✅ Successfully removed: ${relativePath}`);
    } catch (err) {
      console.error(`❌ Failed to remove: ${relativePath}`);
      console.error(`   Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
} else {
  console.log('✅ No unwanted package-level node_modules folders found.');
}
