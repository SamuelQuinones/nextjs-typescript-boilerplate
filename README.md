# Advanced NextJS Typescript Boilerplate

Over the past few months, I've worked on several [Next.js](https://nextjs.org/) projects. The more I worked on, the more overlap I saw in my projects and I decided to make a more advanced boilerplate based on the basic starter.

This boilerplate was put together with **NPM** but is **absoutely usable with YARN**. If you do opt to use yarn, remember to delete the `package-lock.json` 😉.

By default, this project has a [MIT](https://choosealicense.com/licenses/mit/) License, if your project uses a different license or no license at all, be sure to modify or delete accordingly.

You can learn more about choosing a license here https://choosealicense.com/licenses/mit/ and here https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository

I am always open to suggestions on how to improve this, so if you have something you'd like to suggest feel free to open a PR! And if you face problems you can open an issue and we'll try and get it sorted!

## Slight Changes to the Base

This boilerplate is as **bare-bones as possible**. It includes the stock NextJS defaults with some slight modificaions:

- Makes use of a `src` directory to keep things clean and orderly
- makes use of an `assets` directory to house things like styles, fonts, and possibly theme configurations
- The `globals.css` file has been changed to a `globals.scss` file
- All `.js` files have been converted into `.ts` or `.tsx` files accordingly - because this _is_ using Typescript.
- Added `node-sass` to compile scss files without any additional configuration

## Additions

I've also made what I would describe as "quality of development" changes:

- Added some extra fonts I've used - and an accompanying `_fonts.scss` file.
- Added a simple Button component in `src/components/Button.tsx` to demonstrate organization and also the custom import path configuration that Typescript allows.
- Added [Eslint](https://eslint.org/) and [prettier](https://prettier.io/) - which are configured to work together - to help with code format concistency. There is a NPM script that can look for problems and attempt to fix them!
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

## Eslint & Prettier

**_Prettier_** is used to help make files look more "pretty" or more with eachother. It fixes smaller things like extra lines, single vs double quotes, how many characters belong on a line before the line needs to be wrapped, and more.

**_Eslint_** is used to help enforce `prettier` rules and display warnings that the user can act on. Some IDE's will even show errors or warnings if the code breaks eslint's rules. Eslint also has plugins which can extend how useful it is.

## Tsconfig Paths

With larger scale projects, it can be hard to keep track of all of your files and where they are. With the inclusion of `paths` and `basePath` imports are much more uniform and a lot less "ugly".

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["./src/components/*"],
      "@util": ["./src/util"],
      "@util/*": ["./src/util/*"]
    },
    ...
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
2. `cross-env` was added to allow for the use of environment variables in npm scripts across multiple platforms. Currently it is only used to customize the statix export directory.
3. `serve` was added for those who are opting for pure static exports of their NextJS project. Serve allows you to preview your static build. It is similar to "live preview" for a stock-html project.

## The NPM Scripts

Below I will attempt to explain each script and the purpose it has.

```json
"scripts": {
    "dev": "next dev",
    "dev:debug": "NODE_OPTIONS='--inspect' next dev",
    "build": "npm run clean && next build",
    "build:full": "npm run build && npm run export",
    "export": "cross-env-shell \"next export -o $npm_package_config_static_out\"",
    "start": "next start -p 8080",
    "start:dev": "next start -p 3012",
    "start:static": "cross-env-shell \"serve $npm_package_config_static_out\"",
    "clean": "npm run clean:next && npm run clean:static",
    "clean:next": "rimraf .next",
    "clean:static": "cross-env-shell \"rimraf $npm_package_config_static_out\"",
    "clean:light": "cross-env-shell \"rimraf .next/* && rimraf $npm_package_config_static_out/*\"",
    "eslint": "eslint --ext js,tx,tsx",
    "lint": "npm run eslint src",
    "lint:fix": "npm run eslint -- --fix src",
    "pretty:check": "prettier --check .",
    "pretty:fix": "prettier --write ."
  },
```

From top to bottom:

- `dev` is the default NextJS dev command
- `dev:debug` runs the dev script but in a debug mode (see `.vscode/launch.json` for debug configuration)
- `build` runs the default NextJS build command, but first it "cleans" the `.next` and `static_out` folders
- `build:full` runs `build` and `export`
- `export` runs the default NextJS export command to the `static_out` directory.
- `start` runs the default NextJS start command on a specified port.
- `start:dev` runs the start command, but does so on a different port. This us useful if you have a 'dev' version of your project.
- `start:static` uses `serve` to start the static export of the project. Not **_necesarrily_** needed in production, but is useful to preview your build easily.
- `clean` runs `clean:static` and `clean:next`. Cleaning ensures that no old / unneeded files from previous builds carry over into the new one.
- `clean:next` "cleans" the `.next` folder by deleting it.
- `clean:static` "cleans" the `static_out` directory by deleting it.
- `clean:light` "cleans" the **_contents_** of the `.next` and `static_out` folders by deleting what is inside - does not delete the folders. This could be useful depending on how you deploy your app.
- `eslint` specifies the parameters with which to run eslint using rules set in `.eslintrc.js`.
- `lint` runs `eslint` on the `src` directory and the contents. This will only warn you of prolems, not fix them.
- `lint:fix` runs `lint` but with the `--fix` argument which will actually fix the errors.
- `pretty:check` uses `prettier` to check files against the rules in `.prettierrc`.
- `pretty:fix` uses `prettier` to FIX issues with files using rules in `.prettierrc`.
