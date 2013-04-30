/*!
* CanJS - 1.1.6-pre (2013-04-30)
* http://canjs.us/
* Copyright (c) 2013 Bitovi
* Licensed MIT
*/
define(['can/util/library'], function(can) {


    // ## Bind helpers
    can.bindAndSetup = function() {
        // Add the event to this object
        can.addEvent.apply(this, arguments);
        // If not initializing, and the first binding
        // call bindsetup if the function exists.
        if (!this._init) {
            if (!this._bindings) {
                // setup live-binding
                this._bindsetup && this._bindsetup();
                this._bindings = 0;
            }
            this._bindings++;
        }

        return this;
    };

    can.unbindAndTeardown = function(ev, handler) {
        // Remove the event handler
        can.removeEvent.apply(this, arguments);
        // This doesn't work as handler is never passed
        // if(!handler){
        // 	// This is not correct. We need to 
        // 	// have a way to know the number of event handlers
        // 	// for a given item.
        // 	this._bindings = 0
        // } else {
        // 	this._bindings--;
        // }
        this._bindings--;
        // If there are no longer any bindings and
        // there is a bindteardown method, call it.
        if (!this._bindings) {
            this._bindteardown && this._bindteardown();
        }
        return this;
    }

    return can;

});