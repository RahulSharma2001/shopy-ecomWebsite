const createFooter = () => {
    let footer = document.querySelector('.footer');

    footer.innerHTML = `<div class="footer-content">
   <h1>Shopify Pvt Limited</h1>
    <div class="footer-ul-container">
        <ul class="category">
            <li class="category-title">Clothing</li>
            <li><a href="#" class="footer-link">t-shirts</a></li>
            <li><a href="#" class="footer-link">sweatshirts</a></li>
            <li><a href="#" class="footer-link">shirts</a></li>
            <li><a href="#" class="footer-link">jeans</a></li>
            <li><a href="#" class="footer-link">trousers</a></li>
            <li><a href="#" class="footer-link">shoes</a></li>
            <li><a href="#" class="footer-link">casuals</a></li>
            <li><a href="#" class="footer-link">formals</a></li>
            <li><a href="#" class="footer-link">sports</a></li>
            <li><a href="#" class="footer-link">t-shirts</a></li>
        </ul>
        <ul class="category">
            <li class="category-title">Electronic Products</li>
            <li><a href="#" class="footer-link">Mobile</a></li>
            <li><a href="#" class="footer-link">Ipads</a></li>
            <li><a href="#" class="footer-link">Laptops</a></li>
            <li><a href="#" class="footer-link">Camera</a></li>
            <li><a href="#" class="footer-link">Powerbanks</a></li>
            <li><a href="#" class="footer-link">Headphones</a></li>
            <li><a href="#" class="footer-link">Gaming</a></li>
            <li><a href="#" class="footer-link">Tablets</a></li>
            <li><a href="#" class="footer-link">TV</a></li>
            <li><a href="#" class="footer-link">DTH</a></li>
        </ul>
        
    </div>
</div>
<p class="footer-title">about company</p>
<p class="info">Best Online shopping site</p>
        <p class="info">support emails - help@shopify.com,
            customersupport@shopify.com</p>
        <p class="info">telephone - 1234567890</p>
        <div class="footer-social-container">
            <div>
                <a href="#" class="social-link">terms & services</a>
                <a href="#" class="social-link">privacy page</a>
            </div>
            <div>
                <a href="#" class="social-link">instagram</a>
                <a href="#" class="social-link">facebook</a>
                <a href="#" class="social-link">twitter</a>
            </div>
        </div>
        <p class="footer-credit"> &copy; Rahul & Team</p>`;
}

createFooter();