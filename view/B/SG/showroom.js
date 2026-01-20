var countryPrefix = localStorage.getItem('urlPrefix');

var showroomData = {
    "Living Room": [
        { sku: "LR001", name: "Sofa Set", imageURL: "../img/sofa.jpg", dimensions: "200x90x100cm", color: "Grey" }
    ],
    "Bedroom": [
        { sku: "BR001", name: "Queen Bed", imageURL: "../img/queen_bed.jpg", dimensions: "200x160x120cm", color: "White" }
    ]
};

document.addEventListener('DOMContentLoaded', function(){
    var buttons = document.querySelectorAll('#showroomCategories button');
    buttons.forEach(function(btn){
        btn.addEventListener('click', function(){
            loadCategory(btn.dataset.cat);
        });
    });
});

function loadCategory(cat) {
    document.getElementById('categoryTitle').innerText = cat;
    var itemsList = document.getElementById('showroomItems');
    itemsList.innerHTML = '';

    showroomData[cat].forEach(function(item){
        var li = document.createElement('li');
        li.innerHTML = `
            <a href="/B/${countryPrefix}/furnitureDetails.html?sku=${item.sku}">
                <img src="${item.imageURL}" style="width:150px"><br>
                ${item.name}
            </a>`;
        itemsList.appendChild(li);
    });
}
