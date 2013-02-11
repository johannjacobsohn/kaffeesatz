/**
 * 
 * 
 */
(function($){
	var User = Backbone.Model.extend({
		defaults: {
			name: 'Klaus',
			beverages: { }
		},
		idAttribute: "_id", // MongoDB-Style
		url: function(){
			return '/users/'+this.get("name")
		}
	});

	var Users = Backbone.Collection.extend({
		model: User,
		url: '/users',
		comparator: function(user){
			return user.get('name');
		}
	});

	users = new Users();
	var socket = io.connect('/');
	socket.on('userChanged', function (data) {
		users.where({name: data.name})[0].set(data);
	});

	var ItemView = Backbone.View.extend({
		tagName: 'tr', // name of tag to be created        
		events: { 
			'click span.delete': 'remove',
			'click span.clear': 'clear'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'clear', 'remove'); // every function that uses 'this' as the current object should be in here

			this.model.bind('change', this.render);
			this.model.bind('remove', this.unrender);
		},
		render: function(){
			var beverages = this.model.get("beverages") || {};
			var beveragesStr = Object.keys( beverages ).map(function(key){
				return key + ": " + beverages[key]
			}).join(", ");
			var cost = 0;
			var cost = Object.keys( beverages )
				.map(function(key){
					var beverage = beverageCollection.where({name: key})[0];
					return beverage ? beverage.get("price")*beverages[key] : 0; })
				.reduce( function(a, b){ return a+b; }, 0);
			var userTemplate = _.template( $("#user_template").html(), {name: this.model.get('name'), beverages: beveragesStr, cost: cost} );
			$(this.el).html( userTemplate );
			return this; // for chainable calls, like .render().el
		},
		unrender: function(){
			$(this.el).remove();
		},
		clear: function(){
			this.model.save({"beverages": {}}, {
				success: function() { console.log("success"); },
				error  : function() { console.log("error");   }
			});
		},
		remove: function(){
			this.model.destroy();
		}
	});

	var UsersView = Backbone.View.extend({
		el: $('#users-tab'), // el attaches to existing element
		events: {
			'click button#add-user': 'addUser'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'addUser', 'appendItem'); // every function that uses 'this' as the current object should be in here

			this.collection = users;
			this.collection.bind('add', this.render); // collection event binder

			this.collection.fetch({ success: this.render });
		},
		render: function(){
			var that = this;
			$("#users").empty();
			_(this.collection.models).each(function(item){
				that.appendItem(item);
			}, this);
		},
		addUser: function(){
			// @TODO: check for unique name
			var that = this;
			var modal = $('#user-modal').modal({}).on("submit", function(e){
				e.preventDefault();
				var name = $(this).find("input").val();
				that.collection.create( new User({name:name}), {
					success: function(){
						$(modal).modal("hide");
					},
					error: function(){
						console.log("error")
					}
				});
			}).one("shown", function(){
				$(this).find("input").val("").focus();
			});
		},
		appendItem: function(item){
			var itemView = new ItemView({
				model: item
			});
			$('#users', this.el).append(itemView.render().el);
		}
	});

	var usersView = new UsersView();
})(jQuery);
