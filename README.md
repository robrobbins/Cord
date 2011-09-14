#Cord
###Connecting Backbone To jQuery || Zepto PubSub

##Setting Subscriptions
Is done like the Backbone events hash. A few examples:

    var MyView = Backbone.View.extend({
        subscriptions: {
            'MyOtherView.deleted': 'sayGoodbye'
        },
        sayGoodbye: function(name) {
            alert('So long' + name);
        },
        initialize: function() {
            this.subscribe();
        }
    });

The call to __this.subscribe()__ in the initialize method is needed here because, 
unlike the __events__ hash there is no code in the core Backbone types (Model, View and Collection) 
to set the subscriptions automagically. You can easily make custom classes to extend the Backbone types that 
make the call to subscribe for you:

    var Cord.View = Backbone.View.extend({
        initialize: function() {
            this.subscribe();
        }
    });

Then just extend that class instead of the base Backbone type:

    var MyView = Cord.View.extend({
        subscriptions: {
            'MyOtherView.deleted': 'sayGoodbye'
        },
        sayGoodbye: function(name) {
            alert('So long' + name);
        }
    });

You can, of course, declare the subscriptions hash when instantiating a class:

    var Model = new Backbone.Model({
        name: 'Jeffrey',
        subscriptions: {
            'async.data.arrival': 'set'
        }
    });

Another useful pattern is just to set the subscription in the class definition's __initialize()__ method:

    var Collection = Backbone.Collection.extend({
        initialize: function() {
            this.subscribe({
                'a.new.model': 'add'
            })
        }
    });

##Publishing
...coming soon
