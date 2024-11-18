const axios = require('axios');
const fs = require('fs');
const path = require('path');
const styles = require('../src/styles');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function encode(prompt) {
    return encodeURIComponent(prompt).replace(/'/g, '%27');
}

async function generateImageData(prompt, negativePrompt, style, resolution, userKey, silent) {
    if (!prompt) throw new Error('[perchance-image-generator error]: Prompt is required.');
    if (!styles.hasOwnProperty(style)) throw new Error(`[perchance-image-generator error]: Unrecognized style "${style}". Please refer to the readme.`);
    if (!userKey) throw new Error('[perchance-image-generator error]: A valid userKey is required.');

    const promptStyle = styles[style][0];
    const negativePromptStyle = styles[style][1];
    const promptQuery = encode(`${prompt}, ${promptStyle}`);
    const negativePromptQuery = encode(`${negativePrompt}, ${negativePromptStyle}`);
    const guidanceScale = 7;

    if (!silent) console.log(`[perchance-image-generator]: Generating prompt "${prompt}" in style "${style}". Please wait...`);

    const imageId = await generateImage(promptQuery, negativePromptQuery, userKey, guidanceScale, resolution, silent);
    const imageData = await downloadImage(imageId);

    if (!silent) console.log(`[perchance-image-generator]: Image generated successfully.`);
    return imageData;
}

function getUniqueFilename(directory, baseName, extension) {
    let filename = path.join(directory, `${baseName}${extension}`);
    let counter = 1;

    while (fs.existsSync(filename)) {
        filename = path.join(directory, `${baseName}(${counter})${extension}`);
        counter++;
    }

    return filename;
}

function saveImageToFile(imageData, prompt) {
    const generatedDir = 'generated-pictures';
    fs.mkdirSync(generatedDir, { recursive: true });

    const baseName = prompt.replace(/\s+/g, '_');
    const filename = getUniqueFilename(generatedDir, baseName, '.jpeg');

    fs.writeFileSync(filename, imageData);
    console.log(`[perchance-image-generator]: Image saved as "${filename}"`);

    return filename;
}

function createDiscordAttachment(imageData, prompt) {
    const baseName = prompt.replace(/\s+/g, '_');
    const filename = `${baseName}.jpeg`;

    return {
        attachment: imageData,  
        name: filename
    };
}

// Helper functions for generating and downloading the image
async function generateImage(promptQuery, negativePromptQuery, userKey, guidanceScale, resolution) {
    const createUrl = 'https://image-generation.perchance.org/api/generate';
    const createParams = {
        prompt: promptQuery,
        negativePrompt: negativePromptQuery,
        userKey: userKey,
        __cache_bust: Math.random(),
        seed: '-1',
        resolution: resolution,
        guidanceScale: String(guidanceScale),
        channel: 'ai-text-to-image-generator',
        subChannel: 'public',
        requestId: Math.random()
    };

    let attempts = 0;
    const maxAttempts = 10;

    try {
        let createResponse = await axios.get(createUrl, { params: createParams });
        while (createResponse.data.status === 'waiting_for_prev_request_to_finish' && attempts < maxAttempts) {
            attempts++;
            await sleep(8000);
            createResponse = await axios.get(createUrl, { params: createParams });
        }

        if (createResponse.data.status !== 'success') {
            throw new Error('[perchance-image-generator error]: Image generation failed.');
        }

        return createResponse.data.imageId;

    } catch (error) {
        throw new Error(`[perchance-image-generator error]: Failed to generate image. ${error.message}`);
    }
}

async function downloadImage(imageId) {
    const downloadUrl = 'https://image-generation.perchance.org/api/downloadTemporaryImage';
    const downloadParams = { imageId: imageId };

    try {
        const downloadResponse = await axios.get(downloadUrl, { params: downloadParams, responseType: 'arraybuffer' });
        return downloadResponse.data;
    } catch (error) {
        throw new Error(`[perchance-image-generator error]: Failed to download image. ${error.message}`);
    }
}

// Generate image data and save to file
async function saveGeneratedImage(prompt, negativePrompt, style, resolution, userKey, silent) {
    try {
        const imageData = await generateImageData(prompt, negativePrompt, style, resolution, userKey, silent);
        return saveImageToFile(imageData, prompt);
    } catch (error) {
        console.error(error.message);
    }
}

// Generate image data and create a Discord attachment
async function returnGeneratedImage(prompt, negativePrompt, style, resolution, userKey, silent) {
    try {
        const imageData = await generateImageData(prompt, negativePrompt, style, resolution, userKey, silent);
        let attachment = await createDiscordAttachment(imageData, prompt);
        return attachment
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { saveGeneratedImage, returnGeneratedImage };