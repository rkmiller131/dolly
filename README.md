DOLLY AI <br>

<kbd> <br> [↩️ Visit the Live Site](https://www.google.com) <br> </kbd>

https://github.com/user-attachments/assets/21f9dec8-1f34-40fa-95bf-8cdd94941c8c

*Midjourney-esque text-to-image generator using DALL•E 3*

## 📁 Technologies Used
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

The Design:

![dollyDesign](https://github.com/user-attachments/assets/6d342f4e-d377-4ab8-9113-e43da5f692fd)

### 🖥️ Running the Project Locally
Recommended:
* [NVM](https://github.com/nvm-sh/nvm) to manage installations of Node and NPM
* Node v20
<br>

1️⃣ If you'd like to clone down the project code for yourself, create a folder on your PC where you wish to save the repo.
```
cd folderIWantToSaveIn
git clone https://github.com/rkmiller131/dolly.git
```
2️⃣ Now change directories into the folder you just cloned and open with your IDE (Example: VSCode)
```
cd dolly
code .
```
3️⃣ Once you're in the root directory for the project, install all dependencies:
```
npm install
```
4️⃣ **Note, there is an `example.env` file you will need to configure your own secret keys for. <br>
* Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and paste your database connection path in the `.env` after running the command below.
```
cp example.env .env
```
5️⃣ And run the project on `http://localhost:3000/` with:
```
npm run dev
```


