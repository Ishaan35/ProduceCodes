let DATA = {};

const readData = async () => {
  const response = await fetch("./data.json");
  return response.json();
};
const printData = async () => {
  DATA = await readData();
  console.log(DATA);
};
printData();

const getSuggestionsCategory = (e) => {
  let input = e.target.value;

  input = input.toLowerCase();

  if (input.length > 0) {
    let suggestions = [];
    for (let i = 0; i < DATA.data.length; i++) {
      if (DATA.data[i].category.toLowerCase().indexOf(input) == 0) {
        suggestions.push(DATA.data[i]);
      }
    }
    generateCategorySuggestionsHTML(suggestions);
  } else {
    generateCategorySuggestionsHTML([]);
  }
};

//search every element in all categories to find things that match
const getSuggestionsID = (e) => {
  let input = e.target.value;

  input = input.toLowerCase();

  if (input.length > 0) {
    let suggestions = [];
    for (let i = 0; i < DATA.data.length; i++) {
      let allIncluded = containsStringInElements(input, DATA.data[i]);
      for (let j = 0; j < allIncluded.length; j++) {
        suggestions.push(allIncluded[j]);
      }
    }
    generateIDSuggestionsHTML(suggestions);
  } else {
    generateIDSuggestionsHTML([]);
  }
};

//THESE GENERATE THE HTML
const generateCategorySuggestionsHTML = (list) => {
  const suggestedCategoriesDiv = document.getElementById("suggestedCategories");

  var child = suggestedCategoriesDiv.lastElementChild;
  while (child) {
    suggestedCategoriesDiv.removeChild(child);
    child = suggestedCategoriesDiv.lastElementChild;
  }

  for (let i = 0; i < list.length; i++) {
    const node = document.createElement("div");
    node.className = "categorySuggestion";
    node.innerHTML = list[i].category;
    node.addEventListener("click", () => {
      loadCategoryItems(list[i]);
    });

    suggestedCategoriesDiv.appendChild(node);
  }
};

//GENERATES DIVS FROM LIST. SIMILAR TO CATEGORES BUT WITHOUT THE ONCLICK LISTENER
const generateIDSuggestionsHTML = (list) => {
  const suggestedCategoriesDiv = document.getElementById("suggestedCategories");

  var child = suggestedCategoriesDiv.lastElementChild;
  while (child) {
    suggestedCategoriesDiv.removeChild(child);
    child = suggestedCategoriesDiv.lastElementChild;
  }

  for (let i = 0; i < list.length; i++) {
    const node = document.createElement("div");
    node.className = "categorySuggestion";
    node.innerHTML = list[i];
    suggestedCategoriesDiv.appendChild(node);
  }
};

//returns an array of all the strings of elements array of obj which have str in them
const containsStringInElements = (str, obj) => {
  let included = [];
  for (let i = 0; i < obj.elements.length; i++) {
    let temp = obj.elements[i].toLowerCase();
    if (temp.indexOf(str) >= 0) {
      included.push(obj.elements[i] + " (" + obj.category + ") \n");
    }
  }
  return included;
};

document
  .getElementById("categoryInput")
  .addEventListener("input", getSuggestionsCategory);

document.getElementById("idInput").addEventListener("input", getSuggestionsID);

function loadCategoryItems(category) {
  localStorage.setItem("category", JSON.stringify(category));
  window.location.href = "http://127.0.0.1:5500/categoryItems.html";
}
