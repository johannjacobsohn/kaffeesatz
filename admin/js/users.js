/**
 *
 *
 */
(function($){
	"use strict";
	var User = Backbone.Model.extend({
		defaults: {
			name: 'Klaus',
			beverages: { }
		},
		idAttribute: "_id", // MongoDB-Style
		url: function(){
			return '/users/'+this.get("name");
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
			events.error();
			return false;
		}
		Backbone.Collection.prototype.create.apply(this, arguments);
	};

	var users = new UserCollection();

	var socket = io.connect('/');
	socket.on('userChanged', function (data) {
		users.where({name: data.name})[0].set(data);
	});

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
		clear: function(){
			this.model.save({"beverages": {}}, {
				success: function() {},
				error  : function() {}
			});
		},
		remove: function(){
			this.model.destroy();
		}
	});

	var UsersView = Backbone.View.extend({
		el: $('#users-tab'), // el attaches to existing element
		events: {
			'click button#add-user': 'showAddUser',
			'submit #user-modal': "addUser",
			'shown #user-modal': "modalShown",
			'keyup #user-modal input': "checkUser"
		},
		initialize: function(){
			_.bindAll(this, 'render', 'addUser', 'appendUser', "checkUser"); // every function that uses 'this' as the current object should be in here

			this.collection = users;
			this.collection.bind('add', this.render); // collection event binder

			this.collection.fetch({ success: this.render });
		},
		render: function(){
			$("#users").empty();
			_(this.collection.models).each(function(item){
				this.appendUser(item);
			}, this);
		},
		showAddUser: function(){
			this.modal = $('#user-modal').modal({});
		},
		addUser: function(e){
			e.preventDefault();
			var name = $("#user-modal input").val();
			this.collection.create( new User({name:name}), {
				success: function(){
					$(this.modal).modal("hide");
				}.bind(this)
			});
		},
		modalShown: function(){
			$("#user-modal input").val("").focus();
		},
		checkUser: function(e){
			var name = $("#user-modal input").val();
			$("#user-modal .user-exists").toggle( this.collection.where({name:name}).length > 0);
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
