$(document).ready(function() {
    let bookData = []; 

    // Loading XML and Converting to JSON Format
    $.ajax({
        type: "GET",
        url: "books.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('book').each(function() {
                // Converting XML nodes to a JSON Object
                let book = {
                    title: $(this).find('title').text().trim(),
                    author: $(this).find('author').text().trim(),
                    genre: $(this).find('genre').text().trim(),
                    price: parseFloat($(this).find('price').text().trim()),
                    date: $(this).find('publish_date').text().trim()
                };
                bookData.push(book);
            });
            
            renderTable(bookData);
        },
        error: function() {
            console.error("Error loading XML. Use a local server!");
        }
    });

    function renderTable(data) {
        const tbody = $('#bookTable tbody');
        tbody.empty();

        if (data.length === 0) {
            tbody.append('<tr><td colspan="5" style="text-align:center;">No matches found.</td></tr>');
            return;
        }

        data.forEach(book => {
            tbody.append(`
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>&#8377;${book.price.toFixed(2)}</td>
                    <td>${book.date}</td>
                </tr>
            `);
        });
    }

    // Apply All Filters
    $('#applyFiltersBtn').on('click', function() {
        const titleQuery = $('#titleFilter').val().toLowerCase();
        const genreQuery = $('#genreFilter').val();
        const priceQuery = parseFloat($('#priceFilter').val()) || Infinity;
        const authorQuery = $('#authorFilter').val().toLowerCase();

        const filteredResults = bookData.filter(book => {
            const matchesTitle = book.title.toLowerCase().includes(titleQuery);
            const matchesGenre = (genreQuery === "All" || book.genre === genreQuery);
            const matchesPrice = book.price <= priceQuery;
            const matchesAuthor = book.author.toLowerCase().includes(authorQuery);
            
            return matchesTitle && matchesGenre && matchesPrice && matchesAuthor;
        });

        renderTable(filteredResults);
    });
});