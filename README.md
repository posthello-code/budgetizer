A simple budgeting app.

* Check out the live version here [here](https://nextjs-weld-beta-80.vercel.app)
* If you press the save button, data is saved to the [backend](https://github.com/posthello-code/budgetizer-backend)
* The app uses Cossack Lab's ["Secure Cell"](https://docs.cossacklabs.com/themis/crypto-theory/cryptosystems/secure-cell/) to encrypt data.
* There is no authentication but you need to provide the ID to fetch data from the API, and you need the symmetric key to decrypt the data.
* When a user saves data for the first time a key is generated at the client side.
* User needs to supply both the ID and the key to reload or update the data.
* You can reload a budget using the ID on the main page or else you can navigate directly to it using the id in the url. Example: `https://nextjs-weld-beta-80.vercel.app/budgets/{id}`, doing so will prompt the UI to enter the key.

---
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
