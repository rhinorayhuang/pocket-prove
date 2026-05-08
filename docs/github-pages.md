# GitHub Pages Deployment

## What Is Ready

This project includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

The workflow:

1. installs dependencies with `npm ci`
2. builds the Vite app
3. sets `BASE_PATH` to `/<repo-name>/`
4. uploads `dist/`
5. deploys to GitHub Pages

## First-Time Setup

Create a GitHub repository, then push this project to it:

```bash
git init
git branch -M main
git add .
git commit -m "Prepare Pocket Grove demo"
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Then in GitHub:

1. open the repository settings
2. go to `Pages`
3. set `Source` to `GitHub Actions`
4. wait for the `Deploy GitHub Pages` workflow to finish

The public URL will be:

```text
https://<user>.github.io/<repo>/
```

## Local Verification

```bash
npm run build
```

For a local preview:

```bash
npm run preview:forward
```
