// loader function
const spinner = document.getElementById('loader');
const loader = isLoading => {
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

//Default View
const loadAiInfo = async (limit) => {
    loader(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const response = await fetch(url);
    const data = await response.json();
    displayAiInfo(data.data.tools, limit);

}

const displayAiInfo = (info, limit) => {
    const aiInfoContainer = document.getElementById('ai-info-container');
    aiInfoContainer.innerHTML = " ";
    const seeMore = document.getElementById('see-more');
    if (limit === 6) {
        info = info.slice(0, 6);
        seeMore.classList.remove('d-none');
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
                    <li>${aiInfo.features[2] ? aiInfo.features[2] : "More features are coming..."}</li>
                   
                 </ol>
                 <hr>
                  
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${aiInfo.name}</h5>
                        <p> <i class="fa-regular fa-calendar-days me-2"></i> ${aiInfo.published_in}</p>
                    </div>
                    <div>
                   
                    <i onClick="moreDetails('${aiInfo.id}')" id="more-details"class="fa-solid fa-arrow-right arrow-btn" data-bs-toggle="modal" data-bs-target="#detailsInfoModal"></i>   
                    
                   
                    </div>
                  </div>
                </div>
              </div>        
        `;

        aiInfoContainer.appendChild(aiDiv);
    });

    loader(false);
}

//Sorted View
const loadAiSortInfo = async () => {
    loader(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const response = await fetch(url);
    const data = await response.json();

    displayAiSortInfo(data.data.tools);

}

const displayAiSortInfo = (info) => {
    const aiInfoContainer = document.getElementById('ai-info-container');
    aiInfoContainer.innerHTML = " ";
    const cardsByDate = {};
    info.forEach(aiInfo => {
        if (!cardsByDate[aiInfo.published_in]) {
            cardsByDate[aiInfo.published_in] = [aiInfo];
        } else {
            cardsByDate[aiInfo.published_in].push(aiInfo);
        }
    });

    // Sort the dates in ascending order
    const sortedDates = Object.keys(cardsByDate).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
    });

    sortedDates.forEach(date => {
        const cards = cardsByDate[date];
        cards.forEach(card => {
            const aiDiv = document.createElement('div');
            aiDiv.classList.add('col');
            aiDiv.innerHTML = `
      <div class="card h-100 p-4">
        <img src="${card.image}" class="card-img-top img-fluid h-100" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <ol>
            <li>${card.features[0]}</li>
            <li>${card.features[1]}</li>
            <li>${card.features[2] ? card.features[2] : "More features are coming..."}</li>
          </ol>
          <hr>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5>${card.name}</h5>
              <p> <i class="fa-regular fa-calendar-days me-2"></i> ${card.published_in}</p>
            </div>
            <div>
              <i onClick="moreDetails('${card.id}')" id="more-details"class="fa-solid fa-arrow-right arrow-btn" data-bs-toggle="modal" data-bs-target="#detailsInfoModal"></i>      
            </div>
          </div>
        </div>
      </div>
    `;
            aiInfoContainer.appendChild(aiDiv);
        });
    });

    loader(false);

}


//Sort Data Load
document.getElementById('sort-btn').addEventListener('click', function () {
    const aiInfoContainer = document.getElementById('ai-info-container');
    aiInfoContainer.innerHTML = " ";
    const seeMore = document.getElementById('see-more');
    seeMore.classList.add('d-none');
    loadAiSortInfo();
})

//Limited data load
loadAiInfo(6);

//All data load
document.getElementById('see-more').addEventListener('click', function () {
    loadAiInfo();
    this.classList.add('d-none');
});

// More details button

const moreInfo = (allData) => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = " ";
    const div = document.createElement('div');
    div.classList.add('row')
    div.innerHTML = ` <div class="col-md-6 modal-info">
    <h5>${allData.data.description}</h5>
    <div class="d-flex flex-column flex-lg-row gap-2 ">
        <div class="modal-price text-success">
        <h6>${allData.data.pricing[0].price ? allData.data.pricing[0].price : "Free of Cost"}</h6>
        <h6>${allData.data.pricing[0].plan}</h6>
        </div>
        <div  class="modal-price text-warning">
        <h6>${allData.data.pricing[1].price ? allData.data.pricing[1].price : "Free of Cost"}</h6>
        <h6>${allData.data.pricing[1].plan}</h6>
        </div>
        <div class="modal-price text-danger">
        <h6>${allData.data.pricing[1].price ? allData.data.pricing[1].price : "Free of Cost"}</h6>
        <h6>${allData.data.pricing[2].plan}</h6>
        </div>
        
    </div>

    <div class="d-flex flex-column flex-lg-row mt-3">

        <div> 
            <h5> Features </h5>
            <ul>
                <li> ${allData.data.features[1].feature_name}</li>
                <li> ${allData.data.features[2].feature_name}</li>
                <li> ${allData.data.features[3].feature_name}</li>
            </ul>
        </div>

        <div> 
        <h5> Integrations </h5>
        <ul>
            <li> ${allData.data.integrations[0] ? allData.data.integrations[0] : "No Data Found"}</li>
            <li> ${allData.data.integrations[1] ? allData.data.integrations[1] : "No Data Found"}</li>
            <li> ${allData.data.integrations[2] ? allData.data.integrations[2] : "No Data Found"}</li>
            
        </ul>
        </div>
    </div>
   
    </div>

    <div class="col-md-6  p-3 rounded-4 border border-secondary-subtle">
        <div class="h-50 rounded" style="background-image: url(${allData.data.image_link[0]}); background-size: cover; background-position: center;">
            <p class="accuracy text-center text-bg-danger w-50 rounded-3 p-2" 
            ${!allData.data.accuracy.score ? 'style="display:none;"' : ''}>
            ${allData.data.accuracy.score ? allData.data.accuracy.score * 100 + '%' : ''} accuracy
            </p>
        </div>
  
        <div class="mt-3 mb-5"> 
            <h5> ${allData.data.input_output_examples[0].input} </h5>
            <p> ${allData.data.input_output_examples[0].output ? allData.data.input_output_examples[0].output : "No! Not Yet! Take a break!!!"} </p>
        </div>
    
    </div>`;
    modalContainer.appendChild(div);

}

//
const moreDetails = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const allData = await res.json();
    console.log(allData.data);
    moreInfo(allData);
}
