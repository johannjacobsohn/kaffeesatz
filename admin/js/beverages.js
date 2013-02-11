/**
 * Beverages
 * 
 */
	var Beverage = Backbone.Model.extend({
		defaults: {
			name: '',
			price: 0
		},
		idAttribute: "_id",
		url: function(){
			return '/beverages/'+this.get("name")
		}
	});

	var Beverages = Backbone.Collection.extend({
		model: Beverage,
		url: '/beverages',
		comparator: function(user){
			return user.get('name');
		}
	});
	
	var beverageCollection = new Beverages();

(function($){
	var BeverageView = Backbone.View.extend({
		tagName: 'tr', // name of tag to be created        
		events: { 
			'click span.delete'    : 'remove',
			'click span.set-price' : 'setPrice'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'setPrice', 'remove'); // every function that uses 'this' as the current object should be in here

			this.model.bind('change', this.render);
			this.model.bind('remove', this.unrender);
		},
		render: function(){
			var userTemplate = _.template( $("#beverage_template").html(), {name: this.model.get('name'), price: this.model.get("price")} );
			$(this.el).html( userTemplate );
			return this; // for chainable calls, like .render().el
		},
		unrender: function(){
			$(this.el).remove();
		},
		setPrice: function(price){
			this.model.save({price: price})
		},
		remove: function(){
			this.model.destroy();
		}
	});

	var BeveragesView = Backbone.View.extend({
		el: $('#beverages-tab'), // el attaches to existing element
		events: {
			'click button#add-beverage': 'addBeverage'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'addBeverage', 'appendBeverage'); // every function that uses 'this' as the current object should be in here

			this.collection = beverageCollection;
			this.collection.bind('add', this.render); // collection event binder

			this.collection.fetch({ success: this.render });
		},
		render: function(){
			var that = this;
			$("#beverages").empty();
			_(this.collection.models).each(function(item){
				that.appendBeverage(item);
			}, this);
		},
		addBeverage: function(){
			// @TODO: check for unique name
			var that = this;
			var modal = $('#beverage-modal').modal({}).on("submit", function(e){
				e.preventDefault();
				var name = $(this).find("input.name").val();
				var price = $(this).find("input.price").val();
				that.collection.create( new Beverage({name:name, price:price}), {
					success: function(){ $(modal).modal("hide"); },
					error  : function(){ console.log("error")    }
				});
			}).one("shown", function(){
				$(this).find("input").val("").first().focus();
			});
		},
		appendBeverage: function(item){
			var beverageView = new BeverageView({
				model: item
			});
			$('#beverages', this.el).append(beverageView.render().el);
		}
	});

	var beveragesView = new BeveragesView();
})(jQuery);
