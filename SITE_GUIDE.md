# Sumit's website

The portfolio is a static homepage served through this repository's existing Jekyll and GitHub Pages setup. It has no new JavaScript packages, external fonts, analytics, or framework requirements.

## Edit the site

- `index.html`: visible copy, links, education, experience, projects, and writing.
- `assets/css/portfolio.css`: layout, colors, typography, responsive styles, and print styles.
- `assets/js/portfolio.js`: theme preference, project filters, email copy, and active navigation.
- `images/sumit-singh-portrait.png`: displayed portrait. Update the image path and dimensions in `index.html` if replacing it with a different filename.
- `images/brands/`: local profile icons and official company marks, with source and license information in its README.
- `files/sumit-singh-resume.pdf`: the current compiled resume, used by both the view and download links.
- `_config.yml`: GitHub Pages origin, project path, and template exclusions.

GitHub, LinkedIn, email, and Resume appear in the profile row below the hero button. That row sticks under the main navigation after it scrolls to the header, then returns below the button when scrolling back. The Deep-ML profile is linked beside the Projects introduction. Icons retain visible labels on phones.

When publishing changes to `portfolio.css` or `portfolio.js`, bump the `v` value on their links in `index.html` so returning visitors load the new assets together with the new page.

## Update the resume

Edit the original Overleaf project and recompile it. The main source is `cv_4.tex`, which uses `resume.cls`. The contact row includes a clickable Website label. Each project title and its link icon point to that project's GitHub repository.

Download the freshly compiled PDF and replace `files/sumit-singh-resume.pdf`. Check that it still has one page and that the website, LinkedIn, GitHub, project, and tutorial hyperlinks work. The website keeps the public PDF filename stable. Update the `v` date in its two homepage links when publishing a new PDF so visitors receive the latest copy. Preserve the explicit `\item[]` in each experience subsection when editing its existing list structure.

## Preview

From this directory, run `python -m http.server 4000 --bind 127.0.0.1` and open `http://127.0.0.1:4000/`. The homepage uses relative asset paths and works under the GitHub Pages project path.

For a full Jekyll build with Ruby and Bundler installed, run `bundle install` followed by `bundle exec jekyll build`.

## Deploy

The live address is `https://sumit1311singh.github.io/sumitsingh.github.io/`. The Pages publishing source is GitHub Actions. Pushing to `master` triggers `.github/workflows/jekyll.yml`, which builds the site and deploys it to the `github-pages` environment. Confirm that the workflow completes successfully, then check the live homepage and PDF.

The Academic Pages template remains available in the repository. Its sample collections, pages, and posts are excluded from the public build. Before adding a native blog, deliberately enable your own content and appropriate layouts. Local editor settings, generated deliverables under `output/`, and the unused portrait source are ignored by Git.
