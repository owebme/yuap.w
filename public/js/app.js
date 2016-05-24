var yuapApp = yuapApp || {};

yuapApp.define = function (namespace) {
    var parts = namespace.split("."),
        parent = yuapApp,
        i;

    if (parts[0] == "yuapApp") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {

        if (typeof parent[parts[i]] == "undefined") {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }
    return parent;
}
