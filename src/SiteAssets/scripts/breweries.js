// import axios from './axios/dist/axios.js';
// import $ from './jquery/dist/jquery.js'


// import _ from 'lodash';

const restHeaders = {
    method: "GET",
    credentials: "include",
    mode: "no-cors",
    headers: {
        "Accept": "application/json; odata=verbose"
    }
};

getBreweries();

function getBreweries() {
    axios.get(`https://api.openbrewerydb.org/breweries/search?query=Maine`, restHeaders)
    .then(resp => {
        let _data = resp.data;
        let _state = _data.filter(m => {
            return m.state == "Maine"
        })
        console.log(_state)
        _state.forEach(n => {
			let _city = n.city;
            let _dropdownItem = $(`<div class="dropdown-item">${_city}</div>`)
			$(".dropdown-cities").append(_dropdownItem)

			let _breweryType = n.brewery_type,
				_uppCase = _breweryType.charAt(0).toUpperCase() + _breweryType.slice(1)

			let _tile = $(`
				<div class="tile is-4 is-parent mix">
					<article class="tile is-child is-primary box">
						<p class="title tile-breweryname"><a href="${n.website_url}" target="_blank">${n.name}</a></p>
						<hr>
						<p class="subtitle tile-brewtype"><strong>Type:</strong> ${_uppCase}</p>
						<p class="subtitle tile-address"><strong>Address:</strong> ${n.street} - ${n.city}</p>
					</article>
				</div>
			`)

			$(".is-ancestor").append(_tile)

			$(_tile)
				.attr("data-filter", "filter") // prevents Mixitup console err message
				.attr("data-brew-name", n.name) // sort by A-Z
				.addClass(_uppCase)

			


		}) // _state.forEach
		
		let containerEl = document.querySelector('#filter-container'),
				sortToggle = document.querySelector('.sort-btn'),
				sortOrder = 'data-brew-name:asc', 
				mixer;

			if (containerEl) {
				mixer = mixitup(containerEl, {
					load: {
						sort: 'filter'
					},
					controls: {
						toggleLogic: 'and'
					},
					selectors: {
						control: "[data-mixitup-control]"
					},
					animation: {
						easing: 'ease-in-out'
						// duration: 500
					}
				})
			}

			sortToggle.addEventListener('click', function() {
				switch(sortOrder) {
					case 'brew-name:asc':
						sortOrder = 'brew-name:desc';
						break;
					case 'brew-name:desc':
						sortOrder = 'brew-name:asc';
						break;
				}
			
				mixer.sort(sortOrder);
			});
    })
}

