
const fetchAllIssue=async()=>{
    const res=await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data=await res.json();
    const details=data.data;
    // console.log(data.data);
    // console.log(data.data.length);
    totalIssueNumber(data.data.length);
    displayIssue(details);

}

const displayIssue=(data)=>{
    const cardContainer=document.getElementById("cardContainer");
    cardContainer.innerHTML = ""; 
    const allIssue=data;
    // const card=document.createElement("div");
    // card.innerHTML="";
    allIssue.forEach(x => {
        // console.log(x.title);
         let statusColor="";
         let labelsElement="";
         if(x.labels && x.labels.length > 0){
            x.labels.forEach(y => {
                // console.log(y);
                if(y==="bug"){
                    labelsElement+=`<button class="btn btn-soft btn-error rounded-2xl py-2 px-6 w-20 h-6"><i class="fa-sharp-duotone fa-solid fa-bug"></i> BUG</button>`;
                }
                else{
                    labelsElement+=`<button class="btn btn-soft btn-warning rounded-2xl py-2 px-6  h-6 "> <i class="fa-solid fa-life-ring"></i> ${y}</button>`;
                }

            })
        };
         if(x.status==="open"){
            statusColor="#1be614";
         }
         else if(x.status==="closed"){
             statusColor="#d00dea";
         }
            cardContainer.innerHTML+=`<div class="card bg-white rounded shadow-2xl pt-4 border-t-3 border-t-[${statusColor}] space-y-4 flex flex-col" onclick="modalBody(${x.id})">
                    <div class="card_top flex items-center justify-between px-3 mt-auto">
                            <div class="w-6 h-6 bg-transparent" id="cardStatus">
                                ${x.status==="open"?"<img src='assets/Open-Status.png' class='w-full h-full object-contain'>" :"<img src='assets/Closed- Status .png' class='w-full h-full object-contain'>"}
                            </div>

                            <div id="proirity">
                                ${x.priority==="high"?`<button class="btn btn-soft btn-error rounded-2xl py-2 px-6 w-20 h-6">HIGH</button>`:x.priority==="medium"?
                                    `<button class="btn btn-soft btn-warning rounded-2xl py-2 px-6 w-20 h-6">Medium</button>`:`<button class="btn btn-soft rounded-2xl py-2 px-6 w-20 h-6 text-gray-500">Low</button>`}
                            </div>
                    </div>
                    <div class="card_main px-3 space-y-2 mt-auto">
                        <h3 class="font-semibold text-[17px]" id="card_title">${x.title}</h3>
                        <p id="description" class="description-clamp">${x.description}</p>
                        <div class="flex gap-3">
                            ${labelsElement}
                        </div>
                    </div>
                    <div class="border-t border-gray-300 mt-auto"></div>
                    <div class="card_footer px-4 py-3 text-sm text-gray-500 mt-auto flex justify-between">
                        <div class="">
                            <p>#${x.id} by ${x.author}</p>
                            <p>Assignee: ${x.assignee?x.assignee:"Unassigned"}</p>
                        </div>
                        <div class="text-right">
                            <p>${formatDate(x.createdAt)}</p>
                            <p>Updated: ${formatDate(x.updatedAt)}</p>
                        </div>

                    </div>
              </div>`;
    });

}


const totalIssueNumber=(num)=>{
    const issueNumber=document.getElementById("issueNumber");
    issueNumber.innerText=num;
}

function formatDate(dateString){
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    return `${year}/${month}/${day}`;
}

const filterIssue = async (id)=>{
    const res=await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data=await res.json();
    const details=data.data;
    const filter=details.filter(x=>x.status===id);
    console.log(filter);
    totalIssueNumber(filter.length);
    displayIssue(filter);
}
function showIssue(id)
{
  if(id==="open")
  {
    filterIssue(id);
  }
  else if(id==="closed")
  {
    filterIssue(id);
  }
  else{
    fetchAllIssue();
  }
}

