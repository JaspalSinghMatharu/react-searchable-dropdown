# React Searchable Dropdown
A lightweight JavaScript library for custom HTML `<select>` creation and managing.
No dependencies needed.
## Features
 - Default Select Dropdown
 - Searchable Select Dropdown
 - Multiselect Dropdown
 - Multiselect searchable Dropdown

## Demo
[React Searchable Dropdown](https://jaspalsinghmatharu.github.io/react-searchable-dropdown/)


## To view the project clone the repository

In the project directory, run:

### `npm install`

To install all dependencies and then

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Props
	
 1. **data** : Data for options of select dropdown 
	 - Should be an simple array or array of objects
	 `Eg: const colorsData = ['red', 'green', 'blue', 'yellow', 'purple', 'cyan'];`
	 or
	 `Eg: const colorData = [{color: red}, {color: green}, {color: blue}]`

2. **label** : This prop is required when the type of data passed is array of objects, the key passed in this will work as the key for the search query in the searchable dropdown and also while binding data in the dropdown.
	- Eg: For the above data label will be ***color***  ( See [demo](https://jaspalsinghmatharu.github.io/react-searchable-dropdown/) for more info ).

3. **searchable** : Boolean value to define if the dropdown will be searchable or not.
4.  **placeholder** : Placeholder text for the searchable input.
5. **multiselect** : Boolean value to define if the dropdown will be multi-select or not.
6. **onInputChange** : A callback function to be called on searchable input value change.

## And thats all folks

And now have fun
