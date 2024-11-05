
## Perchance image generator
Generate AI image prompts from perchance in your Node.JS code.

##### Inspired by python based [perchance-image-generator](https://github.com/lsimek/perchance-image-generator) by Isimek.


## Installation

Below are the steps explained to set up all required stuff for the system to run.

#### 1. Node modules
First install all required node modules using the code below in your cmd prompt.
```bash
  npm i fs, path, axios, playwright
```

#### 2. Playwright setup
Now we are going to setup the module Playwright, this can easily be done by running
```bash
  npx playwright install
```

#### 3. Have fun!
Now you have set up the code to run! Feel free to modify and have a look around to customise it to your needs!
## Usage/Examples
Different functions the code supports in this version:

### Discord attachments
Create a Discord attachment to use and send back to the user via your Discord bot!
```javascript
let attachment = await AI.generateAndAttach("prompt", "negative prompt", "style") // Generate prompt and receive the attachment
return message.reply({ content: `AI img generator test`, files: [attachment]}) // Return a message with the image
```

### Saving files
Safe your creations to a local folder (Default: generated-pictures) in the workspace.
```javascript
await AI.generateAndSave("prompt", "negative prompt", "style") // Generate prompt and save it
```

### Clearing the generated-pictures directory
It might get a bit messy if you constantly save your creations, that's why the code also has a directory cleaner feature.
This will empty the generated-pictures folder completely!
```javascript
await AI.clearImageDir() // Clear the generated-pictures directory
```


## FAQ

#### Playwright returns an error on Linux, what's wrong?

The code currently doesn't support Linux, as firefox isn't available on that OS, please use Windows or MacOS to run this code instead.


## Support

For support you can create a support post in the  [Ginger Productions](https://discord.gg/8KxqWAKCPe) Discord server.
