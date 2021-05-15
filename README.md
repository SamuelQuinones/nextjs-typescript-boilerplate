# Advanced NextJS Typescript Boilerplate

Over the past few months, I've worked on several [Next.js](https://nextjs.org/) projects. The more I worked on, the more overlap I saw in my projects and I decided to make a more advanced boilerplate based on the basic starter.

This boilerplate was put together with **NPM** but is **absoutely usable with YARN**. If you do opt to use yarn, remember to delete the `package-lock.json` 😉.

As a side note - even if you are using `npm`, I recommend deleting the `package-lock.json` file and running `npm install` to reset it **before you make any changes to the rest of the template**

If you use [Visual Studio Code](https://code.visualstudio.com/), you can make use of some [added benefits](#the-vscode-folder) in this boilerplate. Like with NPM and YARN; **you can use this boilerplate with any IDE!**

By default, this project has a [MIT](https://choosealicense.com/licenses/mit/) License, if your project uses a different license or no license at all, be sure to modify or delete accordingly.

You can learn more about choosing a license here https://choosealicense.com/ and here https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository

I am always open to suggestions on how to improve this, so if you have something you'd like to suggest feel free to open a PR! And if you face problems you can open an issue and we'll try and get it sorted!

## Slight Changes to the Base

This boilerplate is as close to a default `create-next-app` as possible. In addition to the additions described in detail further down, I've also made some slight modifications to the base template:

- Made use of a `src` directory to keep things clean and orderly
- Made use of an `assets` directory to house things like styles, fonts, and possibly theme configurations
- The `globals.css` file has been changed to a `globals.scss` file
- All `.js` files have been converted into `.ts` or `.tsx` files accordingly - because this _is_ using Typescript.
- Added `sass` to compile scss files without any additional configuration - switched from `node-sass` to the dart version.

## Additions

I've also made what I would describe as "quality of development" changes:

- Added some extra fonts I've used - and an accompanying `_fonts.scss` file - even if you don't use them, this shows how you can implement your own!
- Added a simple Button component in `src/components/Button.tsx` to demonstrate organization and also the custom import path configuration that Typescript allows.
- Added [Eslint](https://eslint.org/) and [prettier](https://prettier.io/) - which are configured to work together - to help with code format concistency. There is a NPM script that can look for problems and attempt to fix them!
- Added [Stlyelint](https://stylelint.io/) for better css / scss linting.
- Added `.gitattributes` take from https://github.com/alexkaratarakis/gitattributes/blob/master/Web.gitattributes I've found that this helps with cross platform development (those pesky line endings!)
- Added `.editorconfig` to help with concistency and cross-platform development
- Added some utilities under `src/util`:
  - `index.ts` has some general functions you could find use for in almost any project
  - `Types.ts` is a convenient place for all of your custom types
- Added `paths` to `tsconfig.json` for cleaner imports
- Added additional light-weight development-dependency packages
  - rimraf
  - serve
  - cross-env
- Made the project opt into [Strict Mode](#why-use-strict-mode):
  - Typescript strict mode is enabled via `tsconfig.json`
  - React strict mode is enabled via `next.config.json`

## Save-Exact Approach

I've included a `.npmrc` file that defaults the behavior to save-exact. This means that adding a dependency will install it at the specific version with no carat (`^`).

```json
{
  "dependencies": {
    "next": "10.2.0",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "sass": "1.32.13"
  }
}
```

as opposed to this

```json
{
  "dependencies": {
    "next": "^10.2.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "sass": "^1.32.13"
  }
}
```

This is a personal choice as I have found it makes maintaining projects across multiple machines easier - especially as the project scales. If you don't want to take this approach, you can remove the `.npmrc` file and simply add a carat (`^`) to the packages.

## Eslint, Prettier, & Stylelint

**_Prettier_** is used to help make files look more "pretty" or more uniform with eachother. It fixes smaller things like extra lines, single vs double quotes, how many characters belong on a line before the line needs to be wrapped, and more.

**_Eslint_** is used to help enforce `prettier` rules and display warnings that the user can act on. Some IDE's will even show errors or warnings if the code breaks eslint's rules. Eslint also has plugins which can extend how useful it is.

**_Stylelint_** is used to provide linting support for css and scss files.

## Tsconfig Paths

With larger scale projects, it can be hard to keep track of all of your files and where they are. With the inclusion of `paths` and `basePath` imports are much more uniform and a lot less "ugly".

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["./src/components/*"],
      "@util": ["./src/util"], // points to util/index.ts
      "@util/*": ["./src/util/*"] // points to other files in the util folder
    },
}
```

With the above additions, you can change imports that look like this:

```ts
import Header from "../../components/Header";
```

to something like this!

```ts
import Header from "@components/Header";
```

Additionally, even without an alias your imports can still be simplified. Let's say you had a folder called "helpers" but you didn't have an alias for it, you could still have a cleaner import! Even if your helpers file was 12 directories deep, your import could look like this:

```ts
import { helperFunction } from "src/helpers/MyHelpers";
```

## Additional Dev dependencies

Why did I include `rimraf`, `cross-env` and `serve` you may ask?

1. `rimraf` was added to help with cleaning of build directories. When building / rebuilding NextJS doesn't do a great job of cleaning earlier builds (it leaves behind old build caches) so rimraf helps to clean those folders before a new build is created. Both for regular and static builds.
2. `cross-env` was added to allow for the use of environment variables in npm scripts across multiple platforms. Currently it is only used to customize the static export directory.
3. `serve` was added for those who are opting for pure static exports of their NextJS project. Serve allows you to preview your static build. It is similar to "live preview" for a stock-html project.

## The NPM Scripts

Below I will attempt to explain each script in `package.json` and the purpose it has.

From top to bottom:

- `dev` is the default NextJS dev command
- `dev:debug` runs the dev script but in a debug mode (see `.vscode/launch.json` for debug configuration)
- `build` runs the default NextJS build command, but first it "cleans" the `.next` and `static_out` folders
- `build:full` runs `build` and `export`
- `export` runs the default NextJS export command to the `static_out` directory.
- `start` runs the default NextJS start command on a specified port.
- `start:dev` runs the NextJS start command, but does so on a different port. This us useful if you have a 'dev' version of your project.
- `start:static` uses `serve` to start the static export of the project. Not **_necesarrily_** needed in production, but is useful to preview your build easily.
- `clean` runs `clean:static` and `clean:next`. Cleaning ensures that no old / unneeded files from previous builds carry over into the new one.
- `clean:next` "cleans" the `.next` folder by deleting it.
- `clean:static` "cleans" the `static_out` directory by deleting it.
- `clean:light` "cleans" the **_contents_** of the `.next` and `static_out` folders by deleting what is inside - does not delete the folders. This could be useful depending on how you deploy your app.
- `checkTs` can quickly check your typescript for rule violations, useful if you just moved around a lot of files.
- `eslint` specifies the parameters with which to run eslint using rules set in `.eslintrc.js`.
- `stylelint` runs stylelint on all css, scss, and sass files in the `src/assets/styles` directory using rules in `.stylelintrc`.
- `lint` runs `eslint` on the `src` directory and the contents. Also runs `stylelint` This will only warn you of prolems, not fix them.
- `lint:fix` runs `lint` but with the `--fix` argument which will actually fix the errors for both Typescript and SCSS.
- `pretty:check` uses `prettier` to check files against the rules in `.prettierrc`.
- `pretty:fix` uses `prettier` to FIX issues with files using rules in `.prettierrc`.

## Why use `Strict` Mode?

React's Strict Mode is a development mode only feature for highlighting potential problems in an application. It helps to identify unsafe lifecycles, legacy API usage, and a number of other features.

Your code does not necesarrily _Have_ to opt in to Strict Mode, but it is highly recommended as in general it fosters better development practices and helps your app be ready for the future of react.

## The `.vscode` Folder

As I said above; I use [Visual Studio Code](https://code.visualstudio.com/) as my IDE. It is lightweight and very powerful. If you too use Visual Studio Code, then you have access to some more tools!

If you opt not to use stylelint, remember to change the settings in `.vscode/settings.json` to re-enable the builtin linting.

### Useful User Snippets

You may not have a need for these, but I make use of these snippets every day. They act as short hand for several common and often tedious to write lines of code. They take care of things like making a new React functional component and setting up a useState hook.

### Recommended Extensions

You may already have these or you may find you don't want them, but I've included a json file that will prompt you to install some extensions that the workspace recommends. All are official extensions from the vscode marketplace!

- Chrome Debugger
- Editorconfig Control
- Vscode Eslint
- HTML css class completion
- javascript snippets
- node module intellisense
- npm script shortcuts
- npm intellisense
- Vscode Prettier
- Gitlens
- Vscode Icons
- Dotenv Intellisense
- Search Node Modules
- Bracker Pair Colorizer
- SCSS Intellisense
- Stylelint support
- Better comments

### Debug Configuration

If you find you make use of the debug script, running debug through Visual Studio Code will allow you to have full control over the experience. You can add breakpoints, pause and resume execution, [and much more!](https://nextjs.org/docs/advanced-features/debugging)

### Configurable Tasks

Instead of having to open your terminal and type `npm run build` every time, you can configure tasks that get bound to keys. Currently the default task is `npm run build` which can be run by pressing <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> on Windows and <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> on Mac.
