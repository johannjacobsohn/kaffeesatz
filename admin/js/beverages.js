/**
 * Beverages
 * 
 * @TODO: share parseNumber?
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
		if ( isDupe || !beverage.get('name') || isNaN(beverage.get('price'))  ) { // || beverage.get('price') < 0 ) {
			return false;
		}
		Backbone.Collection.prototype.create.apply(this, arguments);
	};

	var beverageCollection = new Beverages();

	var socket = io.connect('/')
		.on('beverageChanged', function(beverage){
			"use strict";
			beverageCollection.update(beverage, {remove: false});
		})
		.on('beverageAdded',   beverageCollection.add.bind(beverageCollection))
		.on('beverageDeleted', beverageCollection.remove.bind(beverageCollection))
	;

(function($){
	"use strict";

	var BeverageView = Backbone.View.extend({
		tagName: 'tr',
		events: {
			'click .delete'    : 'remove',
			'dblclick' : "editBeverage",
			'click .edit' : "editBeverage",
			'submit form': "changeBeverage"
		},
		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'remove'); // every function that uses 'this' as the current object should be in here

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
		editBeverage: function(event){
			$(event.target).closest("tr").find(".current-price, form").toggle();
		},
		changeBeverage: function(e){
			e.preventDefault();
			var $form = $(e.target);
			var newPrice = $form.find("input").val();
			this.model.save({price: this.parseNumber(newPrice) }, {wait: true});
		},
		remove: function(e){
			e.preventDefault();
			this.model.destroy({wait: true});
		},
		parseNumber: function(n){
			n = n.toString().replace(",", ".");
			return parseFloat(n);
		}
	});

	var BeveragesView = Backbone.View.extend({
		el: $('#beverages-tab'), // el attaches to existing element
		events: {
			'submit #add-beverage': "addBeverage",
			'show a[href=#add-beverage]': "modalShow",
			'shown a[href=#add-beverage]': "modalShown",
			'keyup #add-beverage input.name': "checkBeverage",
			'keyup input.price': "checkPrice"
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
		addBeverage: function(e){
			e.preventDefault();
			var name = $("#add-beverage input.name").val();
			var price = this.parseNumber( $("#add-beverage input.price").val() || 0 );
			this.collection.create( new Beverage({name:name, price:price}), {
				wait: true,
				success: function(){
					$("#add-beverage input.price").val("");
					$("#add-beverage input.name").val("").focus();
					$(".help-inline").hide();
					var $added = $("#add-beverage .added");
					$added.show();
					setTimeout($added.hide.bind($added), 3000);
				}.bind(this)
			});
		},
		modalShow: function(){
			var $beverageModal = $("#add-beverage");
			$beverageModal.find(".price-nan").hide();
			$beverageModal.find("input.price, input.name").val("");
		},
		modalShown: function(){
			$("#add-beverage").find("input.name").focus();
		},
		checkBeverage: function(e){
			var name = $("#add-beverage input.name").val();
			$("#add-beverage .beverage-exists").toggle( this.collection.where({name:name}).length > 0);
		},
		checkPrice: function(e){
			var $input = $(e.target);
			var $form = $input.closest("form");
			var price = this.parseNumber( $input.val() || 0 );
			var isParsable = !isNaN( price );
			$form.find(".price-nan").toggle( !isParsable );
			$form.find(".price-isnegative").toggle( isParsable && price < 0 );
			$form.find(".price-isfree").toggle( isParsable && price === 0 );
			$form.find(".parsedPrice").toggle( isParsable && price > 0 ).find(".price").text( formatNumber(price) );
		},
		parseNumber: function(n){
			n = n.toString().replace(",", ".");
			return parseFloat(n);
		},
		appendBeverage: function(item){
			var beverageView = new BeverageView( {model: item} );
			$('#beverages', this.el).append(beverageView.render().el);
		}
	});

	var beveragesView = new BeveragesView();
}(jQuery));


