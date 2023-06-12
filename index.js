import FetchWrapper from "./fetch-wrapper.js";
import { startLoader } from "./helpers.js";
import { stopLoader } from "./helpers.js";

const form = document.querySelector("#repos-form");
const userName = document.querySelector("#github-username");
const button = document.querySelector("#get-repos");
const list = document.querySelector("#repos-list");

const GithubAPI = new FetchWrapper("https://api.github.com");

const githubApi = () => {
    form.addEventListener("submit", event => {
        event.preventDefault();
        startLoader(button);

        GithubAPI.get(`/users/${userName.value}/repos`)
        .then(data => {

            list.innerHTML = "";
            // console.log(data);
            data.forEach(repo => {
                // console.log(repo);

                list.insertAdjacentHTML("beforeend", `<li><a href="${repo.html_url}" target="_blank"><h2>${repo.full_name}</h2><p>${repo.description}</p></a></li>`);
            })
        })
        .finally(() =>{
            stopLoader(button, "Get repos");
        })
    })
};

githubApi();