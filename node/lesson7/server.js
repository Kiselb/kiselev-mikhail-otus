//
// https://marmelab.com/blog/2017/09/06/dive-into-graphql-part-iii-building-a-graphql-server-with-nodejs.html
//
const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
//const { buildSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

var product_id = 100;

const resolvers = {
	Query: {
		allProducts: () => { return e_commerce_data_products; },
		allProductsUI: () => { return e_commerce_data_products; },
		allCategories: () => { return e_commerce_data_categories; },
		allManufacturers: () => { return e_commerce_data_manufacturers; },
		allPhotos: () => { return e_commerce_data_photos; },

		Product:  (previousValue, parameters) => { return e_commerce_data_products.find(product => { return product.id === parameters.ProductID; }); },
		ProductPhotos: (previousValue, parameters) => {
			var product = e_commerce_data_products.find( product => { return product.id === parameters.ProductID; });
			var photos = product.Photos.map(photo_ref => { return e_commerce_data_photos.find(photo => { return photo.PhotoID === photo_ref; }); });
			return photos;
		},
		Category: (previousValue, parameters) => { return e_commerce_data_categories.find(category => category.CategoryID === parameters.CategoryID); },
		Manufacturer:  (previousValue, parameters) => { return e_commerce_data_manufacturers.find(manufacturer => manufacturer.ManufacturerID === parameters.ManufacturerID); }
	},
	Product: {
		id: Product => Product.id,
		name: Product => Product.name,
		price: Product => Product.price
	},
	ProductUI: {
		id: Product => Product.id,
		name: Product => Product.name,
		price: Product => Product.price,
		category: Product => { return e_commerce_data_categories.find(item => item.CategoryID === Product.CategoryID); },
		manufacturer: Product => { return e_commerce_data_manufacturers.find(item => item.ManufacturerID === Product.ManufacturerID); }
	},

	Mutation: {
		ProductSetSale(previousValue, parameters) {
			let product = e_commerce_data_products.find(product => { return product.id === parameters.ProductID; });
			console.log(product);
			product.sale = true;
			console.log(product);
			return product;
		},
		ProductSetUnSale(previousValue, parameters) {
			let product = e_commerce_data_products.find(product => { return product.id === parameters.ProductID; });
			console.log(product);
			product.sale = false;
			console.log(product);
			return product;
		},
		ProductSetPrice(previousValue, parameters) {
			let product = e_commerce_data_products.find(product => { return product.id === parameters.ProductID; });
			console.log(product);
			product.price = parameters.NewPrice;
			console.log(product);
			return product;
		},
		ProductAddNew(previousValue, parameters) {
			let length = e_commerce_data_products.push(
				{
					id: (product_id++) + '',
					name: parameters.Name,
					price: parameters.Price,
					sale: parameters.Sale,
					ManufacturerID: parameters.ManufacturerID,
					CategoryID: parameters.CategoryID,
					Photos: []
				}
			);
			return e_commerce_data_products[length - 1];
		}
	}
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

var e_commerce_data_products = [
	{id: "00000001", name: "Product_Name_01", price: 110.00, sale: false, ManufacturerID: "MANUFACTURER_01", CategoryID: "CATEGORY_01", Photos: ["PhotoID_01", "PhotoID_02"]},
	{id: "00000002", name: "Product_Name_02", price: 210.00, sale: false, ManufacturerID: "MANUFACTURER_01", CategoryID: "CATEGORY_01", Photos: ["PhotoID_03", "PhotoID_04"]},
	{id: "00000003", name: "Product_Name_03", price: 310.00, sale: false, ManufacturerID: "MANUFACTURER_01", CategoryID: "CATEGORY_02", Photos: ["PhotoID_05", "PhotoID_06"]},
	{id: "00000004", name: "Product_Name_04", price: 410.00, sale: false, ManufacturerID: "MANUFACTURER_01", CategoryID: "CATEGORY_02", Photos: ["PhotoID_07", "PhotoID_08"]},
	{id: "00000005", name: "Product_Name_05", price: 510.00, sale: false, ManufacturerID: "MANUFACTURER_01", CategoryID: "CATEGORY_03", Photos: ["PhotoID_09", "PhotoID_10"]},
	{id: "00000006", name: "Product_Name_06", price: 610.00, sale: false, ManufacturerID: "MANUFACTURER_02", CategoryID: "CATEGORY_03", Photos: ["PhotoID_11", "PhotoID_12"]},
	{id: "00000007", name: "Product_Name_07", price: 710.00, sale: false, ManufacturerID: "MANUFACTURER_02", CategoryID: "CATEGORY_04", Photos: ["PhotoID_13", "PhotoID_14"]},
	{id: "00000008", name: "Product_Name_08", price: 810.00, sale: false, ManufacturerID: "MANUFACTURER_02", CategoryID: "CATEGORY_04", Photos: ["PhotoID_15", "PhotoID_16"]},
	{id: "00000009", name: "Product_Name_09", price: 910.00, sale: false, ManufacturerID: "MANUFACTURER_02", CategoryID: "CATEGORY_05", Photos: ["PhotoID_17", "PhotoID_18"]},
	{id: "00000010", name: "Product_Name_10", price: 10.00, sale: true, ManufacturerID: "MANUFACTURER_02", CategoryID: "CATEGORY_05", Photos: ["PhotoID_19", "PhotoID_20"]},
	{id: "00000011", name: "Product_Name_11", price: 110.00, sale: false, ManufacturerID: "MANUFACTURER_03", CategoryID: "CATEGORY_06", Photos: ["PhotoID_21", "PhotoID_22"]},
	{id: "00000012", name: "Product_Name_12", price: 210.00, sale: false, ManufacturerID: "MANUFACTURER_03", CategoryID: "CATEGORY_06", Photos: ["PhotoID_23", "PhotoID_24"]},
	{id: "00000013", name: "Product_Name_13", price: 310.00, sale: false, ManufacturerID: "MANUFACTURER_03", CategoryID: "CATEGORY_07", Photos: ["PhotoID_25", "PhotoID_26"]},
	{id: "00000014", name: "Product_Name_14", price: 410.00, sale: false, ManufacturerID: "MANUFACTURER_03", CategoryID: "CATEGORY_07", Photos: ["PhotoID_27", "PhotoID_28"]},
	{id: "00000015", name: "Product_Name_15", price: 510.00, sale: false, ManufacturerID: "MANUFACTURER_03", CategoryID: "CATEGORY_08", Photos: ["PhotoID_29", "PhotoID_30"]},
	{id: "00000016", name: "Product_Name_16", price: 610.00, sale: false, ManufacturerID: "MANUFACTURER_04", CategoryID: "CATEGORY_08", Photos: ["PhotoID_31", "PhotoID_32"]},
	{id: "00000017", name: "Product_Name_17", price: 710.00, sale: false, ManufacturerID: "MANUFACTURER_04", CategoryID: "CATEGORY_09", Photos: ["PhotoID_33", "PhotoID_34"]},
	{id: "00000018", name: "Product_Name_18", price: 810.00, sale: false, ManufacturerID: "MANUFACTURER_04", CategoryID: "CATEGORY_09", Photos: ["PhotoID_35", "PhotoID_36"]},
	{id: "00000019", name: "Product_Name_19", price: 910.00, sale: false, ManufacturerID: "MANUFACTURER_04", CategoryID: "CATEGORY_10", Photos: ["PhotoID_37", "PhotoID_38"]},
	{id: "00000020", name: "Product_Name_20", price: 10.00, sale: true, ManufacturerID: "MANUFACTURER_04", CategoryID: "CATEGORY_10", Photos: ["PhotoID_39", "PhotoID_40"]}
];

var e_commerce_data_manufacturers = [
	{ManufacturerID: "MANUFACTURER_01", ManufacturerName: "MANUFACTURER_01_NAME"},
	{ManufacturerID: "MANUFACTURER_02", ManufacturerName: "MANUFACTURER_02_NAME"},
	{ManufacturerID: "MANUFACTURER_03", ManufacturerName: "MANUFACTURER_03_NAME"},
	{ManufacturerID: "MANUFACTURER_04", ManufacturerName: "MANUFACTURER_04_NAME"},
];

var e_commerce_data_categories = [
	{CategoryID: "CATEGORY_01", CategoryName: "CATEGORY_NAME_01"},
	{CategoryID: "CATEGORY_02", CategoryName: "CATEGORY_NAME_02"},
	{CategoryID: "CATEGORY_03", CategoryName: "CATEGORY_NAME_03"},
	{CategoryID: "CATEGORY_04", CategoryName: "CATEGORY_NAME_04"},
	{CategoryID: "CATEGORY_05", CategoryName: "CATEGORY_NAME_05"},
	{CategoryID: "CATEGORY_06", CategoryName: "CATEGORY_NAME_06"},
	{CategoryID: "CATEGORY_07", CategoryName: "CATEGORY_NAME_07"},
	{CategoryID: "CATEGORY_08", CategoryName: "CATEGORY_NAME_08"},
	{CategoryID: "CATEGORY_09", CategoryName: "CATEGORY_NAME_09"},
	{CategoryID: "CATEGORY_10", CategoryName: "CATEGORY_NAME_10"}
];

var e_commerce_data_photos = [
	{PhotoID: "PhotoID_01", URL: "www.myshop.com/photos/01", Height: 100, Width: 200},
	{PhotoID: "PhotoID_02", URL: "www.myshop.com/photos/02", Height: 100, Width: 200},
	{PhotoID: "PhotoID_03", URL: "www.myshop.com/photos/03", Height: 100, Width: 200},
	{PhotoID: "PhotoID_04", URL: "www.myshop.com/photos/04", Height: 100, Width: 200},
	{PhotoID: "PhotoID_05", URL: "www.myshop.com/photos/05", Height: 100, Width: 200},
	{PhotoID: "PhotoID_06", URL: "www.myshop.com/photos/06", Height: 100, Width: 200},
	{PhotoID: "PhotoID_07", URL: "www.myshop.com/photos/07", Height: 100, Width: 200},
	{PhotoID: "PhotoID_08", URL: "www.myshop.com/photos/08", Height: 100, Width: 200},
	{PhotoID: "PhotoID_09", URL: "www.myshop.com/photos/09", Height: 100, Width: 200},
	{PhotoID: "PhotoID_10", URL: "www.myshop.com/photos/10", Height: 100, Width: 200},
	{PhotoID: "PhotoID_11", URL: "www.myshop.com/photos/11", Height: 100, Width: 200},
	{PhotoID: "PhotoID_12", URL: "www.myshop.com/photos/12", Height: 100, Width: 200},
	{PhotoID: "PhotoID_13", URL: "www.myshop.com/photos/13", Height: 100, Width: 200},
	{PhotoID: "PhotoID_14", URL: "www.myshop.com/photos/14", Height: 100, Width: 200},
	{PhotoID: "PhotoID_15", URL: "www.myshop.com/photos/15", Height: 100, Width: 200},
	{PhotoID: "PhotoID_16", URL: "www.myshop.com/photos/16", Height: 100, Width: 200},
	{PhotoID: "PhotoID_17", URL: "www.myshop.com/photos/17", Height: 100, Width: 200},
	{PhotoID: "PhotoID_18", URL: "www.myshop.com/photos/18", Height: 100, Width: 200},
	{PhotoID: "PhotoID_19", URL: "www.myshop.com/photos/19", Height: 100, Width: 200},
	{PhotoID: "PhotoID_20", URL: "www.myshop.com/photos/20", Height: 100, Width: 200},
	{PhotoID: "PhotoID_21", URL: "www.myshop.com/photos/21", Height: 100, Width: 200},
	{PhotoID: "PhotoID_22", URL: "www.myshop.com/photos/22", Height: 100, Width: 200},
	{PhotoID: "PhotoID_23", URL: "www.myshop.com/photos/23", Height: 100, Width: 200},
	{PhotoID: "PhotoID_24", URL: "www.myshop.com/photos/24", Height: 100, Width: 200},
	{PhotoID: "PhotoID_25", URL: "www.myshop.com/photos/25", Height: 100, Width: 200},
	{PhotoID: "PhotoID_26", URL: "www.myshop.com/photos/26", Height: 100, Width: 200},
	{PhotoID: "PhotoID_27", URL: "www.myshop.com/photos/27", Height: 100, Width: 200},
	{PhotoID: "PhotoID_28", URL: "www.myshop.com/photos/28", Height: 100, Width: 200},
	{PhotoID: "PhotoID_29", URL: "www.myshop.com/photos/29", Height: 100, Width: 200},
	{PhotoID: "PhotoID_30", URL: "www.myshop.com/photos/30", Height: 100, Width: 200},
	{PhotoID: "PhotoID_31", URL: "www.myshop.com/photos/31", Height: 100, Width: 200},
	{PhotoID: "PhotoID_32", URL: "www.myshop.com/photos/32", Height: 100, Width: 200},
	{PhotoID: "PhotoID_33", URL: "www.myshop.com/photos/33", Height: 100, Width: 200},
	{PhotoID: "PhotoID_34", URL: "www.myshop.com/photos/34", Height: 100, Width: 200},
	{PhotoID: "PhotoID_35", URL: "www.myshop.com/photos/35", Height: 100, Width: 200},
	{PhotoID: "PhotoID_36", URL: "www.myshop.com/photos/36", Height: 100, Width: 200},
	{PhotoID: "PhotoID_37", URL: "www.myshop.com/photos/37", Height: 100, Width: 200},
	{PhotoID: "PhotoID_38", URL: "www.myshop.com/photos/38", Height: 100, Width: 200},
	{PhotoID: "PhotoID_39", URL: "www.myshop.com/photos/39", Height: 100, Width: 200},
	{PhotoID: "PhotoID_40", URL: "www.myshop.com/photos/40", Height: 100, Width: 200}
];

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  //rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
