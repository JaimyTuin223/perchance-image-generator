const styles = {
    // Format: 
    // 'style-name': [
    //     'style (This is what the AI will generate, for example: "dynamic lighting, sharp focus, fine details, etc.)',
    //     'negative style (This is what the AI will avoid, for example: "Bad quality, low resoltuion, bad lighting, etc.)'
    // ],

    'none': ['', ''],

    'cinematic': [
        'cinematic shot, dynamic lighting, 75mm, Technicolor, Panavision, cinemascope, sharp focus, fine details, 8k, HDR, realism, realistic, key visual, film still, superb cinematic color grading, depth of field',
        'bad lighting, low-quality, deformed, text, poorly drawn, holding camera, bad art, bad angle, boring, low-resolution, worst quality, bad composition, disfigured'
    ],

    'traditional-japanese': [
        'in ukiyo-e art style, traditional japanese masterpiece',
        'blurry, low resolution, worst quality, fuzzy'
    ], 

    'painted-anime': [
        'painterly anime artwork, masterpiece, fine details, breathtaking artwork, painterly art style, high quality, 8k, very detailed, high resolution, exquisite composition and lighting',
        'worst quality, low quality, blurry, low-quality, deformed, text, poorly drawn'
    ], 

    'casual-photo': [
        'casual photo',
        'bad photo, bad lighting, high production value, unnatural studio lighting, commercial photoshoot, photoshopped, terrible photo, disfigured'
    ], 

    'digital-painting': [
        'breathtaking digital art, trending on artstation, by atey ghailan, by greg rutkowski, by greg tocchini, by james gilleard, 8k, high resolution, best quality',
        'low-quality, deformed, signature watermark text, poorly drawn'
    ], 

    'concept-art': [
        'concept art, digital art, illustration, inspired by wlop style, 8k, fine details, sharp, very detailed, high resolution, masterpiece',
        'low-quality, deformed, text, poorly drawn, worst quality, blurry'
    ], 

    // More styles coming soon
};

module.exports = styles;