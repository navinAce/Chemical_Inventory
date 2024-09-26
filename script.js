//chemicals data

const chemicals = [
  {
    name: "Ammonium Persulfate",
    vendor: "LG Chem",
    density: "3525.92",
    viscosity: "60.63",
    packaging: "Bag",
    packSize: "100",
    unit: "kg",
    quantity: "6495.18",
  },
  {
    name: "Caustic Potash",
    vendor: "Formosa",
    density: "3172.15",
    viscosity: "48.22",
    packaging: "Bag",
    packSize: "100",
    unit: "kg",
    quantity: "8751.9",
  },
  {
    name: "Dimethylaminopropylamino",
    vendor: "LG Chem",
    density: "8435.37",
    viscosity: "12.62",
    packaging: "Barrel",
    packSize: "75",
    unit: "L",
    quantity: "5964.61",
  },
  {
    name: "Mono Ammonium Phosphate",
    vendor: "Sinopec",
    density: "1597.65",
    viscosity: "76.51",
    packaging: "Bag",
    packSize: "105",
    unit: "kg",
    quantity: "8183.73",
  },
  {
    name: "Ferric Nitrate",
    vendor: "DowDuPont",
    density: "364.04",
    viscosity: "14.9",
    packaging: "Bag",
    packSize: "105",
    unit: "kg",
    quantity: "4154.33",
  },
  {
    name: "n-Pentane",
    vendor: "Sinopec",
    density: "4535.26",
    viscosity: "66.76",
    packaging: "N/A",
    packSize: "200",
    unit: "t",
    quantity: "6272.34",
  },
  {
    name: "Glycol Ether PM",
    vendor: "LG Chem",
    density: "6495.18",
    viscosity: "72.12",
    packaging: "Bag",
    packSize: "250",
    unit: "kg",
    quantity: "8749.54",
  },
  {
    name: "Sodium Hydroxide",
    vendor: "BASF",
    density: "2135",
    viscosity: "15.2",
    packaging: "Drum",
    packSize: "200",
    unit: "kg",
    quantity: "3854.2",
  },
];

// Append the chemical data to the table

function appendChemicalToTable(chemical, id) {
  const tableBody = document.querySelector("#tableData");

  let row = document.createElement("tr");
  let checkboxCell = document.createElement("td");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = id;
  checkboxCell.appendChild(checkbox);
  let idCell = document.createElement("td");
  idCell.textContent = id + 1;
  let name = document.createElement("td");
  let vendor = document.createElement("td");
  let density = document.createElement("td");
  let viscosity = document.createElement("td");
  let packaging = document.createElement("td");
  let packSize = document.createElement("td");
  let unit = document.createElement("td");
  let quantity = document.createElement("td");

  name.textContent = chemical.name;
  vendor.textContent = chemical.vendor;
  density.textContent = chemical.density;
  viscosity.textContent = chemical.viscosity;
  packaging.textContent = chemical.packaging;
  packSize.textContent = chemical.packSize;
  unit.textContent = chemical.unit;
  quantity.textContent = chemical.quantity;

  row.appendChild(checkboxCell);
  row.appendChild(idCell); 
  row.appendChild(name);
  row.appendChild(vendor);
  row.appendChild(density);
  row.appendChild(viscosity);
  row.appendChild(packaging);
  row.appendChild(packSize);
  row.appendChild(unit);
  row.appendChild(quantity);

  tableBody.appendChild(row);
}

// Append all the chemicals to the table

chemicals.forEach((chemical, index) => appendChemicalToTable(chemical, index));

//add new chemical icon

function addItemForm() {
  let addNewChemicalForm = document.querySelector("#addNewChemicalForm");
  let addButton = document.querySelector("#addItem");
  if (addNewChemicalForm) {
    if (addNewChemicalForm.style.display === "block") {
      addNewChemicalForm.style.display = "none";
      addButton.textContent = "add";
      addButton.style.color = "#F0EAD6";
    } else {
      addNewChemicalForm.style.display = "block";
      addButton.textContent = "close";
      addButton.style.color = "red";
    }
  }
}

// Add new chemical to the array and the reloadtable

function addNewChemical(newChemical) {
  
  chemicals.push(newChemical);
  updateEmptyMessage();
  appendChemicalToTable(newChemical,chemicals.length - 1);
}

// Select all checkbox

let isAllSelected = false;
function toggleSelectAll() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = !isAllSelected;
  });
  isAllSelected = !isAllSelected;
}

// Delete button listener

document
  .querySelector("#deleteButton")
  .addEventListener("click", deleteSelectedChemicals);

// Delete selected chemicals

function deleteSelectedChemicals() {
  const tableBody = document.querySelector("#tableData");
  const checkboxes = tableBody.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  // Collect the indices of selected chemicals
  const indicesToRemove = [];
  checkboxes.forEach((checkbox) => {
    indicesToRemove.push(parseInt(checkbox.value)); 
  });

  // Sort the indices in descending order so we can remove from the end of the array
  indicesToRemove.sort((a, b) => b - a);

  // Remove the selected rows from both the DOM and the array
  indicesToRemove.forEach((index) => {
    chemicals.splice(index, 1); 
    tableBody.deleteRow(index); 
  });
  rebuildTable();
  updateEmptyMessage();
}

// Rebuild the table to ensure the IDs and checkboxes remain accurate

function rebuildTable() {
  const tableBody = document.querySelector("#tableData");
  tableBody.innerHTML = `
        <tr id="emptyMessageRow" style="display: none;">
            <td colspan="10" style="text-align: center; color: #888;">
                Add chemicals data to see them listed here.
            </td>
        </tr>`; 

  chemicals.forEach((chemical, index) => {
    appendChemicalToTable(chemical, index);
  });
}

// handle form submission

const fromHandle = document.querySelector("#addNewChemicalForm");
fromHandle.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(fromHandle);
  const newChemical = {};

  for (const [key, value] of formData.entries()) {
    newChemical[key] = value;
  }
  addNewChemical(newChemical);

  fromHandle.reset();
});

// Sort the chemicals by name

let isNameAscending = true; 
const nameHeader = document.querySelector("th:nth-child(3)"); 
nameHeader.addEventListener("click", () => {
  sortChemicalsByName(isNameAscending);
  rebuildTable();
  isNameAscending = !isNameAscending; 
});

function sortChemicalsByName(isAscending) {
  chemicals.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (isAscending) {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameB < nameA ? -1 : nameB > nameA ? 1 : 0;
    }
  });
}

// refresh button

document.querySelector("#refreshAll").addEventListener("click", function () {
  location.reload();
})

// empty message

function updateEmptyMessage() {
  const emptyMessageRow = document.getElementById('emptyMessageRow');

  if (emptyMessageRow) {
      emptyMessageRow.style.display = chemicals.length === 0 ? 'table-row' : 'none'; 
  }
}
