# Typescript Drag and Drop Project
- made with typescript

## Important cmds
- ```tsc -w``` runs and update js files in watch mode
- ```npm start``` starts server
- ```npm install -g typescript```
- on mac - ```sudo npm install -g typescript```

## tsconfig.json changes
- if you get noUnusedParameters error, set ```noUnusedParameters: false``` or you can use ```_name``` of variable name, so TS and JS will ignore it
- also add ```"experimentalDecorators": true,``` to use decorators