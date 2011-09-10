;(function(BB) {
    var subscribe = function(subscriptions) {
        // we want to propagate the options object to all BB types
        this.options || (this.options = {});
        // normalize the input
        if (!(subscriptions || (subscriptions = this.options.subscriptions))) return;
        if (_.isFunction(subscriptions)) subscriptions = subscriptions.call(this);
        // handles for unsubscribing
        this.options.subscribed || (this.options.subscribed = []);
        // iterate the hash
        for (var key in subscriptions) {
            var method = this[subscriptions[key]];
            if (!method) throw new Error('Subscription method "' + subscriptions[key] + '" does not exist');
            method = _.bind(method, this);
            // in the form [[key,method], [...]]
            this.options.subscribed.push($.subscribe(key, method));
        }
    };

    // attach to the Backbone types
    BB.Model.prototype.subscribe = BB.Collection.prototype.subscribe =
    Backbone.View.prototype.subscribe = subscribe;

    var publish = function(topic, arg) {
        // normailize inputs :the topic or arg could be a func
        if (_.isFunction(topic)) topic = topic.call(this); // return a string
        if (_.isFunction(arg)) arg = arg.call(this); // return an array
        // a single arg can be passed as a non-array
        if(arg && !(_.isArray(arg))) arg = [arg];
        $.publish(topic, arg);
    };

    // attach to the Backbone types
    BB.Model.prototype.publish = BB.Collection.prototype.publish =
    Backbone.View.prototype.publish = publish;

    var unsubscribe = function(topic) {
        var subs;
        this.options || (this.options = {});
        if(!(subs = this.options.subscribed)) return;
        // normalize the input: allow a function
        if (_.isFunction(topic)) topic = topic.call(this);
        // the topic is the first array item
        var handle = _.detect(subs, function(sub) {
            return sub[0] === topic;
        });
        $.unsubscribe(handle);
        // remove it from this objects subscriptions
        this.options.subscribed = _.without(subs, handle);
    };

    // attach to the Backbone types
    BB.Model.prototype.unsubscribe = BB.Collection.prototype.unsubscribe =
    Backbone.View.prototype.unsubscribe = unsubscribe;

})(Backbone);
