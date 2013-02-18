/**
 * Beverages
 *
 */
	var Beverage = Backbone.Model.extend({
		defaults: {
			name: '',
			price: 0
		},
		idAttribute: "_id", // MongoDB-Style
		url: function(){
			"use strict";
			return '/beverages/'+this.get("name");
		}
	});

	var Beverages = Backbone.Collection.extend({
		model: Beverage,
		url: '/beverages',
		comparator: function(beverage){
			"use strict";
			return beverage.get('name');
		}
	});
	
	Beverages.prototype.create = function(beverage, events) {
		"use strict";
		var isDupe = this.any(function(_beverage) {
			return _beverage.get('name') === beverage.get('name');
		});
		if ( isDupe || !beverage.get('name') || isNaN(beverage.get('price')) ) {
			events.error();
			return false;
		}
		Backbone.Collection.prototype.create.apply(this, arguments);
	};

	var beverageCollection = new Beverages();
	
(function($){
	"use strict";

	var BeverageView = Backbone.View.extend({
		tagName: 'tr',
		events: {
			'click .delete'    : 'remove',
			'click .set-price' : 'setPrice'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'setPrice', 'remove'); // every function that uses 'this' as the current object should be in here

			this.model.bind('change', this.render);
			this.model.bind('remove', this.unrender);
		},
		render: function(){
			var userTemplate = _.template( $("#beverage_template").html(), {name: this.model.get('name'), price: formatNumber(this.model.get("price"))} );
			$(this.el).html( userTemplate );
			return this; // for chainable calls, like .render().el
		},
		unrender: function(){
			$(this.el).remove();
		},
		setPrice: function(price){
			this.model.save({price: price});
		},
		remove: function(){
			this.model.destroy();
		}
	});

	var BeveragesView = Backbone.View.extend({
		el: $('#beverages-tab'), // el attaches to existing element
		events: {
			'click button#add-beverage': 'showAddBeverage',
			'submit #beverage-modal': "addBeverage",
			'show #beverage-modal': "modalShown",
			'keyup #beverage-modal input.name': "checkBeverage",
			'keyup #beverage-modal input.price': "checkPrice"
		},
		initialize: function(){
			_.bindAll(this, 'render', 'addBeverage', 'appendBeverage'); // every function that uses 'this' as the current object should be in here

			this.collection = beverageCollection;
			this.collection.bind('add', this.render); // collection event binder

			this.collection.fetch({ success: this.render });
		},
		render: function(){
			$("#beverages").empty();
			_(this.collection.models).each(function(item){
				this.appendBeverage(item);
			}, this);
		},
		showAddBeverage: function(){
			this.modal = $('#beverage-modal').modal({});
		},
		addBeverage: function(e){
			e.preventDefault();
			var name = $("#beverage-modal input.name").val();
			var price = this.parseNumber( $("#beverage-modal input.price").val() );
			this.collection.create( new Beverage({name:name, price:price}), {
				success: function(){
					$(this.modal).modal("hide");
				}.bind(this)
			});
		},
		modalShown: function(){
			var $beverageModal = $("#beverage-modal");
			$beverageModal.find(".price-nan").hide();
			$beverageModal.find("input.price, input.name").val("").focus();
		},
		checkBeverage: function(e){
			var name = $("#beverage-modal input.name").val();
			$("#beverage-modal .beverage-exists").toggle( this.collection.where({name:name}).length > 0);
		},
		checkPrice: function(e){
			var price = this.parseNumber( $("#beverage-modal input.price").val() || 0 );
			var isParsable = !isNaN( price );
			$("#beverage-modal .price-nan").toggle( !isParsable );
			$("#beverage-modal .parsedPrice").toggle( isParsable ).find(".price").text( this.formatNumber(price) );
		},
		parseNumber: function(n){
			n = n.toString().replace(",", ".");
			return parseFloat(n);
		},
		/*
		* Zahlen in einen String formieren,
		* der zwei (oder precision) Nachkommastellen hat
		* und Komma als Dezimaltrennzeichen verwendet (nach SI)
		*
		* @TODO: Tests für andere Präzision
		* @example:
				formatNumberTest = function(){
				console.assert(formatNumber(07) === "7,00", "Führende Null");
				console.assert(formatNumber(121212128.1212121212) === "121212128,12", "Lange Zahl");
				console.assert(formatNumber("8,23") === "8,23", "String im korrekten Format");
				console.assert(formatNumber("8.235") === "8,24", "korrektes aufrunden");
				console.assert(formatNumber("8.234") === "8,23", "korrektes abrunden");
				console.assert(formatNumber("8") === "8,00", "Ganze Zahl als String");
				console.assert(formatNumber(0) === "0,00", "Null als Int");
				console.assert((formatNumber()).toString() === "0,00", "Kein Argument sollte 0,00 zurückgeben");
				console.assert((formatNumber("test").toString() === "NaN"), "Nicht parsebare Zahl sollte NaN zurückgeben");
			}
			formatNumberTest()
		* @param             n die zu formatierende Zahl - kann String, Int oder Float sein
		* @param  {{int}}    precision (optional) - Anzahl an Nachkommastellen, voreingestellt sind 2
		* @return {{string}} der formatierte String
		*/
		formatNumber: function(n, precision){
			precision = precision || 2;
			var p = Math.pow(10, precision);
			n = n || 0; // Test "Kein Argument sollte 0,00 zurückgeben; "
			n = parseFloat(n.toString().replace(",",".")); // Test "String im korrekten Format"
			n = Math.round(n * p)/p;
			return n.toFixed( precision ).toString().replace(".",",");
		},
		appendBeverage: function(item){
			var beverageView = new BeverageView({
				model: item
			});
			$('#beverages', this.el).append(beverageView.render().el);
		}
	});

	var beveragesView = new BeveragesView();
}(jQuery));


