# SPA News - React

## Install the dependencies and devDependencies and start the server.

```sh
cd react-spa-news
npm install
npm run dev
```
check package.json files for other scripts

## Live site
Check live site [here](https://react-ssr-nabaraj.netlify.app/)

## Docker file (docker needs to installed)
```sh
git clone https://github.com/nabaraj/react-ssr.git
docker build . 
docker run -p 8080:80 $image_name
site can be open in localhost:8080
```
## Docker image from docker hub
```sh
docker pull nabaraj123/react-ssr:latest
```
