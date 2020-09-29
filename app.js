/*eslint-disable*/
// var moment = require("moment");
var filteredArray = [];
(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? (module.exports = factory())
        : typeof define === "function" && define.amd
        ? define(factory)
        : (global.aQ = factory());
})(this, function() {
    // alert("trig");

    var aQ = function(_input, _el, _dataset, options = {}) {
        var ac_config = {
            input: undefined,
            table_container: undefined,
            table_identifier: undefined,
            tbody_identifier: undefined,
            thead_identifier: undefined,
            data_set: undefined,
            filteredArray: []
        };
        const {
            table_class = "table_autocompleteQ",
            tbody_class = "tbody_autocompleteQ",
            td_class = "td_autocompleteQ",
            tr_td_class = "tr_td_autocompleteQ",
            thead_class = "thead_autocompleteQ",
            th_class = "th_autocompleteQ",
            tr_th_class = "tr_th_autocompleteQ",
            default_style = true,
            activeRow = "activeRow"
        } = options;

        var obj = {};
        ac_config.table_container = _el;
        ac_config.input = _input;
        if (_dataset.header.length == 0) {
            if (_dataset.body[0])
                _dataset.header = Object.keys(_dataset.body[0]);
        }
        ac_config.data_set = _dataset;
        // console.log(ac_config.data_set);
        // body_length = _dataset.body.length;
        obj.createTable = () => {
            ac_config.table_container.innerHTML = "";
            if (!ac_config.table_identifier)
                (ac_config.table_identifier = document.createElement("TABLE")),
                    ac_config.table_identifier.classList.add(table_class);
            if (default_style)
                ac_config.table_identifier.style =
                    "background:white;border-spacing: 0; border-collapse: collapse; width: 100%;";
            // console.log(ac_config);
            if (default_style)
                ac_config.table_container.style =
                    "box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border:1px solid gray;background:white;overflow-y: scroll;width:100%;max-height:400px;";
            ac_config.table_container.appendChild(ac_config.table_identifier);
        };

        obj.createHeaders = () => {
            if (!ac_config.thead_identifier)
                (ac_config.thead_identifier = document.createElement("THEAD")),
                    ac_config.thead_identifier.classList.add(thead_class);
            ac_config.thead_identifier.innerHTML = "";
            var create_tr = document.createElement("TR");

            create_tr.classList.add(tr_th_class);
            ac_config.data_set.header.forEach(value => {
                var th = document.createElement("th");
                th.classList.add(th_class);
                th.style =
                    "position: sticky;top: 0;z-index: 100;background: green;text-align:center";

                var cellText = document.createTextNode(value);
                th.appendChild(cellText);
                create_tr.appendChild(th);
            });

            ac_config.thead_identifier.appendChild(create_tr);

            ac_config.table_identifier.appendChild(ac_config.thead_identifier);
        };

        obj.createRows = _func => {
            if (ac_config.tbody_identifier) {
                ac_config.tbody_identifier.innerHTML = "";
                // alert('update');
            }
            if (!ac_config.tbody_identifier)
                (ac_config.tbody_identifier = document.createElement("TBODY")),
                    ac_config.tbody_identifier.classList.add(tbody_class);

            //create rows
            //create headers
            var isActive = true;
            // console.log('created');
            // console.log(filteredArray);

            filteredArray.forEach(obj_ => {
                // console.log(obj);
                var create_tr = document.createElement("TR");
                create_tr.classList.add(tr_td_class);
                // var isactiveRow = document.querySelector("." + activeRow);
                // if (isactiveRow) isactiveRow.classList.remove(activeRow);
                if (isActive)
                    create_tr.classList.add(activeRow), (isActive = false);
                ac_config.data_set.header.forEach(value => {
                    var td = document.createElement("td");
                    td.classList.add(td_class);
                    td.onclick = e => {
                        if (td.parentNode.tagName == "TR") {
                            // alert(e.target.parentNode.rowIndex - 1);
                            var ischeckActive = document.querySelector(
                                "." + activeRow
                            );
                            if (ischeckActive)
                                ischeckActive.classList.remove(activeRow);
                            e.target.parentNode.classList.add(activeRow);
                            ac_config.input.focus();

                            _func(
                                parseInt(e.target.parentNode.rowIndex - 1),
                                "-",
                                "click"
                            );
                            // obj.hide();
                        }
                    };
                    var cellText;
                    var cellText = document.createTextNode(obj_[value]);
                    // if (value == "date") {
                    //     cellText = document.createTextNode(
                    //         moment(String(obj_[value])).format("YYYY-MM-DD")
                    //     );
                    // } else {
                    //     cellText = document.createTextNode(obj_[value]);
                    // }
                    td.appendChild(cellText);
                    create_tr.appendChild(td);
                    ac_config.tbody_identifier.appendChild(create_tr);
                });
            });

            ac_config.table_identifier.appendChild(ac_config.tbody_identifier);
        };

        obj.filter = isat_filter => {
            ac_config.input.addEventListener("input", function(e) {
                var val = e.target.value;
                obj.show();
                body_length = -1;
                filteredArray = ac_config.data_set.body.filter(function(x) {
                    return isat_filter(x, val);
                });

                obj.createRows(() => {});
            });
        };
        obj.hide = () => {
            ac_config.table_container.style.display = "none";
        };

        obj.show = () => {
            // console.log(ac_config);
            ac_config.table_container.style.display = "block";
        };

        obj.focus_blur = () => {
            ac_config.input.onfocus = () => {
                // console.log("focust check");

                var check = document.querySelectorAll("." + activeRow);
                // console.log(check);
                filteredArray = ac_config.data_set.body;
                obj.createRows(() => {});
                // console.log(filteredArray);

                obj.show();
            };

            window.addEventListener("click", function(e) {
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
            [...ac_config.tbody_identifier.getElementsByTagName("tr")].forEach(
                el => {
                    el.style.background = "";
                }
            );
        };
        obj.event = _fn => {
            //keyboard event
            obj.keyEvent((cursor, key, eventtype) => {
                obj.clearStyle();
                // alert('0');
                // alert(cursor);
                // console.log(filteredArray);
                // console.log(filteredArray[cursor]);
                var tr = ac_config.tbody_identifier.getElementsByTagName("tr")[
                    cursor
                ];

                _fn(
                    filteredArray[cursor],
                    ac_config,
                    tr,
                    cursor,
                    key,
                    eventtype
                );
                obj.hide();
            });

            ac_config.input.addEventListener("input", function(e) {
                // console.log(filteredArray);
                obj.createRows((cursor, key, eventtype) => {
                    obj.clearStyle();
                    var tr = ac_config.tbody_identifier.getElementsByTagName(
                        "tr"
                    )[cursor];
                    // alert(cursor);
                    _fn(
                        filteredArray[cursor],
                        ac_config,
                        tr,
                        cursor,
                        key,
                        eventtype
                    );
                });
            });
        };

        obj.selectRow = newrow => {
            var oldRow = document.querySelector("." + activeRow);
            if (oldRow) oldRow.classList.remove(activeRow);
            newrow.classList.add(activeRow);
            // alert("old" + oldRow.rowIndex + "new" + newrow.rowIndex);

            ac_config.table_container.scrollTop = newrow.offsetTop - 350;
        };

        obj.keyEvent = _func => {
            // ac_config.input.removeEventListener("keydown", keyboard);
            ac_config.input.addEventListener("keydown", function(e) {
                var initrow;

                if (e.keyCode == 40) {
                    e.preventDefault();
                    e.stopPropagation();
                    //down key
                    initrow = document.querySelector("." + activeRow);
                    if (initrow)
                        if (initrow.nextElementSibling)
                            obj.selectRow(initrow.nextElementSibling);
                    // _func(parseInt(initrow.nextElementSibling.rowIndex - 1), 'down', 'keydown');
                } else if (e.keyCode == 38) {
                    e.preventDefault();

                    //up key

                    initrow = document.querySelector("." + activeRow);
                    if (initrow)
                        if (initrow.previousElementSibling)
                            obj.selectRow(initrow.previousElementSibling);
                    // _func(parseInt(initrow.previousElementSibling.rowIndex - 1), 'up', 'keydown');
                } else if (e.keyCode == 13) {
                    initrow = document.querySelector("." + activeRow);
                    // console.log(filteredArray);
                    if (initrow)
                        _func(
                            parseInt(initrow.rowIndex - 1),
                            "enter",
                            "keydown"
                        );

                    // alert(initrow.rowIndex - 1);
                }
            });
        };

        obj.createTable();
        obj.createHeaders();
        obj.hide();
        obj.focus_blur();
        obj.createRows(() => {});
        // obj.keyEvent((so) => {});
        return obj;
    };
    return aQ;
});
