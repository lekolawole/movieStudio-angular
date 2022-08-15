---
sidebar_position: 5
---

# Deployment

This documentation is exclusively for the frontend adaptation for the myFlix API web app built with Angular.

## Link Remote repo

Create a new repository on GitHub
#
Follow instructions [here](https://pages.github.com)

## Build your site

Build your site with **Angular gh-pages**:

```bash
ng add angular-cli-ghpages
```

The static files are generated in the `build` folder.

## Deploy your site

Test your production build locally:

```bash
ng deploy --base-href=/<repository-name>/
```

Congratulations! Your app is now served at [http://your-github-username.github.io/repository-name/](#).


