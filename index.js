var ac_config = {
	input: undefined,
	table_container: undefined,
	table_identifier: undefined,
	tbody_identifier: undefined,
	thead_identifier: undefined,
	data_set: undefined,
};
var textNode,
	body_length = -1;
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined'
		? (module.exports = factory())
		: typeof define === 'function' && define.amd
		? define(factory)
		: (global.tinylib = factory());
})(this, function () {
	var tinylib = function (_input, _el, _dataset) {
		var obj = {};
		ac_config.table_container = _el;
		ac_config.input = _input;
		ac_config.data_set = _dataset;
		// body_length = _dataset.body.length;
		obj.createTable = () => {
			ac_config.table_identifier = document.createElement('TABLE');
			ac_config.table_identifier.style = 'background:white;border-spacing: 0; border-collapse: collapse; width: 100%;';
			console.log(ac_config);
			ac_config.table_container.style =
				'border:1px solid black;display:none;background:white;overflow-y: scroll;width:100%; height: 400px;position:absolute;z-index:10';
			ac_config.table_container.appendChild(ac_config.table_identifier);
		};

		obj.createHeaders = () => {
			ac_config.thead_identifier = document.createElement('THEAD');
			var create_tr = document.createElement('TR');

			ac_config.data_set.header.forEach((value) => {
				var th = document.createElement('th');
				th.style = 'position: sticky;top: 0;z-index: 100;background: green;';

				var cellText = document.createTextNode(value);
				th.appendChild(cellText);
				create_tr.appendChild(th);
			});

			ac_config.thead_identifier.appendChild(create_tr);

			ac_config.table_identifier.appendChild(ac_config.thead_identifier);
		};

		obj.createRows = (_func) => {
			ac_config.tbody_identifier = document.createElement('TBODY');
			//create rows
			//create headers

			ac_config.data_set.body.forEach((obj) => {
				console.log(obj);
				var create_tr = document.createElement('TR');

				ac_config.data_set.header.forEach((value) => {
					var td = document.createElement('td');
					td.onclick = (e) => {
						if (td.parentNode.tagName == 'TR') {
							// alert(e.target.parentNode.rowIndex - 1);
							_func(parseInt(e.target.parentNode.rowIndex - 1), '-', 'click');
							ac_config.table_container.style.display = 'none';
						}
					};
					var cellText = document.createTextNode(obj[value]);

					td.appendChild(cellText);
					create_tr.appendChild(td);
					ac_config.tbody_identifier.appendChild(create_tr);
				});
			});

			ac_config.table_identifier.appendChild(ac_config.tbody_identifier);
		};

		obj.filter = (isat_filter) => {
			ac_config.input.addEventListener('input', function () {
				var val = this.value;

				body_length = -1;

				filteredArray = ac_config.data_set.body.filter(function (x) {
					return isat_filter(x, val);

					// || (x.barcode || "").substr(0, val.length).toUpperCase() == val.toUpperCase()
				});
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
			obj.keyEvent((cursor, key, eventtype) => {
				obj.clearStyle();

				var tr = ac_config.tbody_identifier.getElementsByTagName('tr')[cursor];

				_fn(tr, cursor, key, eventtype);
			});

			obj.createRows((cursor, key, eventtype) => {
				obj.clearStyle();
				var tr = ac_config.tbody_identifier.getElementsByTagName('tr')[cursor];

				_fn(tr, cursor, key, eventtype);
			});
		};
		obj.keyEvent = (_func) => {
			ac_config.input.addEventListener('keydown', function (e) {
				if (e.which == 40) {
					var stop = setInterval(function () {
						//down key
						// alert(body_length);
						if (body_length < ac_config.data_set.body.length - 1) {
							body_length++;
						} else {
							body_length = ac_config.data_set.body.length - 1;
						}

						_func(body_length, 'up', 'keydown');

						var tr = ac_config.tbody_identifier.getElementsByTagName('tr')[body_length];
						var tableHeight = ac_config.table_container.offsetHeight;
						if (tableHeight < tr.offsetTop) {
							ac_config.table_container.scrollTop = tr.offsetTop - 30;
						}

						// console.log(body_length);
					}, 75);
					window.addEventListener('keyup', function () {
						clearInterval(stop);
						window.removeEventListener('keyup', arguments.callee);
					});
				} else if (e.keyCode == 38) {
					//up key

					var stop = setInterval(function () {
						if (body_length == 0) {
							body_length = 0;
						} else {
							body_length--;
						}
						var tr = ac_config.tbody_identifier.getElementsByTagName('tr')[body_length];

						ac_config.table_container.scrollTop = tr.offsetTop - 30;

						_func(body_length, 'down', 'keydown');
					}, 75);

					window.addEventListener('keyup', function () {
						clearInterval(stop);
						window.removeEventListener('keyup', arguments.callee);
					});
				} else if (e.keyCode == 13) {
					//enter key
					e.preventDefault();
				}
			});
		};

		// obj.setColor = (color) => {
		// 	myelement.style.color = color;
		// };

		obj.createTable();
		obj.createHeaders();
		// obj.createRows();
		obj.hide();
		obj.focus_blur();
		// obj.keyEvent((so) => {});
		return obj;
	};
	return tinylib;
});
