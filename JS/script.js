const loadAiInfo = async (limit) => {
    loader(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const response = await fetch(url);
    const data = await response.json();
    displayAiInfo(data.data.tools, limit);
    //console.log(data.data.tools.length);

}
///* 
const displayAiInfo = (info, limit) => {
    const aiInfoContainer = document.getElementById('ai-info-container');
    aiInfoContainer.innerHTML = " ";
    if (limit === 6) {
        info = info.slice(0, 6);
    }

    info.forEach(aiInfo => {

        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
        <div class="card h-100 p-4">
                <img src="${aiInfo.image}" class="card-img-top img-fluid h-100" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Features</h5>
                  <ol>
                    <li>${aiInfo.features[0]}</li>
                    <li>${aiInfo.features[1]}</li>
                    <li>${aiInfo.features[2]}</li>
                   
                 </ol>
                 <hr>
                  
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${aiInfo.name}</h5>
                        <p> <i class="fa-regular fa-calendar-days me-2"></i> ${aiInfo.published_in}</p>
                    </div>
                    <div>
                    <i class="fa-solid fa-arrow-right arrow-btn"></i>   
                    </div>
                  </div>
                </div>
              </div>        
        `;

        aiInfoContainer.appendChild(aiDiv);
    });

    loader(false);
}

//Limited Data Show


// See more



const spinner = document.getElementById('loader');
const loader = isLoading => {
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

//*/

loadAiInfo(6);

document.getElementById('see-more').addEventListener('click', function () {
    loadAiInfo();
    this.classList.add('d-none');
})