/**
 * Users
 *
 */
 /*global beverageCollection:false */
(function($){
	"use strict";
	var User = Backbone.Model.extend({
		defaults: {
			name: 'Klaus',
			beverages: { }
		},
		idAttribute: "name",
		isNew: function(){
			return !this.has("_id");
		}
	});

	var UserCollection = Backbone.Collection.extend({
		model: User,
		url: '/users',
		comparator: function(user){
			return user.get('name');
		}
	});

	UserCollection.prototype.create = function(user, events) {
		var isDupe = this.any(function(_user) {
			return _user.get('name') === user.get('name');
		});
		if (isDupe || !user.get('name')) {
			return false;
		}
		Backbone.Collection.prototype.create.apply(this, arguments);
	};

	var users = new UserCollection();

	var socket = io.connect('/')
		.on('userChanged', function(user){ users.set(user, {remove: false}); })
		.on('userAdded',   users.add.bind(users))
		.on('userDeleted', function(u){ users.remove(new User(u)); })
	;

	var UserView = Backbone.View.extend({
		tagName: 'tr', // name of tag to be created
		events: {
			'click .delete': 'remove',
			'click .clear': 'clear'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'clear', 'remove'); // every function that uses 'this' as the current object should be in here

			this.model.bind('change', this.render);
			this.model.bind('remove', this.unrender);
		},
		render: function(){
			var beverages = this.model.get("beverages") || {};
			var beveragesStr = Object.keys( beverages ).map(function(key){
				return key + ": " + beverages[key];
			}).join(", ");
			var cost = Object.keys( beverages )
				.map(function(key){
					var beverage = beverageCollection.where({name: key})[0];
					return beverage ? beverage.get("price")*beverages[key] : 0; })
				.reduce( function(a, b){ return a+b; }, 0);
			var userTemplate = _.template( $("#user_template").html(), {name: this.model.get('name'), beverages: beveragesStr, cost: formatNumber(cost) } );
			$(this.el).html( userTemplate );
			return this; // for chainable calls, like .render().el
		},
		unrender: function(){
			$(this.el).remove();
		},
		clear: function(e){
			e.preventDefault();
			this.model.save({"beverages": {}}, {wait: true});
		},
		remove: function(e){
			e.preventDefault();
			this.model.destroy({wait: true});
		}
	});

	var UsersView = Backbone.View.extend({
		el: $('#users-tab'), // el attaches to existing element
		events: {
			'submit #add-user': "addUser",
			'shown a[href=#add-user]': "addUserShown",
			'show a[href=#add-user]': "addUserShow",
			'keyup #add-user input': "checkUser"
		},
		initialize: function(){
			_.bindAll(this, 'render', 'addUser', 'appendUser', "checkUser"); // every function that uses 'this' as the current object should be in here

			this.collection = users;
			this.collection.bind('add sync', this.render); // collection event binder
			this.collection.fetch();

			beverageCollection.on("sync change", this.render );
		},
		render: function(){
			$("#users").empty();
			_(this.collection.models).each(function(item){
				this.appendUser(item);
			}, this);
		},
		addUser: function(e){
			e.preventDefault();
			var name = $("#add-user input").val();

			this.collection.create( new User({name:name}), {
				wait: true,
				success: function(newUser, response, options){
					$("#add-user input").val("").focus();
					$(".help-inline").hide();
					var $added = $("#add-user .added");
					$added.show();
					setTimeout($added.hide.bind($added), 3000);
				}.bind(this)
			});
		},
		addUserShow: function(){
			$("#add-user input").val("");
		},
		addUserShown: function(){
			$("#add-user input").focus();
		},
		checkUser: function(e){
			var name = $("#add-user input").val();
			$("#add-user .user-exists").toggle( this.collection.where({name:name}).length > 0);
		},
		appendUser: function(item){
			var itemView = new UserView({
				model: item
			});
			$('#users', this.el).append(itemView.render().el);
		}
	});

	var usersView = new UsersView();
}(jQuery));
