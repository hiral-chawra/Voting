// Dummy hash generator
// Responsibility: return a simple hex string for a given input

const crypto = require('crypto');

function generateHash(input) {
    // TODO: replace with a proper, collision-resistant hash if needed
    const hash = crypto.createHash('sha256').update(String(input)).digest('hex');
    return hash;
}

module.exports = { generateHash };
