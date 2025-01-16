const languages = require('./languages/index');

function getReleaseVersion() {
    const tag = process.env.GITHUB_REF_NAME;
    if (!tag) {
        throw new Error('Tag does not exist');
    }

    const versionRegex = /^v(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)$/;
    const match = tag.match(versionRegex);

    if (!match) {
        throw new Error('Tag format is invalid. Expected format: v1.0.0 or v1.0.0-beta1');
    }

    return match[1];
}

function processVersionUpdate(lang) {
    try {
        const version = getReleaseVersion();

        console.log('Lang', lang);
        
        switch (lang.toLowerCase()) {
            case 'js':
                languages.js.updateVersion(version);
                break;
            case 'rust':
                languages.rust.updateVersion(version);
                break;
            default:
                throw new Error('Unsupported language parameter');
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

function main() {
    const lang = process.env.INPUT_LANG;
    if (!lang) {
        console.error('Error: INPUT_LANG environment variable is not set');
        process.exit(1);
    }

    processVersionUpdate(lang);
}

main();
