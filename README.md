# NextJS, Tailwind, TRPC, Prisma, and NextAuth Starter Project

For each project there is an inane, and quite frankly, insane amount of setup and boiler plate code you must write before you can even start with your app specific code. You have to choose and setup the database, data fetching, data validation, SSR, and CSS framework. That doesn't even include code quality addtions like linting, or Git hooks to keep you from commiting silly mistakes like `console.log`'s and pushing them to your repo.

This starter project is built to help you get your project off the ground as fast as possible. Styling, Authentication, Database, Data Transport, Data Validation and SSR are all installed and/or configured and ready for your app specific modifications. On top of this code quality tools like husky and eslint are configured and all the scripts you need for starting and running your project are ready to go.

## DaisyUI

[daisyui.com](https://daisyui.com/)

Daisy UI is one of the most popular compnent libraries built on top of TailwindCSS. It is themeable, and also comes with a bunch of pre built themes. It has an amazing array of prebuilt components and is extremely flexible and easy to customize when necessary.

## NextAuth

[next-auth.js.org](https://next-auth.js.org/)

Next Auth is pretty much the defacto authentication framework for NextJS. It has a multitude of providers for different authenticaion methods, as well as adapters to connect it to a variety for different data sources.

## Primsma

[prisma.io](https://prisma.io/)

Prisma is a next generation multi database ORM for Node.js. Through the use of type generation and custom schema language, it provides type safe queries and mutations.

## Planetscale

[planetscale.com](https://planetscale.com/)

Planet scale is a serverless MySQL database platform that scales as your application grows. With branching, merging, migrations, and automatic backups, it is a great way to manage your database without any need for a dedicated devops team.

## TRPC

[trpc.io](https://trpc.io/)

TRPC is and library for building End-to-End type-safe api's. When combined with Prisma it provides type safety all the way from your database to your frontend code.

## ZOD

[zod.dev](https://zod.dev/)

ZOD is a TypeScript first schema declaration and validation libary with automatic type inference. It is a powerful tool for building and composing type-safe data schemas and validators.

ZOD is compatible with both TRPC and Reach Hook Form to provide both server and client side data validation.

## React Hook Form

[react-hook-form.com](https://react-hook-form.com/)

React Hook Form is a flexible library for building validation for even the most complext of forms. It's lightweight, performant and easy to use.

## ESLINT

[eslint.org](https://eslint.org/)

ESLINT is a tool for enforcing consistent code style and quality.

## HUSKY

[typicode.github.io/husky](https://typicode.github.io/husky/)

Husky is a tool to setup and manage Git hooks for your project. It can be used to lint code, markdown or commit messages, or run tests or basically anything you need to do to ensure the integrity of the code before it makes it's way into your repo.
