$(document).ready(function () {
    var searchForm = $('#searchForm'),
        search_term = $('#search_term'),
        error = $('#error'),
        showList = $('#showList'),
        show = $('#show'),
        homeLink = $('#homeLink'),
        footer = $('#footer');

    let requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows',
    };
    $.ajax(requestConfig).then((response) => {
        var li;
        for (let obj of response) {
            footer.css('position', 'fixed');
            li = `<li><a class="eachshow" href="${obj._links.self.href}">${obj.name}</a></li>`;
            showList.append(li);
        }
        showList.show();
    });

    $(document).on('submit', '#searchForm', function (event) {
        event.preventDefault();
        error.empty();
        error.hide();
        show.empty();
        show.hide();
        showList.empty();
        showList.empty();
        homeLink.show();

        let searchterm = search_term.val();
        searchterm = searchterm.trim();
        if (!searchterm) {
            let p = `<p class="error">Enter Valid searchTerm, It cannot be Empty Spaces.</p>`;
            footer.css('position', 'fixed');
            error.append(p);
            error.show();
        }
        let requestConfig = {
            method: 'GET',
            url: 'http://api.tvmaze.com/search/shows?q=' + searchterm,
        };
        $.ajax(requestConfig).then((response) => {
            if (searchterm && response.length === 0) {
                let p = `<p class="error">No results found.</p>`;
                footer.css('position', 'fixed');
                error.append(p);
                error.show();
            }
            let li;
            for (let obj of response) {
                li = `<li><a class="eachshow" href="${obj.show._links.self.href}">${obj.show.name}</a></li>`;
                footer.css('position', 'fixed');
                showList.append(li);
            }
            showList.show();
        });
    });
    $(document).on('click', 'ul#showList > li > a', function (event) {
        event.preventDefault();
        showList.hide();
        showList.empty();
        show.empty();
        homeLink.show();

        let hreflink = $(this).attr('href');
        let requestConfig = {
            method: 'GET',
            url: hreflink,
        };
        $.ajax(requestConfig).then((response) => {
            footer.css('position', 'sticky');
            if (response.name) {
                let h1 = `<h1>${response.name}</h1>`;
                show.append(h1);
            } else {
                let h1 = `<h1>N/A</h1>`;
                show.append(h1);
            }

            if (response.image) {
                let img = `<img src="${response.image.medium}">`;
                show.append(img);
            } else {
                let img = `<img src="../public/img/no_image.jpeg"></img>`;
                show.append(img);
            }
            let language = response.language
                ? `<dt>Language</dt><dd>${response.language}</dd>`
                : `<dt>Language</dt><dd>N/A</dd>`;
            let genres = `<dt>Genres</dt><dd><ul>`;
            if (response.genres && response.genres.length > 0) {
                $.each(response.genres, function (index, value) {
                    genres += `<li>${value}</li>`;
                });
                genres += `</ul></dd>`;
            } else {
                genres = `<dt>Genres</dt><dd>N/A</dd>`;
            }
            let average = '';
            if (!response.rating.average) {
                average = `<dt>Average Rating</dt><dd>N/A</dd>`;
            } else {
                average = `<dt>Average Rating</dt><dd>${response.rating.average}</dd>`;
            }
            console.log(average);
            let network = response.network
                ? `<dt>Network</dt><dd>${response.network.name}</dd>`
                : `<dt>Network</dt><dd>N/A</dd>`;
            let summary = response.summary
                ? `<dt>Summary</dt><dd>${response.summary}</dd>`
                : `<dt>Summary</dt><dd>N/A</dd>`;
            let dl = `<dl>${language} ${genres} ${average} ${network} ${summary}</dl>`;
            show.append($(dl));
            show.show();
        });
    });
});
