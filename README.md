**Step 1: Initialize Git in the `playwrightvn` folder:**

```
git init
git add .
git commit -m "init playwright project"
```

**Step 2: Create the `playwrightvn` repository on GitHub:**

**2-1 If it is a completely new repository:**

```
git remote add origin https://github.com/Vile278/playwrightvn.git
git remote add origin https://github.com/Vile278/playwrightApi.git
git remote add origin https://github.com/Vile278/typescript.git
git remote add origin https://github.com/Vile278/jitsuappiumts.git

git branch -M main
git push -u origin main // code is pushed to GitHub
```

**2-2 If the repository already exists and has been pushed before, do as follows:**
Example: `playwrightwebtradecenter` is an existing repository with code

```
git remote set-url origin https://github.com/Vile278/playwrightwebtradecenter.git 
git add .
git commit -m "code latest 22-Mar-26"
git push -u origin main
```

**2-3 You can remove the repository and then re-add it:**

```
git remote remove origin
git remote add origin https://github.com/Vile278/playwrightwebtradecenter.git
git add .
git commit -m "code latest 22-Mar-26"
git push -u origin main
```

**Step 3: Create a file to run Git**

* Create folder `.github/workflows`
* Create a file named `playwright.yml` inside workflows
  (file content is shown below)

Push it to Git:

```
git add
git commit -m "abc xyz"
git push
```

After completing the above 3 steps correctly, go to the Actions tab and you will see the automation running.

---

**Step 4: Update `playwright.yml` to allow rerunning automation from the Git UI**
Add the line:

```
workflow_dispatch:
```

Then add + commit + push the code again to see the automation run.

---

**Step 5: Schedule the run**
For example, to run at 8 AM, update `playwright.yml` with:

```
- cron: "0 8 * * *"
```

(because Vietnam time is UTC +7)

Then add + commit + push the code again.

---

****Step 6: Run on local**
```
run all files in tests folder: **npx playwright test**
```
```
run a specific file, e.g **npx playwright test ./tests/test.webtrade.nonfixture.spec.ts**
```
---
