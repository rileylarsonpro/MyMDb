
exports.formatTimestamp = function (timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    });
};