export const compareDates = {
    days: function (d1 : Date, d2 : Date) {   
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return (t2 - t1) / (24 * 3600 * 1000);
    },
    hours: function (d1 : Date, d2 : Date) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return (t2 - t1) / (3600 * 1000);
    },
    minutes: function (d1 : Date, d2 : Date) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return (t2 - t1) / (600 * 1000);
    },
    seconds: function (d1 : Date, d2 : Date) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return (t2 - t1) / (60 * 1000);
    },
}