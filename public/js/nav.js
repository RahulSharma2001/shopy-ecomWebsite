const createNav = () => {
    let nav = document.querySelector('.navbar1');


    nav.innerHTML = `
        <div class="nav1">
            <h1>SHOPIFY</h1>
            <div class="nav-items1">
                <div class="search1">
                    <input type="text" class="search-box1" placeholder="search brand, product">
                    <button class="search-btn1">search</button>
                </div>
               
               
                <a href="/signin.html" ><img  class="img1"   src="img/useri.png">  a</a>
                <a href="#"><img class="img1" src="https://indyme.com/wp-content/uploads/2020/11/shopping-cart-icon.png"></a>
            </div>
        </div>
        <ul class="links-container1">
            <li class="link-item1"><a href="#" class="link1">home</a></li>
            <li class="link-item1"><a href="#" class="link1">women</a></li>
            <li class="link-item1"><a href="#" class="link1">men</a></li>
            <li class="link-item1"><a href="#" class="link1">kids</a></li>
            <li class="link-item1"  id="assos1" onclick="assos_click()"><a href="#" class="link1">Electromics</a>
                 <ul class="assos_item1">
                    <li><a href="#">Mobile</a></li>
            <li><a href="#">Ipads</a></li>
            <li><a href="#">Laptops</a></li>
            <li><a href="#">Camera</a></li>
            <li><a href="#">Powerbanks</a></li>
            <li><a href="#">Headphones</a></li>
            <li><a href="#">Gaming</a></li>
            <li><a href="#">Tablets</a></li>
            <li><a href="#">TV</a></li>
                 </ul>
            
            </li>
        </ul>
    `;

}

createNav();
var flag = true;






function assos_click() {

    if (flag) {

        document.querySelector(".assos_item1").style.display = 'block';
        document.querySelector("#assos1").style.fontWeight = "bold";
        flag = false;


    } else {

        document.querySelector(".assos_item1").style.display = 'none';
        document.querySelector("#assos1").style.fontWeight = "normal";
        flag = true;


    }
}


