# Contributing

:+1: First off, you are taking time to contribute to this prokect so a big THANK YOU :+1:


# Table Of Contents

1. [Code of Conduct](#1-code-of-conduct)
    - 1.1 [Our Pledge](#11-our-pledge)
    - 1.2 [Our Standarts](#12-our-standards)
    - 1.3 [Our Responsabilities](#13-our-responsabilities)
    - 1.4 [Scope](#14-scope)
    - 1.5 [Enforcement](#15-enforcement)
    - 1.6 [Attribution](#16-attribution)

2. [How Can I Contribute?](#2-how-can-i-contribute)
    - 2.1 [Reporting Bugs](#21-reporting-bugs)
    - 2.2 [Suggesting Enhancements](#22-suggesting-enhancements)
    - 2.3 [Your First Code Contribution](#23-your-first-code-contribution)
    - 2.4 [Pull Requests](#24-pull-requests)

3. [Styleguides](#3-styleguides)
    - 3.1 [Git Styleguide](#31-git-styleguide)
    - 3.2 [React Styleguide](#32-react-styleguide)
  
## 1. Code of Conduct

### 1.1 Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### 1.2 Our Standards

Examples of behavior that contributes to creating a positive environment include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a professional setting

### 1.3 Our Responsabilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

### 1.4 Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

### 1.5 Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at [atom@github.com](mailto:atom@github.com). All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

### 1.6 Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4, available at [https://contributor-covenant.org/version/1/4][version]

[homepage]: https://contributor-covenant.org
[version]: https://contributor-covenant.org/version/1/4/

## 2. How Can I Contribute ?
### 2.1 Reporting Bugs

Before creating a bug reports, please check if it doesn't exist in [this list](https://github.com/o2xp/react-datatable/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Abug+). When you are creating a bug report, please fill in [the bug report template](https://github.com/o2xp/react-datatable/blob/develop/.github/ISSUE_TEMPLATE/BUG_REPORT.md).

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

> **Reminder:** Don't forget to use markdown.

### 2.2 Suggesting Enhancements

Before creating enhancement / new feature suggestions, please check if it doesn't exist in [this list](https://github.com/o2xp/react-datatable/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22new+feature%22+) and [this one](https://github.com/o2xp/react-datatable/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Aenhancement). When you are creating an enhancent / feature request, please fill in [the template](https://github.com/o2xp/react-datatable/blob/develop/.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md).

> **Reminder:** Don't forget to use markdown.

### 2.3 Your First Code Contribution

If you want to contribute to the project you need to follow some steps :
![HowToContribute](https://user-images.githubusercontent.com/17124328/54755824-b8fe3080-4bde-11e9-8146-bd59703b7c1a.png)

#### Installation

```sh
$ cd /path/to/react-datatable
$ npm i
```

#### Start the project

```sh
// Start the project
$ npm start

// Start storybook
$ npm run storybook
```

#### Some usefull commands

```sh
// Run test
$ npm run test

// Run linter
$ npm run lint
$ npm run lintfix

// Build the library
$ npm run build
```

### 2.4 Pull Requests

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. Submit your pull request !

**Prerequisites:**  
- You have read the [CONTRIBUTING](https://github.com/o2xp/react-datatable/blob/develop/CONTRIBUTING.md) doc
- Lint and unit tests pass locally with your changes
- You have added tests that prove your fix is effective or that your feature works
- You have added necessary documentation (if appropriate)

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## 3. Styleguides
### 3.1 Git Styleguide

Always be sure that what you are writing is easily understable :
- To name a branch use this pattern : \<name of the feature\>-#\<number of the issue corresponding\> (eg search-filter-#3).
- To name a commit use this pattern: "feat/fix/enhancement (\<what you did\>) #\<number of the issue corresponding\>" (eg "feat (search filter implementation) #3").

> **Note:** This is not mandatory if you are clear in your branch and commit naming.

### 3.2 React Styleguide

In order to have a good quality of homogeneous code we are using some tools which are [Eslint](https://eslint.org/), [Prettier](https://prettier.io/) and [Husky](https://github.com/typicode/husky)

#### Eslint
Code linting is a type of static analysis that is frequently used to find problematic patterns or code that doesn’t adhere to certain style guidelines. JavaScript, being a dynamic and loosely-typed language, is especially prone to developer error. Without the benefit of a compilation process, JavaScript code is typically executed in order to find syntax or other errors. Linting tools like ESLint allow developers to discover problems with their JavaScript code without executing it. We are using the [Airbnb preset](https://github.com/airbnb/javascript).

#### Prettier
Prettier enforces a consistent code style (i.e. code formatting that won't affect the AST) across your entire codebase because it disregards the original styling* by parsing it away and re-printing the parsed AST with its own rules that take the maximum line length into account, wrapping code when necessary.

#### Husky
Husky is here to prevent bad commit and push. Before committing any changes, husky will launch eslint and prettier. If there is any error, your commit wont be effective, you need to correct your code and commit again.
