const setItems = () => {
  const allItemsInCategoryDiv = document.getElementById("allItemsInCategory");
  let data = JSON.parse(localStorage.getItem("category"));

  document.getElementById("Category").innerHTML = data.category;

  console.log(data);

  for (let i = 0; i < data.elements.length; i++) {
    const node = document.createElement("div");
    node.className = "categorySuggestion";
    node.innerHTML = data.elements[i];
    allItemsInCategoryDiv.append(node);
  }
};

setItems();