function toggleButton(id)
{   
    document.getElementById("all").classList.remove("btn-primary");
    document.getElementById("open").classList.remove("btn-primary");
    document.getElementById("closed").classList.remove("btn-primary");

    document.getElementById("all").classList.add("btn-outline");
    document.getElementById("open").classList.add("btn-outline");
    document.getElementById("closed").classList.add("btn-outline");

    const button=document.getElementById(id);
    showIssue(id);
    button.classList.remove("btn-outline");
    button.classList.add("btn-primary");
    
}

async function modalBody(id){
    const modalBody=document.getElementById("modal_body");
    modalBody.innerHTML="";
        const res=await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issue/'+id);
    const data=await res.json();
    const details=data.data;
    const x=details;
    console.log(details);
    my_modal_1.showModal();

         let statusColor="";
         let labelsElement="";
         if(x.labels && x.labels.length > 0){
            x.labels.forEach(y => {
                // console.log(y);
                if(y==="bug"){
                    labelsElement+=`<button class="btn btn-soft btn-error rounded-2xl py-2 px-6 w-20 h-6"><i class="fa-sharp-duotone fa-solid fa-bug"></i> BUG</button>`;
                }
                else{
                    labelsElement+=`<button class="btn btn-soft btn-warning rounded-2xl py-2 px-6  h-6 "> <i class="fa-solid fa-life-ring"></i> ${y}</button>`;
                }

            })
        };
         if(x.status==="open"){
            statusColor="#1be614";
         }
         else if(x.status==="closed"){
             statusColor="#d00dea";
         }

    
    modalBody.innerHTML=`
    <div class="space-y-3">
    <h3 class="font-semibold text-[17px] space-y-3" id="card_title">${x.title}</h3>
    
                    <div class="card_top flex items-center justify-between px-3 mt-auto">
                            <div class=" flex gap-2" id="cardStatus">
                                ${x.status==="open"?`<button class="btn  btn-success rounded-2xl py-2 px-6 w-20 h-6">Open</button>` :`<button class="btn  btn-primary rounded-2xl py-2 px-6 w-20 h-6">Close</button>`}

                                <ul class="list-disc pl-6 flex  justify-end items-end">
                                  <li class="text-[12px] text-gray-500">Opened by ${x.author}</li>
                                </ul>
                                 <ul class="list-disc pl-6 flex justify-end items-end">
                                  <li class="text-[12px] text-gray-500">${formatDate(x.createdAt)}</li>
                                </ul>
                            </div>
                    </div>
                    
                    <div class="card_main px-3 space-y-2 mt-auto py-3">
                        
                        
                        <div class="flex gap-3">
                            ${labelsElement}
                        </div>
                    </div>

                    <p id="description" class=" py-2">${x.description}</p>

                    <div class="card_footer px-4 py-3 text-sm bg-gray-100 mt-auto flex justify-between rounded-xl">
                        <div class="">
                            <p>Assignee:</p>
                            <p class="font-bold">${x.assignee?x.assignee:"Unassigned"}</p>
                        </div>
                        <div class="">
                            <p>Priority:</p>
                            <p class="py-2">
                                ${x.priority==="high"?`<button class="btn  btn-error rounded-2xl py-2 px-6 w-20 h-6">HIGH</button>`:x.priority==="medium"?
                                    `<button class="btn  btn-warning rounded-2xl py-2 px-6 w-20 h-6">Medium</button>`:`<button class="btn  rounded-2xl py-2 px-6 w-20 h-6 text-gray-500">Low</button>`}
                            </p>
                        </div>

                    </div>
              </div>`;
}

const search=async()=>{
    const searchText=document.getElementById("searchInput").value;
    // alert(searchText);
    // const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues?search=${searchInput}`);
    const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
    const data=await res.json();
    const details=data.data;
    // console.log(data.data);
    totalIssueNumber(data.data.length);
    displayIssue(details);
    searchInput.value="";
}

fetchAllIssue();