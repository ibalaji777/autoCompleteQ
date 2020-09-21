## Description

it is a autocomplete library written in plain javascript.it is help full for who are need to use custom autocomplete.

### Install from npm

```
import aQ from 'autocompleteQ'
```

### Initialization

```
var lib = aQ(document.getElementById('auto_complete'), document.getElementById('table'), dataset);
```

### Input

```
		<input type="text" id="auto_complete" value="enter" />
		<div  id="table"></div>

```

### javascript

```


			var header = [ 'id','name','fullname'];
			var rows = [
				{    id:1,
					name: '1st ',
					fullname: 'arjun',
				},
				{
					   id:2,
					name: '2nd',
					fullname: 'arjun',
				},
				{
					    id:3,
					name: '3rd	',
					fullname: 'arjun',
				},
				{
					    id:4,
					name: 'balaji',
					fullname: 'arjun',
				},
				{
					   id:5,
					name: '7121100004',
					fullname: 'arjun',
				},
				{
					id:6,
					name: 'balaji over',
					fullname: 'arjun',
				},
				{
					id:7,
					name: 'balajiover',
					fullname: 'arjun',
				},
				{
					id:8,
					name: 'baoverlaji',
					fullname: 'arjun',
				},
				{
					id:9,
					name: 'over balaji',
					fullname: 'arjun',
				},
				{
					id:10,
					name: 'balaji take',
					fullname: 'arjun',
				},
				{
					id:11,
					name: 'balinfoaji',
					fullname: 'arjun',
				},
				{
					id:12,
					name: 'balajireddy',
					fullname: 'arjunreddy',
				},
				{
					id:13,
					name: 'balaji',
					fullname: 'arjun',
				},
				{
					id:14,
					name: 'balaji',
					fullname: 'arjun',
				},
			];

			var dataset = {
				header: header,
				body: rows,
			};
			var lib = aQ(document.getElementById('auto_complete'), document.getElementById('table'), dataset);

			lib.filter((obj, value) => {

				return new RegExp(value, 'gi').test(obj.name);
			});

			lib.event((result,input) => {
				console.log(result);
				input.value=result['id']

			});

```

## Bug fixes

None

### We are Not Responsible for if any damage causes(dont Download without knowledge)

### Still in Developement Mode (confirm the library worth before you use)

## Licensing

- License Agreement: MIT
- Author :Balaji
