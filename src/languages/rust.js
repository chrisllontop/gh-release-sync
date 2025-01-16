const fs = require('fs');

function getProjectName() {
    try {
        const data = fs.readFileSync('Cargo.toml', 'utf8');
        const nameMatch = data.match(/name = "([^"]+)"/);
        
        if (!nameMatch) {
            throw new Error('Project name not found in Cargo.toml');
        }
        
        return nameMatch[1];
    } catch (error) {
        throw new Error(`Failed to get project name: ${error.message}`);
    }
}

function updateCargo(version) {
    try {
        const filePath = 'Cargo.toml';
        const data = fs.readFileSync(filePath, 'utf8');
        const updatedData = data.replace(
            /version = "\d+\.\d+\.\d+"/,
            `version = "${version}"`
        );
        fs.writeFileSync(filePath, updatedData);
    } catch (error) {
        throw new Error(`Failed to update Cargo.toml: ${error.message}`);
    }
}

function updateCargoLock(version) {
    try {
        const projectName = getProjectName();
        const filePath = 'Cargo.lock';
        const data = fs.readFileSync(filePath, 'utf8');
        
        const regexPattern = 
            `\\[\\[package\\]\\]\\nname = "${projectName}"\\nversion = "\\d+\\.\\d+\\.\\d+"`;
        
        const updatedData = data.replace(
            new RegExp(regexPattern),
            `[[package]]\nname = "${projectName}"\nversion = "${version}"`
        );
        
        fs.writeFileSync(filePath, updatedData);
    } catch (error) {
        throw new Error(`Failed to update Cargo.lock: ${error.message}`);
    }
}

function updateVersion(version) {
    try {
        updateCargo(version);
        updateCargoLock(version);
    } catch (error) {
        throw new Error(`Version update failed: ${error.message}`);
    }
}

module.exports = {
    updateVersion
};
