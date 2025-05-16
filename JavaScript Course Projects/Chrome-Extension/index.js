let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// Load leads from localStorage
const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromStorage) {
  myLeads = leadsFromStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let lead of leads) {
    listItems += `
            <div class="link-card">
                <a href="${lead}" target="_blank">${lead}</a>
            </div>
        `;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  const inputValue = inputEl.value.trim();
  if (inputValue) {
    myLeads.push(inputValue);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});
