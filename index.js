// Fetching All Data using API
let trimedData = [];
let limit = 6;
const handelCategory = async () => {
    try{
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    //console.log(data.data);
    const tabContainer = document.getElementById('tab-container');
    const trimedData = data.data;
    trimedData.forEach(category => {

        //console.log(category.category_id);
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="handelLoadMedia('${category.category_id}')"
        class="tab btn categoryButton">${category.category}</button>
        `;
        
        tabContainer.appendChild(div);
    });

    // Get all the buttons into a node list
let buttons = document.querySelectorAll(".categoryButton");

// Set an event handler on the document so that when
// any element is clicked, the event will bubble up to it
document.addEventListener("click", function(evt){
  // Check to see if it was a button that was clicked
  if(evt.target.classList.contains("categoryButton")){

    // Loop over all the buttons & remove the active class
    buttons.forEach(function(button){
      button.classList.remove("active");
    });
    // Make the clicked button have the active class
    evt.target.classList.add("active");
    
  }
});

handelLoadMedia('1000');
toggleLoadingSpinner(true);
    }catch(error){
        console.log(error);
    }

}

// const sortByView = () => {
//     trimedData.others.views.sort(function(a,b){
//        return  b-a;
//     });
//     handelLoadMedia();
// }

//Sorting data by Date
// document
//   .getElementById("sortByView")
//   .addEventListener("click", sortByView);


const handelLoadMedia = async (categoryId) => {
    //console.log(categoryId);
    // if(categoryId === empty){
    //     console.log("No Data");
    // }else{

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const trimedData = data.data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = "";
    
    //console.log("Hello",data);
    trimedData.forEach(media => {
        //console.log("NAme",media.title);
       const postedTime = convertMinutesToHoursAndMinutes(media.others.posted_date);
        const div = document.createElement("div");
        // const sortByView = document.getElementById('sortByView');
        // const getViews = trimedData.others.views;
        // sortByView.addEventListener('click', function(getViews){
           
        //     getViews.sort(function(a,b){return b-a});
        // })
        
        div.innerHTML = `
            <div class="card w-72 bg-base-100">
                    <figure><img class="rounded-2xl w-96 h-48" src="${media.thumbnail}" alt="Shoes" /></figure>
                    <p class="posted-time">${postedTime.hours}hrs ${postedTime.minutes} min ago</p>
                    <div class="card-body">
                      <h2 class="card-title">
                            <img class="rounded-full w-10 h-10" src="${media.authors[0].profile_picture}" />
                            <span class="">${media.title}</span>
                        </h2>
                       <div class="ml-12">
                        <p><span class="text-gray-500">${media.authors[0].profile_name}</span>
                        <span>${(media.authors[0].verified === true) ? ' <i class="fa-solid fa-certificate text-[#2568EF]"></i>' : "" } </span>
                          </p>
                         <p class="text-gray-500">${media.others.views} views</p>
                        
                        
                       </div> 

                    </div>
                  </div>
        `;
        cardContainer.appendChild(div);
        
    });
    toggleLoadingSpinner(false);
//}

}


handelCategory();
//handelLoadMedia();

function convertMinutesToHoursAndMinutes(totalMinutes) {
    // Calculate hours and minutes
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    //console.log(hours, minutes);
    return {
        hours: hours,
        minutes: minutes
    };
    
}

// Toggle Spinner
  const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}
