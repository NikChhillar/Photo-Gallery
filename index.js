const btn = document.getElementById("btn");
const errorMsg = document.getElementById("error-msg");
const gallery = document.getElementById("gallery");

btn.addEventListener("click", getPhotos);

async function getPhotos() {
    const inputvalue = document.getElementById("input").value;

    if (inputvalue > 7 || inputvalue < 1) {
        errorMsg.style.display = "block";
        return;
    }

    imgs = "";

    try {
        btn.style.display = "none";
        const loading = `<img src="loading.svg"/>`;
        gallery.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputvalue}&page=${Math.floor(Math.random() * 1000)}&client_id=D4m3OB73CaggAzi8TQ-aI-1DnfahwF59RjkLhwKmksg`).then((res) => res.json().then((data) => {
            console.log(data);
            if (data) {
                data.forEach((pic) => {
                    console.log(pic.urls.small);
                    imgs += `
                    <img src=${pic.urls.small} alt="image"/>
                    `;
                    gallery.style.display = "block";
                    gallery.innerHTML = imgs;
                    btn.style.display = "block";
                    errorMsg.style.display = "none";
                });
            }
        }));
    } catch (error) {
        console.log(error);
        errorMsg.style.display = "block";
        errorMsg.innerText = "Something isn't right here";
        btn.style.display = "block";
        gallery.style.display = "none";
    }
}

