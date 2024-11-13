
## Perchance image generator
Generate AI image prompts from perchance in your Node.JS code.

##### Inspired by python based [perchance-image-generator](https://github.com/lsimek/perchance-image-generator) by Isimek.


## Installation

Below are the steps explained to set up all required stuff for the system to run.

#### 1. Module files
Install the package and all it's dependencies using the npm install command in your project environment.
```bash
  npm i perchance-image-generator
```

#### 2. Playwright setup
Now setup the playwright module, this is done using the npx command.
```bash
  npx playwright install
```

## Usage/Examples
To use the functions below you will need to include these 2 lines at the top of your file.
```bash
  const perchanceImageGenerator = require('perchance-image-generator')
  const imageGenerator = new perchanceImageGenerator()
```
 You can use "new perchanceImageGenerator({ silent: true })" to run the generator in Silent mode.

Current available functions:

### generateAndAttach()
Create a Discord attachment to use and send back to the user via your Discord bot!
```javascript
let attachment = await imageGenerator.generateAndAttach("prompt", "negative prompt", "style") // Generate prompt and receive the attachment
return message.reply({ content: `AI img generator test`, files: [attachment]}) // Return a message with the image
```

### generateAndSave()
Safe your creations to a local folder (Default: generated-pictures) in the workspace.
```javascript
await imageGenerator.generateAndSave("prompt", "negative prompt", "style") // Generate prompt and save it
```

### clearImageDir()
It might get a bit messy if you constantly save your creations, that's why the code also has a directory cleaner feature.
This will empty the generated-pictures folder completely!
```javascript
await imageGenerator.clearImageDir() // Clear the generated-pictures directory
```


## FAQ

#### Playwright returns an error on Linux, what's wrong?

The code currently doesn't support Linux, as firefox isn't available on that OS, please use Windows or MacOS to run this code instead.


## Support

For support you can create a support post in the  [Ginger Productions](https://discord.gg/8KxqWAKCPe) Discord server.

## Generated images
These 2 images below have been created using the Painted Anime style of the AI image generator:

![App Screenshot](https://spud.jaimytuin.com/media/projectShowcase/AIexample3.png)
![App Screenshot](https://spud.jaimytuin.com/media/projectShowcase/AIexample1.jpeg)
