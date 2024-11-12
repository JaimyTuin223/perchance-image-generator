const Requester = require('./keyCollector')
const { saveGeneratedImage, returnGeneratedImage } = require('./imageGenerator')
const clearImageDir = require('./dirCleaner')

class Client {
    constructor(options = {}) {
        this.silent = options.silent || false; 
        this.requester = new Requester();
    }

    async getKey() {
        const userKey = await this.requester.getKey(this.silent)
        if (userKey) return userKey
        else throw Error("[perchance-image-generator error] Failed to fetch a key");
    }

    async generateAndSave(prompt, negativeprompt, style) {
        if (!prompt) return console.log('[perchance-image-generator warning] No prompt was provided.')

        const userKey = await this.getKey()
        if (!userKey) return console.log("[perchance-image-generator error] Failed to fetch a key")

        // Generate img and save
        await saveGeneratedImage(prompt, negativeprompt, style, null, userKey, this.silent) 
    }

    async generateAndAttach(prompt, negativeprompt, style) {
        if (!prompt) return console.log('[perchance-image-generator warning] No prompt was provided.')

        // Get a authKey
        const userKey = await this.getKey()
        if (!userKey) return console.log("[perchance-image-generator error] Failed to fetch a key")

        // Generate URL
        const attachment = await returnGeneratedImage(prompt, negativeprompt, style, null, userKey, this.silent) 
        return attachment
    }

    async clearImageDir() {
        await clearImageDir()
    }
}

module.exports = Client;