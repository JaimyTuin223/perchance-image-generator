const fs = require('fs');
const axios = require('axios');
const { chromium, firefox } = require('playwright');

class Requester {
    constructor() {
        this.urlData = [];
    }

    // URL data (key finder)
    async getUrlData(silent) {
        let urlData = [];
        const browser = await firefox.launch({ headless: true });
        const page = await browser.newPage();

        // Request handler to get network requests
        page.on('request', request => {
            urlData.push(request.url());
        });

        await page.goto('https://perchance.org/ai-text-to-image-generator');

        const frame = page.frameLocator('iframe[src]');
        await frame.locator('button#generateButtonEl').click();

        let key = null;
        while (key === null) {
            const pattern = /userKey=([a-f\d]{64})/;
            const allUrls = urlData.join('');
            const keys = allUrls.match(pattern);

            if (keys) {
                key = keys[0];
            }
            urlData.length = 0;

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        await browser.close();

        if (!silent) console.log('[perchance-image-generator]: Found a new key');
        return key;
    }

    // Function to get the user key
    async getKey(silent) {
        let key = null;

        // Check if key is already saved
        if (fs.existsSync('last-key.txt')) {
            const fileContents = fs.readFileSync('last-key.txt', 'utf-8');
            const line = fileContents.trim();

            if (line) {
                const verificationUrl = 'https://image-generation.perchance.org/api/checkVerificationStatus';
                const userKey = line.split('=')[1];
                const cacheBust = Math.random();
                const verificationParams = {
                    userKey: userKey,
                    __cacheBust: cacheBust
                };

                try {
                    const response = await axios.get(verificationUrl, { params: verificationParams });
                    if (response.data.status !== 'not_verified') {
                        key = line;
                    }
                } catch (error) {
                    console.error('[perchance-image-generator error]: Something went wrong verifying key:', error);
                }
            }
        }

        // Return valid key if found
        if (key) {
            if (!silent) console.log('[perchance-image-generator]: Valid key found in last-key.txt');
            return key.split('=')[1];
        }

        // Otherwise, retrieve a new key
        if (!silent) console.log('[perchance-image-generator]: Key no longer valid. Finding a new key..');
        key = await this.getUrlData(silent);

        if (!silent) console.log('[perchance-image-generator]: Found a valid key');
        fs.writeFileSync('last-key.txt', key, 'utf-8');

        return key.split('=')[1];
    }
}

module.exports = Requester;
