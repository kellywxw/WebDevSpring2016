var q = require("q");

module.exports = function(mongoose, db) {
    var EvdbSchema = require("./eventful.schema.server.js")(mongoose);
    var Evdb  = mongoose.model("Evdb", EvdbSchema);

    var api = {
        createEvent : createEvent,
        findEventByEvdbId : findEventByEvdbId,
        findEventsByEvdbIds : findEventsByEvdbIds,
        userLikesEvent: userLikesEvent,
        userUnlikesEvent : userUnlikesEvent
    };
    return api;

    function createEvent(event) {
        var event = new Evdb({
            evdbId: event.id,
            poster: event.image.url,
            title: event.title,
            location: event.city,
            start: event.start_time,
            end: event.end_time,
            cost: event.cost,
            likes: []
        });

        var deferred = q.defer();

        event.save(function (err, doc) {
            if (err) {
                deferred.reject(err)
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findEventByEvdbId(evdbId) {
        var deferred = q.defer();

        Evdb.findOne({evdbId: evdbId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findEventsByEvdbIds (evdbIds) {
        var deferred = q.defer();

        Evdb.find(
            {evdbId: {$in: evdbIds}},
            function (err, events) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(events);
                }
            })

        return deferred.promise;
    }

    // add userId to event.likes
    function userLikesEvent (userId, event) {

        var deferred = q.defer();

        // find the event by evdbId
        Evdb.findOne({evdbId: event.id},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }

                // if there's an event
                if (doc) {
                    // add user to likes
                    var index = doc.likes.indexOf(userId);
                    if(index == -1) {
                        doc.likes.push (userId);
                    }
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no event
                    // create a new instance
                    event = new Evdb({
                        evdbId: event.id,
                        poster: event.image,
                        title: event.title,
                        location: event.city,
                        start: event.start_time,
                        end: event.end_time,
                        cost: event.price,
                        likes: []
                    });


                    // add user to likes
                    event.likes.push (userId);
                    // save new instance
                    event.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    // remove userId from event.likes
    function userUnlikesEvent (userId, evdbId) {

        var deferred = q.defer();

        // find the event by evdbId
        Evdb.findOne({evdbId: evdbId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }

                // if there's an event
                if (doc) {
                    // remove user from likes
                    var index = doc.likes.indexOf(userId);
                    doc.likes.splice(index,1);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }
}

