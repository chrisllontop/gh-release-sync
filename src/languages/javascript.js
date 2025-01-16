const { execSync } = require('child_process');

function updateVersion(version) {
    try {
        execSync(`npm version ${version} --no-git-tag-version`, {
            stdio: 'inherit'
        });
    } catch (error) {
        throw new Error(`Failed to update npm version: ${error.message}`);
    }
}

module.exports = {
    updateVersion
};
