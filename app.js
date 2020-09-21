var ac_config = {
	input: undefined,
	table_container: undefined,
	table_identifier: undefined,
	tbody_identifier: undefined,
	thead_identifier: undefined,
	data_set: undefined,
	filteredArray: [],
};
var textNode,
	body_length = -1;
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined'
		? (module.exports = factory())
		: typeof define === 'function' && define.amd
		? define(factory)
		: (global.aQ = factory());
})(this, function () {
	var aQ = function (_input, _el, _dataset, options = {}) {
		const {
			table_class = 'table_autocompleteQ',
			tbody_class = 'tbody_autocompleteQ',
			td_class = 'td_autocompleteQ',
			tr_td_class = 'tr_td_autocompleteQ',
			thead_class = 'thead_autocompleteQ',
			th_class = 'th_autocompleteQ',
			tr_th_class = 'tr_th_autocompleteQ',
			default_style = true,
		} = options;
		var obj = {};
		ac_config.table_container = _el;
		ac_config.input = _input;
		ac_config.data_set = _dataset;
		// body_length = _dataset.body.length;
		obj.createTable = () => {
			if (!ac_config.table_identifier)
				(ac_config.table_identifier = document.createElement('TABLE')),
					ac_config.table_identifier.classList.add(table_class);
			if (default_style)
				ac_config.table_identifier.style =
					'background:white;border-spacing: 0; border-collapse: collapse; width: 100%;';
			// console.log(ac_config);
			if (default_style)
				ac_config.table_container.style =
					'box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border:1px solid gray;background:white;overflow-y: scroll;width:100%;max-height:400px; position:absolute;z-index:10';
			ac_config.table_container.appendChild(ac_config.table_identifier);
		};

		obj.createHeaders = () => {
			if (!ac_config.thead_identifier)
				(ac_config.thead_identifier = document.createElement('THEAD')),
					ac_config.thead_identifier.classList.add(thead_class);
			var create_tr = document.createElement('TR');

			create_tr.classList.add(tr_th_class);
			ac_config.data_set.header.forEach((value) => {
				var th = document.createElement('th');
				th.classList.add(th_class);
				th.style = 'position: sticky;top: 0;z-index: 100;background: green;';

				var cellText = document.createTextNode(value);
				th.appendChild(cellText);
				create_tr.appendChild(th);
			});

			ac_config.thead_identifier.appendChild(create_tr);

			ac_config.table_identifier.appendChild(ac_config.thead_identifier);
		};

		obj.createRows = (_func) => {
			if (ac_config.tbody_identifier) {
				ac_config.tbody_identifier.innerHTML = '';
				// alert('update');
			}
			if (!ac_config.tbody_identifier)
				(ac_config.tbody_identifier = document.createElement('TBODY')),
					ac_config.tbody_identifier.classList.add(tbody_class);

			//create rows
			//create headers
			var isActive = true;
			// console.log('created');
			// console.log(ac_config.filteredArray);
			ac_config.filteredArray.forEach((obj_) => {
				// console.log(obj);
				var create_tr = document.createElement('TR');
				create_tr.classList.add(tr_td_class);
				if (isActive) create_tr.classList.add('activeRow'), (isActive = false);
				ac_config.data_set.header.forEach((value) => {
					var td = document.createElement('td');
					td.classList.add(td_class);
					td.onclick = (e) => {
						if (td.parentNode.tagName == 'TR') {
							// alert(e.target.parentNode.rowIndex - 1);
							var ischeckActive = document.querySelector('.activeRow');
							if (ischeckActive) ischeckActive.classList.remove('activeRow');
							e.target.parentNode.classList.add('activeRow');
							ac_config.input.focus();

							_func(parseInt(e.target.parentNode.rowIndex - 1), '-', 'click');
							// obj.hide();
						}
					};
					var cellText = document.createTextNode(obj_[value]);

					td.appendChild(cellText);
					create_tr.appendChild(td);
					ac_config.tbody_identifier.appendChild(create_tr);
				});
			});

			ac_config.table_identifier.appendChild(ac_config.tbody_identifier);
		};

		obj.filter = (isat_filter) => {
			ac_config.input.addEventListener('input', function (e) {
				var val = e.target.value;
				obj.show();
				body_length = -1;
				ac_config.filteredArray = ac_config.data_set.body.filter(function (x) {
					return isat_filter(x, val);
				});
				// console.log('filter data');
				// console.log(ac_config.filteredArray);
				obj.createRows(() => {});
			});
		};
		obj.hide = () => {
			ac_config.table_container.style.display = 'none';
		};

		obj.show = () => {
			ac_config.table_container.style.display = 'block';
		};

		obj.focus_blur = () => {
			ac_config.input.onfocus = () => {
				obj.show();
			};

			window.addEventListener('click', function (e) {
				if (!ac_config.input.contains(e.target)) {
					if (ac_config.table_container.contains(e.target)) {
						obj.show();
					} else {
						obj.hide();
					}
				}
			});
		};
		obj.clearStyle = () => {
			[...ac_config.tbody_identifier.getElementsByTagName('tr')].forEach((el) => {
				el.style.background = '';
			});
		};
		obj.event = (_fn) => {
			//keyboard event
			obj.keyEvent((cursor, key, eventtype) => {
				obj.clearStyle();
				// alert('0');
				var tr = ac_config.tbody_identifier.getElementsByTagName('tr')[cursor];

				_fn(ac_config.filteredArray[cursor], ac_config.input, tr, cursor, key, eventtype);
				obj.hide();
			});

			ac_config.input.addEventListener('input', function (e) {
				obj.createRows((cursor, key, eventtype) => {
					obj.clearStyle();
					var tr = ac_config.tbody_identifier.getElementsByTagName('tr')[cursor];
					// alert(cursor);
					_fn(ac_config.filteredArray[cursor], ac_config.input, tr, cursor, key, eventtype);
				});
			});
		};

		obj.selectRow = (newrow) => {
			var oldRow = document.querySelector('.activeRow');
			if (oldRow) oldRow.classList.remove('activeRow');
			newrow.classList.add('activeRow');

			ac_config.table_container.scrollTop = newrow.offsetTop - 350;
		};

		obj.keyEvent = (_func) => {
			var initrow;
			ac_config.input.addEventListener('keydown', function (e) {
				if (e.which == 40) {
					e.preventDefault();

					initrow = document.querySelector('.activeRow');
					if (initrow) if (initrow.nextElementSibling) obj.selectRow(initrow.nextElementSibling);
					// _func(parseInt(initrow.nextElementSibling.rowIndex - 1), 'down', 'keydown');
				} else if (e.keyCode == 38) {
					e.preventDefault();

					//up key

					initrow = document.querySelector('.activeRow');
					if (initrow) if (initrow.previousElementSibling) obj.selectRow(initrow.previousElementSibling);
					// _func(parseInt(initrow.previousElementSibling.rowIndex - 1), 'up', 'keydown');
				} else if (e.keyCode == 13) {
					initrow = document.querySelector('.activeRow');
					if (initrow) _func(parseInt(initrow.rowIndex - 1), 'enter', 'keydown');

					// alert(initrow.rowIndex - 1);
				}
			});
		};

		obj.createTable();
		obj.createHeaders();
		obj.hide();
		obj.focus_blur();
		// obj.keyEvent((so) => {});
		return obj;
	};
	return aQ;
});
